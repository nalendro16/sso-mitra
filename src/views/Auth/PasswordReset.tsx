import { Button, Header, Input } from 'components'
import { API } from 'config/api'
import { clientID, clientSecret } from 'config/app'
import { StorageKey } from 'config/storage'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'

export const PasswordReset: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const storage = new LocalStorage()
  let isHasGuestToken: any = storage.getItem(StorageKey.ACCESS_TOKEN)
  const [clientLogin, postClientLogin] = usePost()
  const [dataResetPassword, postResetPassword] = usePost({ isLoading: false })
  const [form, setForm] = useState({
    username: '',
  })
  const [error, setError] = useState({
    username: '',
  })

  useEffect(() => {
    const { data } = dataResetPassword
    if (data?.status === 'success') {
      openAlert({
        title: data?.messages,
        messages:
          'Silahkan periksa email/nomor handphone anda untuk melihat password sementara, lalu login dengan password sementara',
        showBtnClose: false,
        btnConfirmText: 'Oke',
        isConfirm: true,
        callback: (e: any) => {
          if (e.isConfirm) {
            navigate('/login')
          }
        },
      })
    } else if (data?.status === 'fail') {
      openAlert({
        showBtnClose: false,
        btnConfirmText: 'Oke',
        isConfirm: true,
        messages: data?.messages,
      })
    }
  }, [dataResetPassword])

  useEffect(() => {
    if (!isHasGuestToken) {
      postClientLogin.getRequest(API.OAUTH_LOGIN, {
        grant_type: 'client_credentials',
        client_id: clientID,
        client_secret: clientSecret,
        scope: 'apps',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHasGuestToken])

  useEffect(() => {
    if (!clientLogin.error) {
      if (clientLogin?.data?.status === 'fail') {
        openAlert({
          messages: clientLogin.data?.messages,
          showBtnClose: false,
          isConfirm: true,
        })
      } else if (clientLogin.data?.access_token) {
        storage.setItem(StorageKey.ACCESS_TOKEN, clientLogin.data)
      }
    } else {
      openAlert({
        messages: clientLogin.error,
        showBtnClose: false,
        isConfirm: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientLogin])

  const handleChangeForm = (e: any) => {
    setForm({
      ...form,
      [e.name]: e.value,
    })
    setError({ ...error, [e.name]: '' })
  }

  const validationForm = () => {
    const newError = { ...error }
    if (!form.username) {
      newError.username = 'Masukkan email / No.telephone sesuai format'
    }
    return newError
  }

  const onSubmit = () => {
    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      postResetPassword.getRequest(API.PASSWORD_RESET, form)
    }
    // setShowSetting(true)
    // navigate('/register')
  }

  return (
    <div
      className={`content-full px-[theme('content.padding.x')] pt-[theme('content.padding.y')]`}
    >
      <Header
        label='Reset Password'
        onBackClick={() => navigate(-1)}
        labelClassName='font-bold'
      />
      <div className='font-bold text-xl mb-3 mt-5 text-primary-darker'>
        {'Password Recovery'}
      </div>
      <div className='text-neutral-30 text-sm mb-7'>
        {
          'Masukkan email yang terdaftar pada akun Sajang untuk menerima instruksi kata sandi'
        }
      </div>

      <Input
        className='mb-7'
        name='username'
        label='Email/ No.Hp'
        placeholder='Ketikkan Email'
        value={form?.username}
        error={error?.username}
        onChange={handleChangeForm}
      />

      <Button
        className='btn-primary !w-full'
        label='Submit'
        onClick={onSubmit}
        isLoading={dataResetPassword.isLoading}
      />
    </div>
  )
}
