import { AnimatedDiv, Button, Header, Modal } from 'components'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGet, usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import images from 'assets/images'
import { useGlobalContext } from 'hooks/context'

export const WithdrawChooseBank: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [showList, setShowList] = useState<boolean>(false)
  const [dataGetSummaryHome, getSummaryHome] = usePost({ isLoading: false })
  const [dataAccountLists, getAccountLists] = useGet({ isLoading: false })
  const [dataLatestBank, getLatestBank] = useGet({ isLoading: false })
  const [dataDeleteBank, postDeleteBank] = usePost({ isLoading: false })
  const [checkWithdraw, postCheckWithdraw] = usePost({ isLoading: false })
  const [dataWithdraw, postWithdraw] = usePost({ isLoading: false })
  const [dataSummary, setDataSummary] = useState<any>()
  const [listBank, setLisBank] = useState<Array<object>>([])
  const [selectedAccount, setSelectedAccount] = useState<any>()
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
  const [dataModalConfirm, setDataModalConfirm] = useState<any>(null)
  const [form, setForm] = useState({
    amount_withdrawal: '',
    id_bank_account: null,
  })

  useEffect(() => {
    initAPICall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { data } = dataDeleteBank
    if (data?.status === 'success') {
      initAPICall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDeleteBank])

  useEffect(() => {
    let currAccount: any = listBank?.find((item: any) => item.isActive)
    setSelectedAccount(currAccount)
    setForm({ ...form, id_bank_account: currAccount?.id_bank_account })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listBank])

  useEffect(() => {
    const { data } = dataAccountLists
    if (data?.status === 'success') {
      let tmp: any = []
      data?.result?.forEach((item: any) => {
        if (
          item.id_bank_account === dataLatestBank?.data?.result.id_bank_account
        ) {
          tmp.push({ ...item, isActive: true })
        } else {
          tmp.push({ ...item, isActive: false })
        }
      })
      setLisBank(tmp)
    }

    if (dataLatestBank?.data?.status === 'success') {
      setForm({
        ...form,
        id_bank_account: dataLatestBank?.data?.result.id_bank_account,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAccountLists, dataLatestBank])

  useEffect(() => {
    const { data } = dataGetSummaryHome
    if (data?.status === 'success') {
      setDataSummary(data?.result)
    } else if (data?.status === 'fail') {
      setDataSummary(null)
    }
  }, [dataGetSummaryHome])

  useEffect(() => {
    const { data } = checkWithdraw
    if (data?.status === 'success') {
      setOpenModalConfirm(true)
      setDataModalConfirm(data?.result)
    }
  }, [checkWithdraw])

  useEffect(() => {
    const { data } = dataWithdraw
    if (data?.status === 'success') {
      navigate('/withdraw-detail', { state: data?.result })
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages,
        isConfirm: true,
        showBtnClose: false,
        btnConfirmText: 'Tutup',
      })
    }
  }, [dataWithdraw])

  const initAPICall = () => {
    getSummaryHome.getRequest(API.SALDO_DETAIL)
    getAccountLists.getRequest(API.BANK_ACCOUNT_LISTED)
    getLatestBank.getRequest(API.MITRA_BANK_LATEST)
  }

  const handleSelectBank = (id: number) => {
    listBank?.map((item: any) => {
      if (item.id_bank_account === id) {
        return (item.isActive = true)
      } else {
        return (item.isActive = false)
      }
    })
    setLisBank([...listBank])
  }

  const handleDeleteBank = (id: number, bank_name: string) => {
    openAlert({
      messages: `Hapus data bank ${bank_name}?`,
      isConfirm: true,
      btnConfirmText: 'Ya',
      btnCloseText: 'Tidak',
      callback: (e: any) => {
        if (e.isConfirm) {
          postDeleteBank.getRequest(API.MITRA_BANK_DELETE, {
            id_bank_account: id,
          })
        }
      },
    })
  }

  const handleSubmit = () => {
    postCheckWithdraw.getRequest(API.SALDO_WITHDRAW_CHECK, {
      amount_withdrawal: form.amount_withdrawal,
      id_bank_account: form.id_bank_account,
    })
  }

  const onAcceptWithdraw = () => {
    postWithdraw.getRequest(API.SALDO_WITHDRAW, {
      amount_withdrawal: form.amount_withdrawal,
      id_bank_account: form.id_bank_account,
    })
  }

  return (
    <div className='mb-10'>
      <Header
        label='Pilih Transfer'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold !text-white'
        className='!bg-transparent !z-10'
        backWhite
      />

      <div className='bg-gradient-header h-52 -mt-[6rem] -mx-4 font-bold text-white pt-8 text-lg flex z-20'>
        <div className='px-4 rounded-t-lg mt-14'>
          <div className='text-sm'>Pendapatan Komisi</div>

          <div className='text-2xl'>{dataSummary?.current_balance_text}</div>
        </div>
      </div>

      <AnimatedDiv className='bg-white shadow-xl -mt-14 p-4 rounded-xl mx-4'>
        <div className='text-primary-darker font-bold'>Tujuan Pencairan</div>

        {dataAccountLists?.isLoading ? (
          <div>
            <Skeleton width={180} height={18} />

            <Skeleton width={220} height={18} />
          </div>
        ) : dataAccountLists?.data?.result.length === 0 ? (
          <div className='text-sm text-neutral-30'>
            Belum ada Bank aterdaftar{' '}
            <span
              className='text-primary-base'
              onClick={() => navigate('/add-bank-account')}
            >
              tambahkan sekarang
            </span>
          </div>
        ) : (
          <div className='flex items-center'>
            <div className='text-primary-base text-sm font-bold'>
              <div className='w-3/4'>
                {`${
                  selectedAccount?.bank_name ||
                  dataLatestBank?.data?.result?.bank_name
                } a/n ${
                  selectedAccount?.beneficiary_name ||
                  dataLatestBank?.data?.result?.beneficiary_name
                }`}
              </div>

              <div>
                {selectedAccount?.beneficiary_account ||
                  dataLatestBank?.data?.result?.beneficiary_account}
              </div>
            </div>

            <div
              className='bg-neutral-10 w-9 h-9 rounded-full'
              onClick={() => setShowList(!showList)}
            >
              <img
                src={images.ic_right_blue}
                alt=''
                className={`${showList ? 'rotate-90' : ''} p-0.5 m-2.5`}
              />
            </div>
          </div>
        )}
      </AnimatedDiv>

      {showList && (
        <div className='flex flex-col justify-between mt-6 mx-4'>
          {dataAccountLists?.isLoading
            ? Array.from([1, 2]).map((item: any) => {
                return (
                  <div
                    className='my-6 !h-fit flex-none outline-1 outline outline-neutral-10 rounded-lg px-4 py-3 shadow-md'
                    key={item}
                  >
                    <Skeleton width={250} height={20} className='my-2' />

                    <Skeleton width={200} height={30} />
                  </div>
                )
              })
            : listBank?.map((item: any, index: number) => (
                <div
                  className='text-primary-darker font-bold w-full mb-4 flex items-center justify-between gap-2'
                  key={index}
                  onClick={() => handleSelectBank(item.id_bank_account)}
                >
                  <div className=' bg-neutral-10 rounded-xl flex items-center justify-between gap-2 p-4 w-full'>
                    <img src={item.bank_image} alt='' className='w-10' />

                    <div className='text-sm w-full'>{item.bank_name}</div>

                    {item.isActive && (
                      <img src={images.ic_checked_blue} alt='' />
                    )}
                  </div>

                  <img
                    src={images.ic_trash_diagnostic}
                    alt=''
                    className='h-5'
                    onClick={() =>
                      handleDeleteBank(item.id_bank_account, item.bank_name)
                    }
                  />
                </div>
              ))}
        </div>
      )}

      <div
        className={`${
          showList ? '' : 'mt-6'
        } flex justify-between items-center  outline-primary-base rounded-lg outline-dashed px-4 mb-4 mx-5 py-3.5`}
        onClick={() => navigate('/add-bank-account')}
      >
        <div className='text-primary-base'>Tambah akun bank baru</div>
        <div className='bg-primary-base rounded-full p-2'>
          <img src={images.ic_plus_white} alt='' className='h-4' />
        </div>
      </div>

      <div className='fixed bottom-0 pb-4 w-full max-w-content mx-4 -ml-4 px-4 pt-6 top-shadow bg-white'>
        <div className='text-primary-darker font-bold mb-2'>
          Nominal Pencairan
        </div>
        <div className='flex items-center justify-between rounded-md border border-neutral-20 px-3 py-2.5 mb-4'>
          <input
            className='appearance-none focus:outline-none w-full focus:border-active text-sm mr-3'
            type='number'
            placeholder='Ketikkan Nominal Penarikan'
            value={form?.amount_withdrawal}
            name='amount_withdrawal'
            onChange={(e) =>
              setForm({
                ...form,
                amount_withdrawal: e.target.value,
              })
            }
            autoComplete='off'
          />
        </div>

        <Button
          onClick={handleSubmit}
          label={'Check Fee Transfer'}
          className='btn-primary w-full'
          disabled={checkWithdraw?.isLoading}
        />
      </div>

      <Modal
        show={openModalConfirm}
        onHide={() => {
          setOpenModalConfirm(false)
          setDataModalConfirm(null)
        }}
        showClassName='!opacity-10'
        contentClassName='animate-ease-body bg-white h-1/3 pt-4 px-4 bottom-0 fixed w-full max-w-content rounded-t-2xl'
      >
        <div className='mx-4 my-4'>
          <div className='flex justify-between items-center'>
            <div>Saldo Penarikan</div>
            <div>{dataModalConfirm?.ammount}</div>
          </div>

          <div className='flex justify-between items-center my-1'>
            <div>Biaya Penarikan</div>
            <div>{dataModalConfirm?.fee}</div>
          </div>

          <div className='flex justify-between items-center'>
            <div className='font-semi-bold text-primary-darker'>
              Total Penarikan
            </div>
            <div className='font-semi-bold text-primary-darker'>
              {dataModalConfirm?.total_withdrawal}
            </div>
          </div>
        </div>

        <div className='w-full bg-white px-8 pb-4 flex justify-between gap-4 bottom-0 fixed mx-4 -ml-4'>
          <Button
            className='btn-outline !border-primary-lighter w-full basis-1/2'
            onClick={() => {
              setOpenModalConfirm(false)
              setDataModalConfirm(null)
            }}
            // isLoading={isLoading}
            label='Batal'
          />
          <Button
            className='btn-primary w-full basis-1/2'
            onClick={onAcceptWithdraw}
            label='Lanjutkan'
            // isLoading={isLoading}
          />
        </div>
      </Modal>
    </div>
  )
}
