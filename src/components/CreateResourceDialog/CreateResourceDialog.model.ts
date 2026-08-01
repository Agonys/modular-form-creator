export interface CreateResourceDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
}
