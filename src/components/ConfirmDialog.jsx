import React from 'react'

const ConfirmDialog = ({ open, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", onCancel, onConfirm, theme, variant = 'primary' }) => {
  if (!open) return null;

  const isDark = theme === 'dark';
  const confirmClass =
    variant === 'danger'
      ? isDark
        ? 'bg-red-600 hover:bg-red-700 text-white'
        : 'bg-red-500 hover:bg-red-600 text-white'
      : isDark
      ? 'bg-blue-600 hover:bg-blue-700 text-white'
      : 'bg-blue-500 hover:bg-blue-600 text-white';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${
        isDark ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog