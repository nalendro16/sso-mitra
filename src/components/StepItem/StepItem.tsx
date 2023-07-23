import './StepItem.scss'

interface StepItemProps {
  data: {
    name: string
    description: string
    status: string
    step: number
  }
  className?: string
  onLastStep: () => void
}

export const StepItem: React.FC<StepItemProps> = ({
  data,
  className,
  onLastStep,
}) => {
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
      <ul
        className='StepProgress'
        onClick={() => (data.step === 4 ? onLastStep() : void 0)}
      >
        <li className={`StepProgress-item ${handleStatus(data?.status)}`}>
          <strong className='text-primary-darker mb-1'>{data?.name}</strong>
          <p className='text-xs'>{data?.description}</p>
        </li>
      </ul>
    </div>
  )
}
