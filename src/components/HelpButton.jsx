import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function HelpButton({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Space + Drag', description: 'Pan around the canvas' },
    { key: 'Ctrl/Cmd + Z', description: 'Undo last action' },
    { key: 'Ctrl/Cmd + Y', description: 'Redo last action' },
    { key: 'Ctrl/Cmd + A', description: 'Select all objects' },
    { key: 'Delete', description: 'Delete selected objects' },
    { key: 'Escape', description: 'Clear selection' },
    { key: 'Shift + Click', description: 'Multi-select objects' },
    { key: 'Ctrl/Cmd + Drag', description: 'Maintain aspect ratio while drawing' },
    { key: 'Mouse Wheel', description: 'Zoom in/out' },
  ];

  const tools = [
    { name: 'Pointer', description: 'Select and move objects' },
    { name: 'Rectangle', description: 'Draw rectangles' },
    { name: 'Ellipse', description: 'Draw circles and ellipses' },
    { name: 'Text', description: 'Add text (type after placing)' },
    { name: 'Arrow', description: 'Draw L-shaped arrows' },
    { name: 'Line', description: 'Draw straight lines' },
    { name: 'Free Draw', description: 'Draw freehand sketches' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`w-10 aspect-square rounded-full flex items-center justify-center transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-zinc-800 border border-zinc-600 text-white hover:bg-zinc-700'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-lg'
        }`}
        title="Help & Shortcuts"
      >
        <HelpCircle size={18} />
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg shadow-xl z-50 ${
            theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-700 text-white'
              : 'bg-white border border-gray-200 text-gray-900'
          }`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
            }`}>
              <h2 className="text-xl font-semibold">Help & Shortcuts</h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Keyboard Shortcuts */}
              <div>
                <h3 className="text-lg font-medium mb-4">Keyboard Shortcuts</h3>
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {shortcut.description}
                      </span>
                      <kbd className={`px-2 py-1 text-xs font-mono rounded ${
                        theme === 'dark'
                          ? 'bg-zinc-800 border border-zinc-600 text-gray-300'
                          : 'bg-gray-100 border border-gray-300 text-gray-700'
                      }`}>
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-lg font-medium mb-4">Drawing Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tools.map((tool, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                    }`}>
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className={`text-xs mt-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {tool.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-lg font-medium mb-4">Tips</h3>
                <div className={`space-y-2 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p>• Hold Shift while selecting to add/remove objects from selection</p>
                  <p>• Hold Ctrl/Cmd while drawing to maintain aspect ratio</p>
                  <p>• Use the color panel to change stroke and fill colors</p>
                  <p>• Double-click text objects to edit them</p>
                  <p>• Use mouse wheel to zoom in and out of the canvas</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}