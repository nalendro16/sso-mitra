export const CardSedotSchedule: React.FC = () => {
  return (
    <div className='rounded-md bg-white outline outline-1 outline-neutral-10 p-3 text-sm h-24 mb-2'>
      <div className='flex justify-between mb-2'>
        <div className='text-primary-base'>
          {'Layanan sedot '}
          <span className='text-primary-darker font-bold'>{'Rumah'}</span>
        </div>
        <div className='text-primary-darker font-bold'>{'13 Juni 2023'}</div>
      </div>
      <div className='line-clamp-2'>
        {'Jl. Gajah Mada No. 18, Genteng, Banyuwangi 68465'} Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Quasi, iusto quidem harum facere
        at repellat sapiente. Nulla praesentium eum similique qui, aspernatur
        iusto quis id. Maxime iure ex unde consequuntur!
      </div>
    </div>
  )
}
