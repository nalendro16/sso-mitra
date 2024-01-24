import images from 'assets/images'
import { ArmadaCard, Header } from 'components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import Skeleton from 'react-loading-skeleton'

export const ArmadaList: React.FC = () => {
  const navigate = useNavigate()
  const [listArmada, setListArmada] = useState<any>([])
  const [dataListArmana, getListArmada] = usePost({ isLoading: false })
  const [dataArmadaDelete, postArmadaDelete] = usePost({ isLoading: false })
  const { openAlert } = useGlobalContext()

  useEffect(() => {
    const { data } = dataListArmana
    if (data?.status === 'success') {
      setListArmada(data?.result)
    } else {
      console.log('error', data?.messages)
    }
  }, [dataListArmana])

  useEffect(() => {
    const { data } = dataArmadaDelete
    if (data?.status === 'success') {
      getListArmada.getRequest(API.LIST_ARMADA)
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataArmadaDelete])

  useEffect(() => {
    getListArmada.getRequest(API.LIST_ARMADA)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDotsClick = (no_armada: number) => {
    listArmada?.forEach((item: any) => {
      if (item.id_accommodation === no_armada) {
        item.isDotActive = !item.isDotActive
      } else {
        item.isDotActive = false
      }
    })

    setListArmada([...listArmada])
  }

  return (
    <div>
      <Header
        label='Armada Saya'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />

      {dataListArmana?.isLoading ? (
        Array.from([1, 2, 3]).map((item: any) => {
          return (
            <div
              className='my-6 !h-fit flex-none outline-1 outline outline-neutral-10 rounded-lg px-4 py-3 shadow-md'
              key={item}
            >
              <Skeleton width={80} height={20} />
              <div className='flex justify-center my-4'>
                <Skeleton width={120} height={120} />
              </div>
              <div className='flex justify-between'>
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={20} />
                <Skeleton width={80} height={20} />
              </div>
            </div>
          )
        })
      ) : listArmada?.length !== 0 ? (
        listArmada?.map((item: any, index: number) => (
          <ArmadaCard
            data={item}
            key={index}
            onClick={() => void 0}
            onClickDots={() => handleDotsClick(item.id_accommodation)}
            onDelete={() => {
              item.status_accommodation === 1
                ? openAlert({
                    images: images.ic_check_warning,
                    messages:
                      'Armada yang tidak aktif tidak dapat dioperasionalkan',
                    title: 'Yakin Ingin Menonaktifkan?',
                    isConfirm: true,
                    btnConfirmText: 'Ya',
                    btnCloseText: 'Tidak',
                    callback: (e: any) => {
                      if (e.isConfirm) {
                        postArmadaDelete.getRequest(API.DELETE_ARMADA, {
                          id_accommodation: item.id_accommodation,
                        })
                      }
                    },
                  })
                : openAlert({
                    messages: 'Setatus Armada akan berubah',
                    title: 'Yakin Ingin Mengaktifkan?',
                    isConfirm: true,
                    btnConfirmText: 'Ya',
                    btnCloseText: 'Tidak',
                    callback: (e: any) => {
                      if (e.isConfirm) {
                        postArmadaDelete.getRequest(API.DELETE_ARMADA, {
                          id_accommodation: item.id_accommodation,
                        })
                      }
                    },
                  })
            }}
            onEdit={() => navigate(`/armada-edit/${item.id_accommodation}`)}
          />
        ))
      ) : (
        <div className='my-auto mx-4 mt-8'>
          <img
            src={images.bg_no_product}
            alt=''
            className='mx-auto w-20 h-16'
          />
          <p className='text-sm font-semi-bold text-center text-primary-base mt-4'>
            Belum ada armada terdaftar
          </p>
        </div>
      )}

      <div
        className='border border-dashed rounded-lg border-primary-base flex py-2 justify-center items-center mt-6'
        onClick={() => navigate('/armada-create')}
      >
        <img src={images?.ic_plus} alt='' />
        <div className='text-primary-base'>Armada Baru</div>
      </div>
    </div>
  )
}
