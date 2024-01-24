import { API } from 'config/api'
import { useGet } from 'hooks/useRequest'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Header } from 'components'

export const AboutApp: React.FC = () => {
  const navigate = useNavigate()
  const [aboutApp, setAboutApp] = useState<any>()
  const [dataAboutApp, getAboutApp] = useGet({ isLoading: false })

  useEffect(() => {
    const { data } = dataAboutApp
    if (data?.status === 'success') {
      setAboutApp(data?.result)
    }
  }, [dataAboutApp])

  useEffect(() => {
    getAboutApp.getRequest(API.ABOUT_APP)
  }, [])

  return (
    <div
      className={`bg-no-repeat bg-cover bg-center min-h-screen pb-20 bg-white top-0 left-0 w-full absolute bg-[url('/src/assets/images/ic_rectangle_profile.png')] px-4 pt-4 z-10`}
    >
      <Header
        label='Tentang Aplikasi'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-primary-base'
        className='!bg-transparent !-z-40'
        circled
      />

      <div
        dangerouslySetInnerHTML={{ __html: aboutApp }}
        className='mt-20 mx-4'
      />
    </div>
  )
}
