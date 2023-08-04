import { LocalStorage } from 'utils'
import './StepItem.scss'
import { StorageKey } from 'config/storage'

interface StepItemProps {
  data: {
    name: string
    description: string
    done: boolean
    step: number
  }
  className?: string
  onLastStep: () => void
  onPengajuanRAB: () => void
  onFinalStep: () => void
}

export const StepItem: React.FC<StepItemProps> = ({
  data,
  className,
  onLastStep,
  onPengajuanRAB,
  onFinalStep,
}) => {
  const storage = new LocalStorage()
  const handleStatus = (e: any) => {
    switch (e) {
      case true:
        return 'is-done'
      default:
        return ''
    }
  }

  return (
    <div>
      <ul
        className='StepProgress'
        onClick={() =>
          data.step === 4
            ? onLastStep()
            : data?.step === 5 &&
              storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
            ? onPengajuanRAB()
            : data?.step > 5 &&
              storage.getItem(StorageKey?.LEVEL) === 'Kontraktor'
            ? onFinalStep()
            : void 0
        }
      >
        <li className={`StepProgress-item ${handleStatus(data?.done)}`}>
          <strong className='text-primary-darker mb-1'>{data?.name}</strong>
          <p className='text-xs'>{data?.description}</p>
        </li>
      </ul>
    </div>
  )
}
