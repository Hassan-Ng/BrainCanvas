import React from 'react';
import { Stage, Layer, Rect, Ellipse, Text, Transformer, Arrow, Line } from 'react-konva';
import { useState, useRef, useEffect } from 'react';

export default function Whiteboard({ selectedTool, style, theme = 'dark', initialShapes = [], readOnly = false, onShapesChange }) {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShape, setNewShape] = useState(null);
  const [freeDrawPoints, setFreeDrawPoints] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionBox, setSelectionBox] = useState(null);
  const [editingTextId, setEditingTextId] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const transformerRef = useRef();
  const shapeRefs = useRef({});
  const stageRef = useRef();
  const textInputRef = useRef();
  const prevToolRef = useRef(selectedTool);
  const [keyboardText, setKeyboardText] = useState('');

  // Initialize shapes from props
  useEffect(() => {
    if (initialShapes.length > 0) {
      setShapes(initialShapes);
    }
  }, [initialShapes]);

  // Notify parent of shape changes
  useEffect(() => {
    if (onShapesChange) {
      onShapesChange(shapes);
    }
  }, [shapes, onShapesChange]);

  useEffect(() => {
    const downHandler = (e) => {
      if (e.code === 'Space') setIsPanning(true);
    };
    const upHandler = (e) => {
      if (e.code === 'Space') setIsPanning(false);
    };
  
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);  

  useEffect(() => {
    if (prevToolRef.current !== selectedTool) {
      setSelectedIds([]);
      prevToolRef.current = selectedTool;
    }
  }, [selectedTool]);

  useEffect(() => {
    if (transformerRef.current) {
      const nodes = selectedIds.map(id => shapeRefs.current[id]).filter(Boolean);
      transformerRef.current.nodes(nodes);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedIds]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const container = stage.container();
  
    if (isPanning) {
      container.style.cursor = 'grab';
    } else if (selectedTool === 'text') {
      container.style.cursor = 'text';
    } else if (selectedTool === 'pointer') {
      container.style.cursor = 'default';
    } else if (selectedTool === 'freedraw') {
      container.style.cursor = 'crosshair';
    } else {
      container.style.cursor = 'crosshair';
    }
  }, [selectedTool, isPanning]);  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIds([]);
        setEditingTextId(null);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        setSelectedIds(shapes.map(shape => shape.id));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        redo();
      }
      if (e.key === 'Delete') {
        e.preventDefault();
        const newShapes = shapes.filter(shape => !selectedIds.includes(shape.id));
        pushToHistory();
        setShapes(newShapes);
        setSelectedIds([]);
      }
      if (editingTextId) {
        if (e.key === 'Backspace') {
          setKeyboardText(prev => prev.slice(0, -1));
        } else if (e.key === 'Escape') {
          setEditingTextId(null);
          setKeyboardText('');
        } else if (e.key.length === 1) {
          if (selectedIds.includes(editingTextId)) {
            setKeyboardText(prev => prev + e.key);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shapes, selectedIds, editingTextId]);

  useEffect(() => {
    if (editingTextId) {
      setShapes(prev => prev.map(shape => shape.id === editingTextId ? { ...shape, text: keyboardText } : shape));
    }
  }, [keyboardText]);

  useEffect(() => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        selectedIds.includes(shape.id)
          ? { ...shape, ...style }
          : shape
      )
    );
  }, [style]);

  const pushToHistory = () => {
    setHistory(prev => [...prev, shapes]);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setRedoStack(prev => [shapes, ...prev]);
    setShapes(last);
    setHistory(prev => prev.slice(0, -1));
    setSelectedIds([]);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory(prev => [...prev, shapes]);
    setShapes(next);
    setRedoStack(prev => prev.slice(1));
    setSelectedIds([]);
  };

  const handleTransformEnd = (shape, node) => {
    const id = shape.id;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    pushToHistory();
    setShapes((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          if (s.type === 'rectangle') {
            return { ...s, width: node.width() * scaleX, height: node.height() * scaleY };
          }
          if (s.type === 'ellipse') {
            return { ...s, radiusX: node.radiusX() * scaleX, radiusY: node.radiusY() * scaleY };
          }
          if (s.type === 'text') {
            return { ...s, fontSize: node.fontSize() * scaleY };
          }
        }
        return s;
      })
    );
  };

  const renderShape = (shape) => {
    const isSelected = selectedIds.includes(shape.id);
    const draggable = selectedTool === 'pointer';
    
    // Don't spread the key prop
    const { key, ...shapeProps } = shape;
    
    const commonProps = {
      id: shape.id,
      ...shapeProps,
      draggable,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      fill: shape.fill || style.fill,
      cornerRadius: shape.type === 'rectangle' ? 8 : 0,
      onClick: (e) => {
        e.cancelBubble = true;
        if (selectedTool === 'pointer') {
          const shiftPressed = e.evt.shiftKey;
          if (shiftPressed && isSelected) {
            setSelectedIds(selectedIds.filter(id => id !== shape.id));
          } else if (shiftPressed && !isSelected) {
            setSelectedIds([...selectedIds, shape.id]);
          } else {
            setSelectedIds([shape.id]);
          }
          if (shape.type === 'text') {
            setEditingTextId(shape.id);
          } else {
            setEditingTextId(null);
          }
        }
      },
      ref: (node) => shapeRefs.current[shape.id] = node,
      onDragStart: (e) => {
        if (selectedTool === 'pointer') {
          pushToHistory();
          // if not already selected, select this shape
          if (!isSelected) {
            setSelectedIds([shape.id]);
          }
        }
        e.target.moveToTop();
      },
      onDragEnd: (e) => {
        pushToHistory();
        updateShapePosition(shape.id, e.target.x(), e.target.y());
      },
      onTransformEnd: (e) => handleTransformEnd(shape, e.target),
    };

    if (shape.type === 'rectangle') return <Rect key={commonProps.id} {...commonProps} />;
    if (shape.type === 'ellipse') return <Ellipse key={commonProps.id} {...commonProps} />;
    if (shape.type === 'text') return <Text key={commonProps.id} {...commonProps} text={shape.text || '|'} fontSize={shape.fontSize || 24} />;
    if (shape.type === 'arrow') {
      const points = shape.points || [0, 0, 0, 0];
      const [startX, startY, endX, endY] = points;
      
      // Simple L-shaped arrow
      const cornerRadius = 10;
      const arrowHeadSize = 12;
      
      // Always go horizontal first, then vertical
      const midX = endX;
      const midY = startY;
      
      // Create the L-shaped path
      const pathPoints = [startX, startY, midX, midY, endX, endY];
      
      // Arrow head points down (vertical direction)
      const arrowHeadPoints = [
        endX - arrowHeadSize/2, endY - arrowHeadSize,
        endX, endY,
        endX + arrowHeadSize/2, endY - arrowHeadSize
      ];
      
      return (
        <React.Fragment key={commonProps.id}>
          <Line
            {...commonProps}
            points={pathPoints}
            lineCap="round"
            lineJoin="round"
            fill="none"
          />
          <Line
            key={`${commonProps.id}-head`}
            x={shape.x}
            y={shape.y}
            draggable={draggable}
            onClick={commonProps.onClick}
            ref={(node) => shapeRefs.current[`${shape.id}-head`] = node}
            onDragStart={commonProps.onDragStart}
            onDragEnd={commonProps.onDragEnd}
            points={arrowHeadPoints}
            closed={true}
            fill={shape.stroke}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
          />
        </React.Fragment>
      );
    }
    if (shape.type === 'line') {
      return (
        <Line
          key={shape.id}
          {...commonProps}
          points={shape.points}
        />
      );
    }
    if (shape.type === 'freedraw') {
      return (
        <Line
          key={shape.id}
          {...commonProps}
          points={shape.points}
          lineCap="round"
          lineJoin="round"
        />
      );
    }
    return null;
  };

  const updateShapePosition = (id, x, y) => {
    setShapes((prev) => prev.map((shape) => shape.id === id ? { ...shape, x, y } : shape));
  };

  const handleMouseDown = (e) => {
    if (readOnly) return;
    
    if (isPanning) return;
    
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    const clickedTransformer = e.target.findAncestor('Transformer');
    if (clickedTransformer) return;

    // Adjust pointer for zoom and pan
    const adjustedPointer = {
      x: (pointer.x - stagePosition.x) / stageScale,
      y: (pointer.y - stagePosition.y) / stageScale
    };

    if (selectedTool === 'pointer') {
      const clickedShape = shapes.find((shape) => {
        const shapeNode = shapeRefs.current[shape.id];
        return shapeNode && shapeNode.getClientRect().x <= adjustedPointer.x &&
          shapeNode.getClientRect().x + shapeNode.getClientRect().width >= adjustedPointer.x &&
          shapeNode.getClientRect().y <= adjustedPointer.y &&
          shapeNode.getClientRect().y + shapeNode.getClientRect().height >= adjustedPointer.y;
      });
      if (!clickedShape) {
        setSelectionBox({ x: adjustedPointer.x, y: adjustedPointer.y, width: 0, height: 0 });
      }
      return;
    }

    const id = `${selectedTool}-${Date.now()}`;
    const base = { id, x: adjustedPointer.x, y: adjustedPointer.y, startX: adjustedPointer.x, startY: adjustedPointer.y };
    let shape;
    
    if (selectedTool === 'rectangle') {
      shape = {
        ...base,
        type: 'rectangle',
        width: 0,
        height: 0,
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth
      };
    } else if (selectedTool === 'ellipse') {
      shape = {
        ...base,
        type: 'ellipse',
        radiusX: 0,
        radiusY: 0,
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth
      };
    } else if (selectedTool === 'text') {
      shape = {
        ...base,
        type: 'text',
        text: '',
        fontSize: 24,
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth
      };
      setEditingTextId(id);
      setSelectedIds([id]);
      setKeyboardText('');
    } else if (selectedTool === 'arrow') {
      shape = {
        ...base,
        type: 'arrow',
        points: [0, 0, 0, 0],
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth
      };
    } else if (selectedTool === 'line') {
      shape = {
        ...base,
        type: 'line',
        points: [0, 0, 0, 0],
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth
      };
    } else if (selectedTool === 'freedraw') {
      shape = {
        ...base,
        type: 'freedraw',
        points: [0, 0],
        fill: 'transparent',
        stroke: style.stroke,
        strokeWidth: style.strokeWidth
      };
      setFreeDrawPoints([0, 0]);
    }

    setIsDrawing(true);
    setNewShape(shape);
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    // Adjust pointer for zoom and pan
    const adjustedPointer = {
      x: (pointer.x - stagePosition.x) / stageScale,
      y: (pointer.y - stagePosition.y) / stageScale
    };

    if (selectionBox) {
      setSelectionBox(prev => ({
        ...prev,
        width: adjustedPointer.x - prev.x,
        height: adjustedPointer.y - prev.y,
      }));
      return;
    }

    if (!isDrawing || !newShape) return;

    const startX = newShape.startX ?? newShape.x;
    const startY = newShape.startY ?? newShape.y;

    const dx = adjustedPointer.x - startX;
    const dy = adjustedPointer.y - startY;

    const aspectRatio = e.evt.ctrlKey || e.evt.metaKey;

    if (newShape.type === 'rectangle') {
      let width = Math.abs(dx);
      let height = Math.abs(dy);

      if (aspectRatio) {
        const size = Math.max(width, height);
        width = size;
        height = size;
      }

      setNewShape({
        ...newShape,
        x: dx < 0 ? startX - width : startX,
        y: dy < 0 ? startY - height : startY,
        width,
        height,
        startX,
        startY,
      });
    } else if (newShape.type === 'ellipse') {
      const radiusX = Math.abs(dx) / 2;
      const radiusY = Math.abs(dy) / 2;
      const centerX = dx < 0 ? startX + dx / 2 : startX + dx / 2;
      const centerY = dy < 0 ? startY + dy / 2 : startY + dy / 2;

      setNewShape({
        ...newShape,
        x: centerX,
        y: centerY,
        radiusX: aspectRatio ? Math.max(radiusX, radiusY) : radiusX,
        radiusY: aspectRatio ? Math.max(radiusX, radiusY) : radiusY,
        startX,
        startY,
      });
    } else if (newShape.type === 'arrow' || newShape.type === 'line') {
      const points = [0, 0, dx, dy];
      setNewShape({
        ...newShape,
        points,
        startX,
        startY,
      });
    } else if (newShape.type === 'freedraw') {
      const newPoints = [...freeDrawPoints, adjustedPointer.x - newShape.x, adjustedPointer.y - newShape.y];
      setFreeDrawPoints(newPoints);
      setNewShape({
        ...newShape,
        points: newPoints,
      });
    }
  };

  const handleMouseUp = () => {
    if (selectionBox) {
      const box = selectionBox;
      const x1 = Math.min(box.x, box.x + box.width);
      const y1 = Math.min(box.y, box.y + box.height);
      const x2 = Math.max(box.x, box.x + box.width);
      const y2 = Math.max(box.y, box.y + box.height);

      const selected = shapes.filter((shape) => {
        const shapeNode = shapeRefs.current[shape.id];
        if (!shapeNode) return false;
        const box = shapeNode.getClientRect();
        return box.x >= x1 && box.y >= y1 && box.x + box.width <= x2 && box.y + box.height <= y2;
      }).map(s => s.id);

      setSelectedIds(selected);
      setSelectionBox(null);
      return;
    }

    if (!isDrawing || !newShape) return;
    pushToHistory();
    setShapes((prev) => [...prev, newShape]);
    setIsDrawing(false);
    setNewShape(null);
    setFreeDrawPoints([]);
  };

  return (
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        draggable={isPanning}
        onWheel={(e) => {
          e.evt.preventDefault();
          const scaleBy = 1.05;
          const stage = e.target.getStage();
          const oldScale = stageScale;
          const pointer = stage.getPointerPosition();

          const mousePointTo = {
            x: (pointer.x - stagePosition.x) / oldScale,
            y: (pointer.y - stagePosition.y) / oldScale,
          };

          const direction = e.evt.deltaY > 0 ? 1 : -1;
          const newScale = direction > 0 ? oldScale / scaleBy : oldScale * scaleBy;

          const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
          };

          setStageScale(newScale);
          setStagePosition(newPos);
        }}
        onDragMove={(e) => {
          if (isPanning) {
            const pos = e.target.position();
            setStagePosition(pos);
          }
        }}
      >
        <Layer>
          {shapes.map(renderShape)}
          {newShape && renderShape(newShape)}
          {selectionBox && (
            <Rect
              x={selectionBox.x}
              y={selectionBox.y}
              width={selectionBox.width}
              height={selectionBox.height}
              fill="rgba(255,255,255,0.1)"
              stroke="#00A9E5"
            />
          )}
          <Transformer
            ref={transformerRef}
            rotateEnabled={true}
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right', 'middle-left', 'middle-right', 'top-center', 'bottom-center']}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) return oldBox;
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </>
  );
}
