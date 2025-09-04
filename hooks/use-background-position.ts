import {
  RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const CONTAINER_PADDING_X = 16

interface IUseBackgroundWidthProps {
  listRef: RefObject<HTMLUListElement | null>
  selectedItem: string | null | undefined
}

export interface IItemRef {
  el: HTMLLIElement | null
  name: string
}

function useBackgroundPosition({
  listRef,
  selectedItem,
}: IUseBackgroundWidthProps) {
  const itemRefs = useRef<IItemRef[]>([])
  const [backgroundWidth, setBackgroundWidth] = useState(0)
  const [itemPosition, setItemPosition] = useState({
    offsetTop: 0,
    clientHeight: 0,
  })
  const [isFirstRender, setIsFirstRender] = useState(true)

  const updateItemPosition = useCallback(() => {
    const selectedItemRef = itemRefs.current.find(
      (item) => item.name === selectedItem,
    )?.el

    if (selectedItemRef) {
      const initialAdjustedOffsetTop = isFirstRender ? 12 : 0
      const adjustedOffsetTop =
        selectedItemRef.offsetTop - initialAdjustedOffsetTop

      setItemPosition({
        offsetTop: adjustedOffsetTop,
        clientHeight: selectedItemRef.clientHeight,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const updateBackgroundWidth = useCallback(() => {
    if (listRef.current) {
      const containerWidth = listRef.current.clientWidth - CONTAINER_PADDING_X
      setBackgroundWidth(containerWidth)
    }
  }, [listRef])

  useLayoutEffect(() => {
    updateItemPosition()

    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isFirstRender, selectedItem, updateItemPosition])

  useLayoutEffect(() => {
    const handleResize = () => {
      updateBackgroundWidth()
      updateItemPosition()
    }

    updateBackgroundWidth()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateBackgroundWidth, updateItemPosition])

  return {
    backgroundWidth,
    updateBackgroundWidth,
    itemRefs,
    itemOffsetTop: itemPosition.offsetTop,
    itemClientHeight: itemPosition.clientHeight,
  }
}

export { useBackgroundPosition }
