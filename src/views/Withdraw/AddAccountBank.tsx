import { Capacitor } from '@capacitor/core'
import images from 'assets/images'
import { Button, Header, Input, InputSelect } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { useGet, usePost } from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddAccountBank: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [form, setForm] = useState({
    id_bank_name: '',
    beneficiary_account: '',
    beneficiary_name: '',
  })
  const [isVerified, setVerified] = useState(false)
  const [bankList, setBankList] = useState<any[]>()
  const [selectedBank, setSelectedBank] = useState<any>()
  const [dataBankList, getBankList] = useGet()
  const [accountCheck, postAccountCheck] = usePost({ isLoading: false })
  const [accountCreate, postAccountCreate] = usePost({ isLoading: false })

  useEffect(() => {
    getBankList.getRequest(API.MITRA_BANK_LIST)
  }, [])

  useEffect(() => {
    const { data } = dataBankList
    if (data?.status === 'success') {
      let tmp: any[] = []
      data?.result?.forEach((item: any) => {
        tmp.push({
          label: item.bank_name,
          value: item.id_bank_name,
        })
      })
      setBankList([...tmp])
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [dataBankList])

  useEffect(() => {
    const { data } = accountCheck
    if (data?.status === 'success') {
      setVerified(true)
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
      setVerified(false)
    }
  }, [accountCheck])

  useEffect(() => {
    const { data } = accountCreate
    if (data?.status === 'success') {
      navigate(-1)
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [accountCreate])

  const handleSelectBank = (e: any) => {
    setSelectedBank(e)
    setForm({ ...form, id_bank_name: e.value })
  }

  const onAccountCheck = () => {
    postAccountCheck.getRequest(API.MITRA_BANK_ACCOUNT_CHECK, form)
  }

  const onSubmit = () => {
    postAccountCreate.getRequest(API.MITRA_BANK_ACCOUNT_CREATE, form)
  }

  return (
    <div className='flex flex-col h-full'>
      <Header label='Tambah Rekening' onBackClick={() => navigate(-1)} />

      <div className='flex flex-col h-full bg-white px-4 py-6 -mx-4 -mt-4 -mb-[4rem]'>
        <InputSelect
          className='mt-5'
          label='Bank'
          placeholder='Pilih Bank'
          noOptionsMessage={() => 'Bank Tidak Ditemukan'}
          value={selectedBank}
          options={bankList}
          isSearchable
          onChange={handleSelectBank}
        />

        <Input
          className='my-6'
          name='beneficiary_name'
          label='Nama Pemilik Rekening'
          placeholder='A.n Pemilik'
          value={form?.beneficiary_name}
          onChange={(e) =>
            setForm({
              ...form,
              beneficiary_name: e.value,
            })
          }
        />

        <div className='font-semi-bold text-neutral-30 text-sm mb-2'>
          {'No. Rekening'}
        </div>
        <div className='flex items-center justify-between rounded-md border border-neutral-20 px-3 py-2.5'>
          <input
            className='appearance-none focus:outline-none w-full focus:border-active text-sm mr-3'
            type='number'
            placeholder='Ketikkan Nomor Rekening'
            value={form?.beneficiary_account}
            name='beneficiary_account'
            onChange={(e) =>
              setForm({
                ...form,
                beneficiary_account: e.target.value,
              })
            }
            autoComplete='off'
          />
          {/* <Button
            className='btn-primary btn-sm'
            label='Periksa'
            isLoading={accountCheck?.isLoading}
            onClick={onAccountCheck}
          /> */}
        </div>

        {/* {isVerified && (
          <div className='flex justify-between bg-primary-more-lightest rounded-md p-4 mt-10'>
            <p className='font-semi-bold pr-4'>{`A.n ${accountCheck?.data?.result?.beneficiary_name}`}</p>
            <img src={images.ic_checked_green} alt='' className='w-6 h-6' />
          </div>
        )} */}

        <div
          className={`fixed bottom-0 w-full bg-white p-4 -mx-4 top-shadow ${
            Capacitor.isNativePlatform()
              ? 'max-w-content-full'
              : 'max-w-content'
          }`}
        >
          <Button
            className='btn-primary !w-full'
            label='Simpan'
            // disabled={!isVerified}
            isLoading={accountCreate?.isLoading}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}
