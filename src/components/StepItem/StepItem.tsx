import './StepItem.scss'

interface StepItemProps {
  data: {
    title: string
    description: string
    status: string
  }
  className?: string
}

export const StepItem: React.FC<StepItemProps> = ({ data, className }) => {
  const handleStatus = (e: any) => {
    switch (e) {
      case 'done':
        return 'is-done'
      case 'progress':
        return 'current'
      default:
        return ''
    }
  }

  return (
    <div>
      <ul className='StepProgress'>
        <li className={`StepProgress-item ${handleStatus(data?.status)}`}>
          <strong className='text-primary-darker mb-1'>{data?.title}</strong>
          <p className='text-xs'>{data?.description}</p>
        </li>
      </ul>
    </div>
  )
}
