import {
  MousePointer,
  Square,
  Circle,
  Type,
  ArrowRight,
  Minus,
  Pencil,
} from 'lucide-react';

const iconMap = {
  pointer: <MousePointer size={15} />,
  rectangle: <Square size={15} />,
  ellipse: <Circle size={15} />,
  text: <Type size={15} />,
  arrow: <ArrowRight size={15} />,
  line: <Minus size={15} />,
  freedraw: <Pencil size={15} />,
};

export default function ToolBar({ selectedTool, setSelectedTool, theme }) {
  const tools = ['pointer', 'rectangle', 'ellipse', 'text', 'arrow', 'line', 'freedraw'];

  return (
    <div className={`rounded-lg p-1 flex flex-col gap-1 z-50 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-zinc-900 border border-zinc-700' 
        : 'bg-white border border-gray-300 shadow-lg'
    }`}>
      {tools.map((tool) => (
        <button
          key={tool}
          onClick={() => setSelectedTool(tool)}
          className={`p-2 rounded-md cursor-pointer transition-colors duration-200 ${
            theme === 'dark'
              ? `text-white ${selectedTool === tool ? 'bg-zinc-700 hover:bg-zinc-600' : 'hover:bg-zinc-800'}`
              : `text-gray-700 ${selectedTool === tool ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'}`
            }`}
          title={tool}
        >
          {iconMap[tool]}
        </button>
      ))}
    </div>
  );
}