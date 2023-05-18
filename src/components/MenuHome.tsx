import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

interface MenuHomeProps {
  menu: Array<{ icon: string; title: string; to: string }>
  className?: string
}

export const MenuHome: React.FC<MenuHomeProps> = ({ menu, className }) => {
  const navigate = useNavigate()
  return (
    <div className={clsx('grid grid-cols-3 gap-4', className)}>
      {menu?.map((item: any, index: number) => (
        <div
          key={index}
          className='flex flex-col items-center gap-2'
          onClick={() => navigate(item.to ? item.to : void 0)}
        >
          <img src={item.icon} alt='' className='w-8 h-8' />
          <p className='text-neutral-30 text-sm text-center'>{item.title}</p>
        </div>
      ))}
    </div>
  )
}
