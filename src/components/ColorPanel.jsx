import { useState } from 'react';
import { PaintBucket, Paintbrush, Plus } from 'lucide-react';

export default function ColorPanel({ onChange, theme = 'dark' }) {
  const [outlineColor, setOutlineColor] = useState('#ffffff');
  const [fillColor, setFillColor] = useState('transparent');
  const [strokeWidth, setStrokeWidth] = useState(3);

  const outlineSizes = [1, 3, 5, 7];
  const swatches = ['transparent', '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#888888'];

  const handleChange = (updated = {}) => {
    onChange({
      stroke: outlineColor,
      fill: fillColor,
      strokeWidth,
      ...updated,
    });
  };

  return (
    <div className={`absolute top-20 right-4 rounded-lg p-1 z-50 transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-zinc-900 border border-zinc-700 text-white'
        : 'bg-white border border-gray-300 text-gray-700 shadow-lg'
    }`}>
      <div className="flex gap-1">
        {/* Outline Button */}
        <div className="relative group">
          <button
            className={`p-2 rounded-md border transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-600'
                : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
            }`}
            title="Outline"
          >
            <Paintbrush size={15} />
          </button>
          <div className="absolute right-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
            <div className={`rounded-md shadow-md p-2 w-40 z-50 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-700'
                : 'bg-white border border-gray-300'
            }`}>
              <div className="mb-2 text-xs">Color</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {swatches.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 cursor-pointer rounded-full border flex items-center justify-center relative ${
                      theme === 'dark' ? 'border-zinc-500' : 'border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setOutlineColor(color);
                      handleChange({ stroke: color });
                    }}
                  >
                    {color === 'transparent' ? (
                      <div className="w-0.5 h-full bg-red-500 rotate-45" />
                    ) : ''}

                    {color === outlineColor ? (
                      <svg
                        className="absolute -top-1 -right-1 w-3 aspect-squares text-white bg-green-600 rounded-full p-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : ''}
                  </button>
                ))}

                <label
                  className={`w-6 h-6 cursor-pointer relative overflow-hidden rounded-full border ${
                    theme === 'dark' ? 'border-zinc-800 bg-zinc-800' : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                  }`}>
                    <Plus size={12} className={theme === 'dark' ? 'text-white' : 'text-gray-600'} />
                  </div>
                  <input
                    type="color"
                    value={outlineColor}
                    onChange={(e) => {
                      setOutlineColor(e.target.value);
                      handleChange({ stroke: e.target.value });
                    }}
                  />
                </label>
              </div>

              <div className="mb-1 text-xs">Width</div>
              <div className="grid grid-cols-2 gap-1">
                {outlineSizes.map((size) => (
                  <button
                    key={size}
                    className={`cursor-pointer text-xs px-2 py-1 rounded border transition-colors duration-200 ${
                      strokeWidth === size
                        ? theme === 'dark'
                          ? 'bg-zinc-700 border-zinc-600'
                          : 'bg-gray-200 border-gray-300'
                        : theme === 'dark'
                          ? 'bg-zinc-900 border-zinc-600 hover:bg-zinc-800'
                          : 'bg-white border-gray-300 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setStrokeWidth(size);
                      handleChange({ strokeWidth: size });
                    }}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fill Button */}
        <div className="relative group">
          <button
            className={`p-2 rounded-md border transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-600'
                : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
            }`}
            title="Fill"
          >
            <PaintBucket size={15} />
          </button>
          <div className="absolute right-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
            <div className={`rounded-md shadow-md p-2 w-40 z-50 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-700'
                : 'bg-white border border-gray-300'
            }`}>
              <div className="mb-2 text-xs">Color</div>
              <div className="flex flex-wrap gap-1">
                {swatches.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 cursor-pointer rounded-full border flex items-center justify-center relative ${
                      theme === 'dark' ? 'border-zinc-500' : 'border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setFillColor(color);
                      handleChange({ fill: color });
                    }}
                    >
                    {color === 'transparent' ? (
                      <div className="w-0.5 h-full bg-red-500 rotate-45" />
                    ) : ''}

                    {color === fillColor ? (
                      <svg
                        className="absolute -top-1 -right-1 w-3 aspect-squares text-white bg-green-600 rounded-full p-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : ''}
                  </button>
                ))}

                <label
                  className={`w-6 h-6 cursor-pointer relative overflow-hidden rounded-full border ${
                    theme === 'dark' ? 'border-zinc-800 bg-zinc-800' : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                  }`}>
                    <Plus size={12} className={theme === 'dark' ? 'text-white' : 'text-gray-600'} />
                  </div>
                  <input
                    type="color"
                    value={fillColor === 'transparent' ? '#000000' : fillColor}
                    onChange={(e) => {
                      setFillColor(e.target.value);
                      handleChange({ fill: e.target.value });
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}