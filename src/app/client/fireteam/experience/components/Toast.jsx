import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

/**
 * Toast notification component
 */
export default function Toast({ type = 'info', message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <FaCheckCircle className="text-green-500" aria-hidden="true" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <FaExclamationCircle className="text-red-500" aria-hidden="true" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <FaInfoCircle className="text-blue-500" aria-hidden="true" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <FaExclamationCircle className="text-yellow-500" aria-hidden="true" />,
    },
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`${style.bg} ${style.border} ${style.text} border rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[300px] max-w-[500px] animate-slide-in`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <div className="flex-1 text-sm">{message}</div>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition"
        aria-label="Close notification"
      >
        <FaTimes className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * Toast container component
 */
export function ToastContainer({ toasts, onRemoveToast }) {
  return (
    <div 
      className="fixed top-20 right-6 z-[9999] flex flex-col gap-3"
      aria-label="Notifications"
      role="region"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => onRemoveToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
}

