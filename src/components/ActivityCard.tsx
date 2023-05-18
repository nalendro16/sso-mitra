import images from 'assets/images'

interface ActivityCardProps {
  data: {
    title: string
    location: string
    date: string
  }
}
export const ActivityCard: React.FC<ActivityCardProps> = ({ data }) => {
  return (
    <div className='border-l border-l-purple rounded-r-md p-4 px-3'>
      <div className='text-sm text-primary-darker font-bold'>{data?.title}</div>
      <div className='flex items-center mt-2.5 mb-1.5 gap-3'>
        <img src={images.ic_order_location} alt='' className='w-7 h-7' />
        <div className='text-sm text-primary-darker'>{data?.location}</div>
      </div>
      <div className='flex items-center gap-3'>
        <img src={images.ic_calendar} alt='' className='w-7 h-7' />
        <div className='text-sm text-primary-darker'>{data?.date}</div>
      </div>
    </div>
  )
}
