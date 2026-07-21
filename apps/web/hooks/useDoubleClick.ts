import { useEffect, useState } from 'react'

export const useDoubleClick = (
  onSingleClick: (id: number) => void,
  onDblClick: (id: number) => void
) => {
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [clicks, setClicks] = useState<number>(0)

  useEffect(() => {
    if (clicks == 1) {
      const timer = setTimeout(() => {
        if (currentId) onSingleClick(currentId)
        setClicks(0)
      }, 200)
      return () => clearTimeout(timer)
    }
    if (clicks == 2) {
      if (currentId) onDblClick(currentId)
      setClicks(0)
    }
  }, [clicks])

  return {
    handleClick: (id: number) => {
      setCurrentId(id)
      setClicks(clicks + 1)
    },
  }
}
