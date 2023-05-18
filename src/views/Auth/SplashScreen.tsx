import React from 'react'
import { useNavigate } from 'react-router-dom'

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      className={`absolute bg-white bg-no-repeat bg-cover bg-center h-screen w-content bg-[url('/src/assets/images/bg_splash.png')]`}
      onClick={() => navigate('/login')}
    />
  )
}
