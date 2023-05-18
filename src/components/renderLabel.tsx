import clsx from 'clsx'
import { numberSeparator } from 'utils'

interface renderLabelProps {
  text?: string
  value?: number
  indx?: number
  classText?: string
  classAmount?: string
}

export const renderLabel: React.FC<renderLabelProps> = ({
  text,
  value,
  indx,
  classText,
  classAmount,
}) => {
  return (
    <div className='flex items-center justify-between mb-2 ' key={indx}>
      <span className={clsx('text-sm', classText)}>{`${text}:`}</span>
      <span className={clsx('text-sm font-semi-bold', classAmount)}>
        {numberSeparator(value!, 'Rp.')}
      </span>
    </div>
  )
}
