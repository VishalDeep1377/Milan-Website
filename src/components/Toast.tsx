import { Check } from 'lucide-react'

interface ToastProps {
  message: string
}

export function Toast({ message }: ToastProps) {
  if (!message) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <Check size={16} aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}
