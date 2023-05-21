import clsx from 'clsx'
import React, { useState, useEffect } from 'react'

interface AnimatedDivProps {
  className?: string
  animationType?: string
}
export const AnimatedDiv: React.FC<
  AnimatedDivProps & React.HTMLAttributes<HTMLDivElement>
> = ({ className, children, animationType = 'animate-ease-body', ...rest }) => {
  const [animtaion, setAnimation] = useState<boolean>(true)

  useEffect(() => {
    let showedTime = setTimeout(() => {
      setAnimation(false)
    }, 850)
    return () => {
      clearInterval(showedTime)
    }
  }, [])

  return (
    <div className={clsx(animtaion && animationType, className)} {...rest}>
      {children}
    </div>
  )
}
