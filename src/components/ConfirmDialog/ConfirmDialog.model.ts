export interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel?: string
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}
