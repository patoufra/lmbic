'use client'

import { useToast } from './use-toast'

export function Toaster() {
  const { toasts, dismissToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4"
        >
          <h3 className="font-bold">{toast.title}</h3>
          {toast.description && <p>{toast.description}</p>}
          <button
            onClick={() => dismissToast(toast.id)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}

