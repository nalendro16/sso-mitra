import { AnimatedDiv, Header, RefreshContent, Spinner } from 'components'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGet, usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import images from 'assets/images'
import InfiniteScroll from 'react-infinite-scroll-component'

export const HomeWithdraw: React.FC = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isRefresh, setRefresh] = useState(false)
  const [dataList, setDataList] = useState<any>([])
  const [dataGetSummaryHome, getSummaryHome] = usePost({ isLoading: false })
  const [dataLatestBank, getLatestBank] = useGet({ isLoading: false })
  const [dataSummary, setDataSummary] = useState<any>()

  useEffect(() => {
    getSummaryHome.getRequest(API.SALDO_DETAIL)
    getLatestBank.getRequest(API.MITRA_BANK_LATEST)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { data } = dataGetSummaryHome
    if (data?.status === 'success') {
      setDataSummary(data?.result)
      if (data?.result?.history?.next_page_url) {
        setHasMore(true)
        setPage(page + 1)
      } else {
        setHasMore(false)
      }
      setDataList(
        isRefresh
          ? [...data?.result?.history?.data]
          : dataList?.concat(data?.result?.history?.data)
      )
    } else if (data?.status === 'fail') {
      setDataSummary(null)
    }
  }, [dataGetSummaryHome])

  const onLoadMore = () => {
    getSummaryHome.getRequest(API.SALDO_DETAIL, {
      // history_date_end: format(dateRange[1], 'yyyy-MM-dd', { locale: id }),
      // history_date_start: format(dateRange[0], 'yyyy-MM-dd', { locale: id }),
      pagination_total_row: 10,
      page: page,
    })
  }

  const onRefresh = () => {
    setRefresh(true)
    setPage(1)
  }

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
        {dataLatestBank?.isLoading ? (
          <div>
            <Skeleton width={180} height={18} />
            <Skeleton width={220} height={18} />
          </div>
        ) : dataSummary?.history?.total === 0 ? (
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
            <div
              className='bg-neutral-10 w-9 h-9 rounded-full'
              onClick={() => navigate('/choose-bank-account')}
            >
              <img src={images.ic_right_blue} alt='' className='p-0.5 m-2.5' />
            </div>
          </div>
        )}
      </AnimatedDiv>

      <div className='flex justify-between mt-6'>
        <div className='text-primary-darker font-bold'>Riwayat Pencairan</div>
      </div>

      {dataList?.length !== 0 ? (
        <InfiniteScroll
          className='!will-change-scroll px-4 pb-4'
          dataLength={dataList?.length}
          loader={<Spinner className='mx-auto my-6' />}
          hasMore={hasMore}
          next={onLoadMore}
          refreshFunction={onRefresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={150}
          pullDownToRefreshContent={<RefreshContent type='pull' />}
        >
          {dataList?.map((item: any, index: number) => (
            <div
              key={index}
              className='bg-white border-t border-t-neutral-10 -mx-4 p-4 flex justify-between items-center'
            >
              <div className=''>
                <div className='font-semi-bold text-primary-darker'>
                  {item.title}
                </div>
                <div className='text-sm'>{item?.date}</div>
              </div>
              <div className='font-bold text-primary-darker text-lg mt-4'>
                {item?.nominal_text}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <div className='my-auto mx-4 mt-8'>
          <img
            src={images.bg_no_product}
            alt=''
            className='mx-auto w-20 h-16'
          />
          <p className='text-sm font-semi-bold text-center text-primary-base mt-4'>
            Belum ada riwayat transaksi
          </p>
        </div>
      )}
    </div>
  )
}
