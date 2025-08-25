import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Whiteboard from './Whiteboard';
import ToolBar from './ToolBar';
import ColorPanel from './ColorPanel';
import UserMenu from './UserMenu';
import Header from './Header';
import HelpButton from './HelpButton';
import Toast from './Toast';
import { MousePointer2 } from 'lucide-react';

const socket = io('http://localhost:5000'); // Adjust if hosted elsewhere

function Canvas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedTool, setSelectedTool] = useState('pointer');
  const [style, setStyle] = useState({ fill: 'transparent', stroke: '#ffffff', strokeWidth: 2 });
  const [theme, setTheme] = useState('dark');
  const [canvasData, setCanvasData] = useState({ shapes: [] });

  const [toast, setToast] = useState({ visible: false, message: '', variant: 'success' });
  
  const [cursors, setCursors] = useState({});

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user from localStorage')
      }
    }
  }, [])

  const previousShapesRef = useRef([]);

  // Always allow editing since there's no user management
  // const canEdit = true;
  const [canEdit, setCanEdit] = useState(true);
  const { id: projectId } = useParams();

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    socket.emit('join-room', projectId);

    socket.on('canvas-update', (data) => {
      console.log('Canvas update received:', data);
      // Update canvasData with the new shapes
      setCanvasData(data.canvasData);
    });

    socket.on('cursor-update', (data) => {
      if (data.source === socket.id) return;
      console.log('Cursor update received:', data);

      setCursors(prev => ({
        ...prev,
        [data.source]: {
          x: data.cursorData.x,
          y: data.cursorData.y,
          name: data.cursorData.name,
          color: data.cursorData.color,
        }
      }));
    });

    return () => {
      socket.off('canvas-update');
      socket.emit('leave-room', projectId);
    };
  }, [projectId]);

  const sendCanvasUpdate = (data) => {
    socket.emit('canvas-update', {
      roomId: projectId,
      data,
      source: socket.id,
    });
  };

  const myColor = useRef(randomColor());
  
  const handleMouseMove = (e) => {
    if (!canEdit) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    socket.emit("cursor-update", {
      roomId: projectId,
      cursorData: {
        x,
        y,
        name: user ? `${user.firstName} ${user.lastName}` : 'Guest User', // Replace with actual user name if available
        color: myColor.current, // Random color for each cursor
      }
    });
  };

  const saveTimeoutRef = useRef(null);
  useEffect(() => {
    if (!canEdit || !project || !project._id) return;
  
    // Clear any previously scheduled save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
  
    // Schedule new save
    saveTimeoutRef.current = setTimeout(async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${project._id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ canvasData })
        });
  
        if (!res.ok) {
          console.error('Auto-save failed:', await res.text());
        } else {
          console.log('Canvas auto-saved!');
          setToast({ visible: true, message: 'Canvas auto-saved!', variant: 'success' });
        }
      } catch (err) {
        console.error('Auto-save error:', err);
      }
    }, 1500); // ⏱️ debounce: 1500ms after last change
  
    return () => {
      clearTimeout(saveTimeoutRef.current);
    };
  }, [canvasData, project]);  

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        // const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (!res.ok) {
          if (res.status === 404) {
            setError('Project not found');
          } else if (res.status === 403) {
            setError('Unauthorized access to this project');
          } else {
            setError('Failed to fetch project');
          }
          return;
        }
  
        const data = await res.json();

        console.log(data);
        
        
        setProject(data);
        setCanvasData(data.canvasData || { shapes: [] });
        setCanEdit(data.canEdit); // Default to true if not specified
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the project');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProject();
  }, [id]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#171717] text-white">
        <div className="text-center animate-pulse">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#171717] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error ? 'Error loading project' : 'Project not found'}
          </h1>
          {error && (
            <p className="text-red-400 mb-4">{error}</p>
          )}
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`w-full h-screen relative transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#171717]' : 'bg-gray-100'
      }`}>
        <div onMouseMove={handleMouseMove} className="w-full h-full relative">
          <Whiteboard 
            selectedTool={selectedTool} 
            style={style} 
            theme={theme}
            initialShapes={canvasData.shapes || []}
            readOnly={false}
            onShapesChange={(shapes) => {
              const prev = JSON.stringify(previousShapesRef.current);
              const curr = JSON.stringify(shapes);
            
              if (prev !== curr) {
                previousShapesRef.current = shapes;
                canEdit ? setCanvasData({ shapes }) : '';
                canEdit ? sendCanvasUpdate({ shapes }) : '';
              }
            }}
            socket={socket}
            projectId={project._id}
            canEdit={canEdit}
          />
        </div>
        
        {canEdit && (
          <ColorPanel onChange={(newStyle) => setStyle(newStyle)} theme={theme} />
        )}
        
        <Header theme={theme} project={project} />
        
        <div className="absolute top-20 bottom-3 left-3 flex flex-col justify-between z-50">
          {canEdit && (
            <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} theme={theme} />
          )}
          <div className="flex flex-col gap-2 items-center mt-auto">
            <HelpButton theme={theme} />
            <UserMenu theme={theme} onToggleTheme={toggleTheme} user={user} />
          </div>
        </div>

        {/* Ruler and Zoom Indicator */}
        <div className={`absolute bottom-4 right-4 flex items-center space-x-4 px-3 py-2 rounded-lg z-50 ${
          theme === 'dark'
            ? 'bg-zinc-900 border border-zinc-700 text-white'
            : 'bg-white border border-gray-300 text-gray-700 shadow-lg'
        }`}>
          <div className="flex items-center space-x-2 text-sm">
            <span>📏</span>
            <span>X: 0, Y: 0</span>
          </div>
          <div className={`w-px h-4 ${
            theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-300'
          }`} />
          <div className="flex items-center space-x-2 text-sm">
            <span>🔍</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <Toast 
        message={toast.message} 
        visible={toast.visible} 
        variant={toast.variant}
        onClose={() => setToast({ ...toast, visible: false })} 
        theme={theme}
      />

      {/* Cursor Display */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Object.entries(cursors).map(([socketId, cursor]) => (
          <div 
            key={socketId} 
            className="absolute pointer-events-none"
            style={{
              left: cursor.x,
              top: cursor.y,
              fontSize: '12px',
              // choose a random bg color for each cursor
            }}
          >
            <MousePointer2
              className="text-white"
              size={20}
              style={{ fill: cursor.color, stroke: cursor.color }}
            />
            <span
              className="px-2 py-1 rounded-md text-xs font-medium text-[#171717] ml-4"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Canvas;