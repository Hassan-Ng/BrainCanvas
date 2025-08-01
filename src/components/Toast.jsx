import { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ message, visible, onClose, type = 'success', theme = 'dark' }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const baseStyle = `fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-300`;

  const variants = {
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />, 
      light: 'bg-green-100 text-green-800',
      dark: 'bg-green-800 text-green-100',
    },
    error: {
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />, 
      light: 'bg-red-100 text-red-800',
      dark: 'bg-red-800 text-red-100',
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-500" />, 
      light: 'bg-blue-100 text-blue-800',
      dark: 'bg-blue-800 text-blue-100',
    }
  };

  const style = variants[type]?.[theme] || variants.success[theme];
  const Icon = variants[type]?.icon || variants.success.icon;

  return (
    <div className={`${baseStyle} ${style}`}>
      {Icon}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">
        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
}
