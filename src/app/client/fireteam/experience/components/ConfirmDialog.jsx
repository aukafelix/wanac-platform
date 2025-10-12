import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

/**
 * Confirmation dialog component to replace window.confirm()
 */
export default function ConfirmDialog({ title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="text-yellow-500 text-2xl" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            aria-label={cancelText}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            aria-label={confirmText}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

