import { useRef, useCallback, useEffect } from 'react'

export function useDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  return useCallback(
    (...args: Args) => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => fn(...args), delay)
    },
    [fn, delay],
  )
}
