import { useRef, useEffect } from 'react'

/**
 * hooks setInterval
 * @url https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param   {function}  callback
 * @param   {integer}  delay
 *
 * @return  {void}
 */
const useInterval = (callback: any, delay: number | null) => {
  const savedCallback = useRef<any>(null)

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
