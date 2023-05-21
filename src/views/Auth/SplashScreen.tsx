/* eslint-disable react-hooks/exhaustive-deps */
import { API } from 'config/api'
import { useGet } from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate()
  const [dataSplash, getSplash] = useGet()
  const [currWidth, setCUrrwidth] = useState<number>(425)
  const [splashImg, setSplashImg] = useState<string>()

  useEffect(() => {
    getSplash.getRequest(API.SPLASH_SCREEN)
    setCUrrwidth(window.innerWidth)
  }, [])

  useEffect(() => {
    const { data } = dataSplash
    if (data?.status === 'success') {
      setSplashImg(data?.result.splash_screen_url)
      setTimeout(() => {
        // if (installed) { //use this when intro screen ready
        //   navigate(`/login`, { replace: true })
        // } else {
        navigate(`/login`)
        // }
      }, Number(data?.result?.splash_screen_duration) * 1000)
    }
  }, [dataSplash])

  return (
    <div
      // className={`absolute bg-white bg-no-repeat bg-cover bg-center h-screen w-[425px] bg-[url('/src/assets/images/bg_splash.png')]`}
      // onClick={() => navigate('/login')}
      className='bg-splashscreen'
      style={{ backgroundImage: `url(${splashImg})`, width: `${currWidth}px` }}
    />
  )
}
