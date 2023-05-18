import React, { useEffect } from 'react'

interface InputCodeProps {
  className?: string
  cols: number
  value: string
  onComplete: (e: string) => void
}

export const InputCode: React.FC<InputCodeProps> = ({
  className,
  cols,
  value,
  onComplete,
}) => {
  useEffect(() => {
    if (value.length === cols) {
      onComplete(value)
    }
  }, [value])

  const formInput = []

  for (let i = 0; i < cols; i++) {
    formInput.push(
      <div
        key={i}
        className='flex items-center justify-center rounded-lg border border-neutral-20 h-auto aspect-square'
      >
        {i < value.length && (
          <div className='bg-secondary w-2/5 h-2/5 rounded-full' />
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        className={`grid gap-3`}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {formInput}
      </div>
    </div>
  )
}
