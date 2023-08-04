import { Header } from 'components'
import { API } from 'config/api'
import { useGet } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

export const PanduanMitra: React.FC = () => {
  const navigate = useNavigate()
  const [dataPanduanMitra, getPanduanMitra] = useGet({ isLoading: false })
  const [panduanMitra, setPanduanMitra] = useState<any>()

  useEffect(() => {
    getPanduanMitra.getRequest(API.PANDUAN_MITRA)
  }, [])

  useEffect(() => {
    const { data } = dataPanduanMitra
    if (data?.status === 'success') {
      setPanduanMitra(data?.result?.value_text)
    } else if (data?.status === 'fail') {
      setPanduanMitra('Data not found')
    }
  }, [dataPanduanMitra])

  return (
    <div className='bg-yelloww'>
      <Header
        label='Panduan Mitra'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />
      {dataPanduanMitra?.isLoading ? (
        <div>
          <Skeleton width={200} height={24} className='mb-2' />
          <Skeleton width={380} height={16} className='mb-2' />
          <Skeleton width={380} height={16} className='mb-2' />
          <Skeleton width={380} height={16} className='mb-2' />
          <Skeleton width={380} height={16} className='mb-2' />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: panduanMitra }} />
      )}
    </div>
  )
}
