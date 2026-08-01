/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { BasicInfo, ProjectDetails } from '@/types/resource'

interface BufferState {
  basicInfo: Partial<BasicInfo> | null
  projectDetails: Partial<ProjectDetails> | null
}

interface BufferedEditsContextValue {
  state: BufferState
  bufferBasicInfo: (data: Partial<BasicInfo>) => void
  bufferProjectDetails: (data: Partial<ProjectDetails>) => void
  clearBuffer: () => void
  hasChanges: boolean
}

const BufferedEditsContext = createContext<BufferedEditsContextValue | null>(null)

export function BufferedEditsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BufferState>({
    basicInfo: null,
    projectDetails: null,
  })

  const bufferBasicInfo = useCallback((data: Partial<BasicInfo>) => {
    setState((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        ...data,
      },
    }))
  }, [])

  const bufferProjectDetails = useCallback((data: Partial<ProjectDetails>) => {
    setState((prev) => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        ...data,
      },
    }))
  }, [])

  const clearBuffer = useCallback(() => {
    setState({
      basicInfo: null,
      projectDetails: null,
    })
  }, [])

  const hasChanges = state.basicInfo !== null || state.projectDetails !== null

  return (
    <BufferedEditsContext.Provider
      value={{ state, bufferBasicInfo, bufferProjectDetails, clearBuffer, hasChanges }}
    >
      {children}
    </BufferedEditsContext.Provider>
  )
}

export function useBufferedEdits() {
  const context = useContext(BufferedEditsContext)
  if (!context) {
    throw new Error('useBufferedEdits must be used within BufferedEditsProvider')
  }
  return context
}
