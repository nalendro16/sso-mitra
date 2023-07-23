import { AnimatedDiv, Header } from 'components'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGet } from 'hooks/useRequest'
import { API } from 'config/api'
import images from 'assets/images'

export const HomeWithdraw: React.FC = () => {
  const navigate = useNavigate()
  const [dataGetSummaryHome, getSummaryHome] = useGet({ isLoading: false })
  const [dataAccountLists, getAccountLists] = useGet({ isLoading: false })
  const [dataLatestBank, getLatestBank] = useGet({ isLoading: false })
  const [dataSummary, setDataSummary] = useState<any>()

  useEffect(() => {
    getSummaryHome.getRequest(API.SUMMARY_HOME)
    getAccountLists.getRequest(API.BANK_ACCOUNT_LISTED)
    getLatestBank.getRequest(API.MITRA_BANK_LATEST)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { data } = dataGetSummaryHome
    if (data?.status === 'success') {
      setDataSummary(data?.result)
    } else if (data?.status === 'fail') {
      setDataSummary(null)
    }
  }, [dataGetSummaryHome])
  return (
    <div className='mb-4'>
      <Header
        label='Pencairan'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold !text-white'
        className='!bg-transparent !z-40'
        backWhite
      />
      <div className='bg-gradient-header h-52 -mt-[6rem] -mx-4 font-bold text-white pt-8 text-lg flex'>
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
                {`${dataLatestBank?.data?.result?.bank_name} a/n ${dataLatestBank?.data?.result?.beneficiary_name}`}
              </div>
              <div>{dataLatestBank?.data?.result?.beneficiary_account}</div>
            </div>
            <div className='bg-neutral-10 w-9 h-9 rounded-full'>
              <img src={images.ic_right_blue} alt='' className='p-0.5 m-2.5' />
            </div>
          </div>
        )}
      </AnimatedDiv>

      <div className='flex justify-between mt-6'>
        <div className='text-primary-darker font-bold'>Riwayat Pencairan</div>
      </div>

      <div className='-mx-4 scroll-x pb-8'>
        {/* {USER_REVIEW?.map((item: any, index: number) => (
      <div
        className='shadow-xl my-6 !w-4/5 !h-fit flex-none px-4 rounded-lg py-4'
        key={index}
      >
        <div className='flex justify-between items-center'>
          <div className='text-primary-darker font-bold text-sm'>
            {item.name}
          </div>
          <div className='text-xs text-neutral-20'>{item.time}</div>
        </div>
        <div className='justify-between flex items-center'>
          <div className='line-clamp-2 mt-2'>{item.review_text}</div>
          <img src={item.emoji} alt='' className='h-6' />
        </div>
      </div>
    ))} */}
      </div>
    </div>
  )
}
