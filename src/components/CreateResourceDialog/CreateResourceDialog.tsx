import { useState } from 'react'
import { Drawer, Button, Input } from '@/design-system'
import { DialogActions } from './CreateResourceDialog.styles'
import type { CreateResourceDialogProps } from './CreateResourceDialog.model'

export function CreateResourceDialog({
  isOpen,
  onClose,
  onCreate,
}: CreateResourceDialogProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Resource name is required')
      return
    }
    if (trimmed.length > 255) {
      setError('Resource name must be at most 255 characters')
      return
    }
    if (!/^[A-Za-z0-9 -]+$/.test(trimmed)) {
      setError('Resource name can only contain letters, numbers, spaces, and hyphens')
      return
    }
    setError('')
    onCreate(trimmed)
    setName('')
  }

  const handleClose = () => {
    setName('')
    setError('')
    onClose()
  }

  return (
    <Drawer title="Create Resource" isOpen={isOpen} onClose={handleClose}>
      <Input
        label="Resource Name"
        placeholder="Enter resource name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        helperText="Letters, numbers, spaces, and hyphens only"
      />
      <DialogActions>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Drawer>
  )
}
