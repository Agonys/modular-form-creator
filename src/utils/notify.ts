import { toast } from 'react-toastify'

type NotificationType = 'success' | 'error'

interface NotificationOptions {
  type: NotificationType
  message: string
}

export function notify({ type, message }: NotificationOptions) {
  if (!message) return

  if (type === 'success') {
    toast.success(message)
  } else {
    toast.error(message)
  }
}
