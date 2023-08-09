import { useGet, usePost } from 'hooks/useRequest'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from 'config/api'
import { Button, Header, InputImage } from 'components'
import Skeleton from 'react-loading-skeleton'
import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'

export const InfoAccount: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [dataDetailProfile, getDetailProfile] = useGet({ isLoading: false })
  const [dataUpdatePhoto, postUpdatePhoto] = usePost({ isLoading: false })
  const [detailProfile, setDetailProfile] = useState<any>()

  useEffect(() => {
    const { data } = dataDetailProfile
    if (data?.status === 'success') {
      setDetailProfile(data?.result)
    }
  }, [dataDetailProfile])

  useEffect(() => {
    const { data } = dataUpdatePhoto
    if (data?.status === 'success') {
      openAlert({
        messages: 'Perubahan Berhasil Disimpan',
        showBtnClose: false,
        btnConfirmText: 'Tutup',
        isConfirm: true,
      })
      getDetailProfile.getRequest(API.PROFILE)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdatePhoto])

  useEffect(() => {
    getDetailProfile.getRequest(API.PROFILE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleProductImage = (imageCover: { image: File; base64: string }) => {
    postUpdatePhoto.getRequest(API.PROFILE_UPDATE_PIC, {
      photo: imageCover.base64.replace(/^data:image\/[a-z]+;base64,/, ''),
    })
  }

  return (
    <div
      className={`bg-no-repeat bg-cover bg-center min-h-screen pb-20 bg-white top-0 left-0 w-full absolute bg-[url('/src/assets/images/ic_rectangle_profile.png')] px-4 pt-4 z-10`}
    >
      <Header
        label='Info Akun'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-primary-base'
        className='!bg-transparent !-z-40'
        circled
      />

      <div className='mt-[4rem] flex flex-col'>
        {dataDetailProfile?.isLoading || dataUpdatePhoto.isLoading ? (
          <div className='flex justify-center mb-2'>
            <Skeleton width={80} height={80} circle className='mb-3' />
          </div>
        ) : (
          <div className='absolute left-[40%]'>
            <img
              src={detailProfile?.photo ? detailProfile?.photo : images.ic_user}
              alt=''
              className='rounded-full h-20 w-20 mx-auto mb-6 object-contain	bg-white'
            />
            <label
              htmlFor='image'
              className='justify-between flex items-center'
            >
              <img
                src={images.ic_update_image}
                alt='hapus gambar'
                className='w-8 h-8 z-10 top-0 left-14 -mt-16 relative'
              />
              <InputImage onResult={handleProductImage} id='image' />
            </label>
          </div>
        )}
      </div>

      <div className='mt-28'>
        <div className='my-4 font-bold text-primary-darker'>Informasi Akun</div>
        <div className='p-4 rounded-lg bg-white w-full drop-shadow-lg text-sm'>
          <div className='justify-between flex items-center mb-4'>
            <div>Nama</div>
            <div className='font-bold text-primary-darker'>
              {detailProfile?.name}
            </div>
          </div>
          <div className='justify-between flex items-center mb-4'>
            <div>Role</div>
            <div className='font-bold text-primary-darker'>
              {detailProfile?.level}
            </div>
          </div>
          <div className='justify-between flex items-center'>
            <div>Alamat</div>
            <div className='font-bold text-primary-darker'>
              {detailProfile?.address}
            </div>
          </div>
        </div>

        <div className='my-4 font-bold text-primary-darker'>
          Informasi Kontak
        </div>
        <div className='p-4 rounded-lg bg-white w-full drop-shadow-lg text-sm'>
          <div className='justify-between flex items-center'>
            <div>Email</div>
            <div className='font-bold text-primary-darker'>
              {detailProfile?.email}
            </div>
          </div>
        </div>

        <Button
          label='Edit'
          onClick={() => navigate('/edit-info-acc')}
          className='btn-primary mt-8 w-full'
        />
      </div>
    </div>
  )
}
