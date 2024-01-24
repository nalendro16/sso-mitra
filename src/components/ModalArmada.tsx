import { useGet } from 'hooks/useRequest'
import { Modal } from './Modal'
import { useEffect, useState } from 'react'
import { API } from 'config/api'
import { ArmadaCard } from './ArmadaCard'
import images from 'assets/images'
import Skeleton from 'react-loading-skeleton'
import { useGlobalContext } from 'hooks/context'

interface ModalArmadaProps {
  onHide: () => void
  isOpen: boolean
  onClick: (e: any) => void
}

export const ModalArmada: React.FC<ModalArmadaProps> = ({
  onHide,
  isOpen = false,
  onClick,
}) => {
  const { openAlert } = useGlobalContext()
  const [dataListArmana, getListArmada] = useGet({ isLoading: false })
  const [listArmada, setListArmada] = useState<any>([])

  useEffect(() => {
    const { data } = dataListArmana
    if (data?.status === 'success') {
      setListArmada(data?.result)
    } else if (data?.status === 'fail') {
      console.log('error', data?.messages)
    }
  }, [dataListArmana])

  useEffect(() => {
    const controller = new AbortController()
    getListArmada.getRequest(API.LIST_ARMADA_MODAL)
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onHide}
        showClassName='!opacity-10'
        contentClassName={`mx-4 ${
          listArmada?.length === 1 ? 'h-1/2' : 'h-3/4'
        } bg-white px-2 no-scrollbar py-4 rounded-md overflow-auto shadow-md`}
      >
        {dataListArmana?.isLoading ? (
          Array.from([1, 2]).map((item: any) => {
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
              simpleCard
              onClickDots={() => void 0}
              onDelete={() => void 0}
              onEdit={() => void 0}
              onClick={(id) => {
                item.status_accommodation === 1
                  ? openAlert({
                      images: item.url_accommodation,
                      title: `Konfirmasi Armada`,
                      messages: `Terima transaksi dengan armada ${item.name}?`,
                      isConfirm: true,
                      btnConfirmText: 'Ya',
                      btnCloseText: 'Tidak',
                      callback: (e: any) => {
                        if (e.isConfirm) {
                          onClick(id)
                        }
                      },
                    })
                  : openAlert({
                      images: item.url_accommodation,
                      title: `Tidak dapat memilih armada non aktif`,
                      messages: `Aktifkan dahulu ${item.name} di menu armada`,
                      btnCloseText: 'Oke',
                    })
              }}
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
      </Modal>
    </>
  )
}
