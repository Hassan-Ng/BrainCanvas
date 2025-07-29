import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Whiteboard from './Whiteboard';
import ToolBar from './ToolBar';
import ColorPanel from './ColorPanel';
import UserMenu from './UserMenu';
import Header from './Header';
import HelpButton from './HelpButton';
import { mockProjects } from '../data/projects';

function Canvas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedTool, setSelectedTool] = useState('pointer');
  const [style, setStyle] = useState({ fill: 'transparent', stroke: '#ffffff', strokeWidth: 2 });
  const [theme, setTheme] = useState('dark');
  const [canvasData, setCanvasData] = useState({ shapes: [] });


  // Always allow editing since there's no user management
  const canEdit = true;
  const mode = 'editor';

  useEffect(() => {
    // Load project data from mock data
    const projectId = parseInt(id);
    const foundProject = mockProjects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
      setCanvasData(foundProject.canvasData || { shapes: [] });
    } else {
      setError('Project not found');
    }
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
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading project...</div>
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
    <div className={`w-full h-screen relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#171717]' : 'bg-gray-100'
    }`}>
      <Whiteboard 
        selectedTool={selectedTool} 
        style={style} 
        theme={theme}
        initialShapes={canvasData.shapes || []}
        readOnly={false}
        onShapesChange={(shapes) => setCanvasData({ shapes })}
      />
      
      <ColorPanel onChange={(newStyle) => setStyle(newStyle)} theme={theme} />
      
      <Header theme={theme} project={project} />
      
      <div className="absolute top-20 bottom-3 left-3 flex flex-col justify-between z-50">
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} theme={theme} />
        <div className="flex flex-col gap-2 items-center">
          <HelpButton theme={theme} />
          <UserMenu theme={theme} onToggleTheme={toggleTheme} />
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
  );
}

export default Canvas;