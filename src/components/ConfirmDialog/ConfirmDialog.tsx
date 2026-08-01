import { Drawer, Button } from '@/design-system'
import { DialogContent, DialogActions } from './ConfirmDialog.styles'
import type { ConfirmDialogProps } from './ConfirmDialog.model'

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Drawer title={title} isOpen={isOpen} onClose={onCancel}>
      <DialogContent>
        <p>{message}</p>
        <DialogActions>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogActions>
      </DialogContent>
    </Drawer>
  )
}
