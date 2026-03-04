"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";

/**
 * Reusable modal for Career Compass add/edit forms.
 * Handles overlay, card, title, icon, close button, and optional footer.
 *
 * @param {boolean} open - Whether the modal is visible
 * @param {() => void} onClose - Called when closing (X or backdrop)
 * @param {string} title - Modal title (e.g. "Add Application")
 * @param {React.ReactNode} icon - Icon element (e.g. <FaPlus />)
 * @param {React.ReactNode} children - Form content
 * @param {React.ReactNode} [footer] - Custom footer; if not provided and onSubmit is set, uses default Cancel + Submit buttons
 * @param {() => void} [onSubmit] - Submit handler; when set with no footer, renders default footer with Submit button
 * @param {string} [submitLabel="Save"] - Label for the submit button
 * @param {string} [cancelLabel="Cancel"] - Label for the cancel button
 */
export default function CareerCompassModal({
  open,
  onClose,
  title,
  icon,
  children,
  footer,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
}) {
  if (!open) return null;

  const defaultFooter =
    onSubmit != null ? (
      <div className="flex justify-end gap-2 pt-4 mt-5 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold text-xs transition-all"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] text-white rounded-lg hover:bg-[#003875] font-semibold text-xs transition-all shadow-sm"
        >
          {submitLabel}
        </button>
      </div>
    ) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-compass-modal-title"
    >
      <div className="bg-white rounded-xl p-5 w-full max-w-2xl shadow-2xl relative mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[#002147]/10 text-[#002147]">
              {icon}
            </div>
            <h2
              id="career-compass-modal-title"
              className="text-base font-bold text-[#002147]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-gray-500" size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3">{children}</div>

        {/* Footer */}
        {footer !== undefined ? footer : defaultFooter}
      </div>
    </div>
  );
}
