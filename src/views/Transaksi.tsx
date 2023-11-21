import images from 'assets/images'
import {
  AnimatedDiv,
  HistoryTransactionCard,
  RefreshContent,
  Spinner,
} from 'components'
import { API } from 'config/api'
import { usePost } from 'hooks/useRequest'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

export const Transaksi: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [listOrder, setListOrder] = useState<any>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isRefresh, setRefresh] = useState(false)
  const navigate = useNavigate()
  const [dataHistoryOrder, postHistoryOrder] = usePost({ isLoading: false })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    postHistoryOrder.getRequest(API.TRANSACTION_HISTORY)
  }, [])

  useEffect(() => {
    const { data } = dataHistoryOrder
    if (data?.status === 'success') {
      if (data?.result?.next_page_url) {
        setHasMore(true)
        setPage(page + 1)
      } else {
        setHasMore(false)
      }
      setListOrder(
        isRefresh
          ? [...data?.result?.data]
          : listOrder?.concat(data?.result?.data)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHistoryOrder])

  const onRefresh = async () => {
    setRefresh(true)
    setPage(1)
    postHistoryOrder.getRequest(API.TRANSACTION_HISTORY, {
      pagination_total_row: 10,
      page: 1,
    })
  }

  const onLoadMore = () => {
    postHistoryOrder.getRequest(API.TRANSACTION_HISTORY, {
      pagination_total_row: 10,
      page: page,
    })
  }

  return (
    <div className='-mt-[4rem]'>
      <div className='bg-gradient-header h-40 -mt-[6rem] -mx-4 text-white pt-8 text-center text-xl'>
        <div className='font-bold'>Transaksi</div>
        <div className='relative flex items-center rounded-xl bg-white text-neutral-20 text-sm py-3 my-5 mx-4 shadow-lg -bottom-2'>
          <img src={images.ic_search_gray} alt='' className='w-5 h-5 mx-4' />
          <input
            name='search'
            autoComplete='off'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className='border-none bg-transparent w-full focus:outline-none mr-4'
            placeholder='Pencarian...'
          />
        </div>
      </div>
      <AnimatedDiv className='mt-4'>
        {dataHistoryOrder?.isLoading ? (
          Array.from([1, 2, 3, 4, 5]).map((item: any) => {
            return (
              <div
                className='my-6 !h-fit flex-none outline-1 outline outline-neutral-10 rounded-lg px-4 py-3 shadow-md'
                key={item}
              >
                <Skeleton width={80} height={20} />
                <Skeleton width={250} height={20} className='my-2' />
                <Skeleton width={200} height={30} />
              </div>
            )
          })
        ) : listOrder?.length !== 0 ? (
          <InfiniteScroll
            className='!will-change-scroll'
            dataLength={listOrder?.length}
            loader={<Spinner className='mx-auto my-6' />}
            hasMore={hasMore}
            next={() => onLoadMore()}
            refreshFunction={() => onRefresh()}
            pullDownToRefresh
            pullDownToRefreshThreshold={150}
            pullDownToRefreshContent={<RefreshContent type='pull' />}
            releaseToRefreshContent={<RefreshContent type='release' />}
          >
            {listOrder?.map((items: any, index: number) => (
              <HistoryTransactionCard
                data={items}
                key={index}
                onClick={() =>
                  navigate(
                    `/detail-transaction/${items.transaction_receipt_number}`
                  )
                }
              />
            ))}
          </InfiniteScroll>
        ) : (
          <div className='my-auto mx-4 mt-8 h-screen'>
            <img
              src={images.bg_no_product}
              alt=''
              className='mx-auto w-60 h-52'
            />
            <p className='text-sm font-semi-bold text-center text-primary-base mt-4'>
              Belum ada pesanan yang terselesaikan
            </p>
          </div>
        )}
      </AnimatedDiv>
    </div>
  )
}

export default Transaksi
