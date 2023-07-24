import React from 'react'

type Props = {
  type: 'pull' | 'release'
  text?: string
  className?: string
}

export const RefreshContent: React.FC<Props> = ({ type, text, className }) => {
  return (
    <div className={`text-center text-xs pb-3 text-neutral-20 ${className}`}>
      {type === 'pull' ? <div>&#8595;</div> : <div>&#8593;</div>}
      {text || type === 'pull' ? 'Pull down to refresh' : 'Release to refresh'}
    </div>
  )
}
