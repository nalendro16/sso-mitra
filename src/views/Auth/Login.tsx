/* eslint-disable react-hooks/exhaustive-deps */
import images from 'assets/images'
import React, { useEffect, useState } from 'react'
import { Button, Input } from 'components'
import { useNavigate } from 'react-router-dom'
import { useGet, usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import { clientID, clientSecret } from 'config/app'
import { InputPIN } from 'components/InputPin'
import { LocalStorage } from 'utils'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'

export const Login: React.FC = () => {
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [dataOauth, getDataOauth] = usePost({ isLoading: false })
  const [dataDetailLogin, getDetailLogin] = useGet({ isLoading: false })
  const [form, setForm] = useState({
    phone: '',
    password: '',
  })
  const [error, setError] = useState({
    phone: '',
    password: '',
  })

  useEffect(() => {
    if (!dataOauth.error) {
      if (dataOauth?.data?.status === 'fail') {
        openAlert({
          messages: dataOauth.data?.messages,
          showBtnClose: false,
          isConfirm: true,
        })
      } else if (dataOauth.data?.access_token) {
        storage.setItem(StorageKey.ACCESS_TOKEN, dataOauth.data)
        storage.setItem(StorageKey.IS_LOGIN, true)
        setTimeout(() => {
          getDetailLogin.getRequest(API.DETAIL_LOGIN)
        }, 300)
      }
    } else {
      openAlert({
        messages: dataOauth.error,
        showBtnClose: false,
        isConfirm: true,
      })
    }
  }, [dataOauth])

  useEffect(() => {
    const { data } = dataDetailLogin
    if (data?.status === 'success') {
      navigate('/home', { replace: true })
    }
  }, [dataDetailLogin])

  const handleChangeForm = (e: any) => {
    const { value, name } = e
    setForm({ ...form, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const validationForm = () => {
    const newError = { ...error }
    if (!form.password) newError.password = 'Masukkan password'
    if (!form.phone) newError.phone = 'Masukkan nomor telphone/email terdaftar'
    return newError
  }

  const onSubmit = () => {
    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      getDataOauth.getRequest(API.OAUTH_LOGIN, {
        grant_type: 'password',
        client_id: clientID,
        client_secret: clientSecret,
        scope: 'mitra-apps',
        username: form.phone,
        password: form.password,
      })
    }
  }

  const onForgot = () => {
    navigate('/password-reset')
  }

  return (
    <div className='content-full flex flex-col'>
      <div
        className={`bg-no-repeat bg-cover bg-center bg-neutral-10 max-h-52 z-20 h-2/3 pb-2 top-0 left-0 w-full bg-[url('/src/assets/images/ic_banner_order.png')] px-4`}
      >
        <img
          src={images.ic_unicef_blue}
          alt=''
          className='h-auto mt-10 mx-auto'
        />
      </div>

      <div className='bg-white rounded-t-3xl z-10 px-8 w-full max-w-content top-shadow'>
        <div className='font-bold text-2xl mb-4 mt-8 text-primary-darker'>{`Selamat Datang 👋`}</div>
        <div className='text-neutral-40 text-sm mb-8'>
          {'Masukkan nomor handphone kamu untuk melanjutkan'}
        </div>

        <Input
          className='mb-4'
          name='phone'
          error={error.phone}
          placeholder='08123849583'
          label='No. Handphone'
          value={form.phone}
          onChange={(e) => handleChangeForm(e)}
        />

        <InputPIN
          className='mb-4'
          name='password'
          label='Password'
          placeholder='Ketikkan Password'
          value={form.password}
          error={error.password}
          onChange={(e) => handleChangeForm(e)}
        />
        <div className='font-bold text-black-dark text-sm text-right pr-3 mb-4 mt-4'>
          <span onClick={onForgot}>{'Lupa Password'}</span>
        </div>

        <Button
          className='btn-primary !w-full mb-6'
          label='Masuk'
          onClick={onSubmit}
          isLoading={dataOauth.isLoading}
        />
      </div>
    </div>
  )
}
