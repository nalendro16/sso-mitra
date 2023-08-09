import { Button, Header } from 'components'
import { InputPIN } from 'components/InputPin'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const PasswordUpdate: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [updatePasswordData, postUpdatePassword] = usePost({ isLoading: false })

  const [form, setForm] = useState({
    password_new_confirm: '',
    password_old: '',
    password_new: '',
  })
  const [error, setError] = useState({
    password_new_confirm: '',
    password_old: '',
    password_new: '',
  })

  useEffect(() => {
    const { data } = updatePasswordData
    if (data?.status === 'success') {
      setForm({
        password_new_confirm: '',
        password_old: '',
        password_new: '',
      })
      openAlert({
        messages: 'Berhasil update password',
        showBtnClose: false,
        isConfirm: true,
        callback: (e: any) => {
          if (e.isConfirm) {
            navigate(-1)
          }
        },
      })
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data.messages,
        showBtnClose: false,
        isConfirm: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePasswordData])

  const handleChangeForm = (e: { name: string; value: string }) => {
    const { value, name } = e
    setForm({ ...form, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const validationForm = () => {
    const newError = { ...error }
    if (!form.password_old) newError.password_old = 'Masukkan Pasword Lama anda'
    if (!form.password_new) newError.password_new = 'Masukkan password Baru'
    if (!form.password_new_confirm)
      newError.password_new_confirm = 'Masukkan kembali password baru'
    if (form.password_new !== form.password_new_confirm)
      newError.password_new_confirm =
        'Pastikan password sesuai dengan password baru'

    return newError
  }

  const onConfirm = () => {
    const findErrors = validationForm()
    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors)
    } else {
      postUpdatePassword.getRequest(API.PASSWORD_UPDATE, {
        password_old: form?.password_old,
        password_new: form?.password_new,
        password_confirmation: form?.password_new_confirm,
      })
    }
  }
  return (
    <div>
      <Header
        label='Update Password'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-primary-base'
        circled
      />

      <InputPIN
        className='my-4'
        name='password_old'
        label='Password saat ini'
        placeholder='Password saat ini'
        value={form.password_old}
        error={error.password_old}
        onChange={(e) => handleChangeForm(e)}
      />
      <InputPIN
        className='mb-4'
        name='password_new'
        label='Password Baru'
        placeholder='Password baru'
        value={form.password_new}
        error={error.password_new}
        onChange={(e) => handleChangeForm(e)}
      />
      <InputPIN
        className='mb-4'
        name='password_new_confirm'
        label='Ulangi Password Baru'
        placeholder='Ulangi password baru'
        value={form.password_new_confirm}
        error={error.password_new_confirm}
        onChange={(e) => handleChangeForm(e)}
      />

      <Button
        className='btn-primary !w-full mt-4'
        label='Ubah Password'
        onClick={onConfirm}
        isLoading={updatePasswordData?.isLoading}
      />
    </div>
  )
}
