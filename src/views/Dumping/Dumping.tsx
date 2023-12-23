import images from 'assets/images'
import { ArmadaCard, Header, RefreshContent, Spinner } from 'components'
import { API } from 'config/api'
import { el } from 'date-fns/locale'
import { usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'

const FILTER_DUMPING = [
  { label: 'All', value: 'All' },
  { label: 'On Progress', value: 'Pending' },
  { label: 'Reject', value: 'Reject' },
  { label: 'Riwayat', value: 'Completed' },
]

export const Dumping: React.FC = () => {
  const navigate = useNavigate()
  const [dataListDumping, postListDumping] = usePost({ isLoading: false })
  const [dataHistoryDumping, postHistoryDumping] = usePost({ isLoading: false })
  const [listDumping, setListDumping] = useState<any>([])
  const [listHistoryDumping, setListHistoryDumping] = useState<any>([])
  const [dataHistoryDumpingSearch, postHistoryDumpingSearch] = usePost({
    isLoading: false,
  })
  const [listHistoryDumpingSearch, setListHistoryDumpingSearch] = useState<any>(
    []
  )
  const [search, setSearch] = useState<{
    status: string
    number_dumping_iplt: string
  }>({
    status: 'All',
    number_dumping_iplt: '',
  })
  const [listFilter, setListFilter] = useState<any>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isRefresh, setRefresh] = useState(false)

  useEffect(() => {
    let tmp: any = []
    FILTER_DUMPING?.forEach((item: any) =>
      tmp.push({ ...item, isActive: item.value === 'All' ? true : false })
    )
    setListFilter(tmp)
  }, [])

  useEffect(() => {
    const { data } = dataListDumping
    if (data?.status === 'success') {
      setListDumping(data?.result)
    } else if (data?.status === 'fail') {
      console.log('error', data?.messages)
    }
  }, [dataListDumping])

  useEffect(() => {
    let showedTime = setTimeout(() => {
      if (search?.number_dumping_iplt || search?.status !== 'All') {
        postHistoryDumpingSearch.getRequest(API.HISTORY_DUMPING, search)
        setPage(1)
        console.log('hit search')
      } else {
        console.log('hit biasa')
        postHistoryDumping.getRequest(API.HISTORY_DUMPING)
      }
    }, 1000)

    return () => {
      clearInterval(showedTime)
    }
  }, [search])

  useEffect(() => {
    const { data } = dataHistoryDumping
    if (data?.status === 'success') {
      if (data?.result?.next_page_url) {
        setHasMore(true)
        setPage(page + 1)
      } else {
        setHasMore(false)
      }
      setListHistoryDumping(
        isRefresh
          ? [...data?.result?.data]
          : listHistoryDumping?.concat(data?.result?.data)
      )
    } else if (data?.status === 'fail') {
      console.log('error', data?.messages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHistoryDumping])

  useEffect(() => {
    const { data } = dataHistoryDumpingSearch
    if (data?.status === 'success') {
      if (data?.result?.next_page_url) {
        setHasMore(true)
        setPage(page + 1)
      } else {
        setHasMore(false)
      }
      setListHistoryDumpingSearch(data?.result?.data)
    } else if (data?.status === 'fail') {
      console.log('error', data?.messages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHistoryDumpingSearch])

  useEffect(() => {
    const controller = new AbortController()
    postListDumping.getRequest(API.LIST_DUMPING, {
      search,
      pagination_total_row: 10,
      page: page,
    })
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickFilter = (val: string) => {
    listFilter?.forEach((item: any) => {
      if (item.value === val) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    setSearch({ ...search, status: val })
    setListFilter([...listFilter])
  }

  const onLoadMore = () => {
    postHistoryDumping.getRequest(API.HISTORY_DUMPING, search)
  }

  const onRefresh = () => {
    setRefresh(true)
    setPage(1)
    if (search?.number_dumping_iplt || search.status !== 'All') {
      postHistoryDumpingSearch.getRequest(API.HISTORY_DUMPING, search)
      setPage(1)
    } else {
      postHistoryDumping.getRequest(API.HISTORY_DUMPING, search)
    }
  }

  return (
    <div>
      <Header
        label='Dumping'
        onBackClick={() => navigate('/home')}
        labelClassName='!font-bold'
        className='!bg-primary-base text-white'
        backWhite
      />
      <div className='bg-primary-base px-4 -mt-8 py-4 -mx-4 h-16' />

      <div className='relative flex items-center rounded-xl bg-white text-neutral-20 text-sm py-3 my-5 mx-4 shadow-lg -bottom-2 -mt-10'>
        <img src={images.ic_search_gray} alt='' className='w-5 h-5 mx-4' />
        <input
          name='number_dumping_iplt'
          autoComplete='off'
          onChange={(e) =>
            setSearch({ ...search, number_dumping_iplt: e.target.value })
          }
          value={search?.number_dumping_iplt}
          className='border-none bg-transparent w-full focus:outline-none mr-4'
          placeholder='Pencarian berdasarkan IPLT'
        />
      </div>

      <div className='flex gap-2 my-4'>
        {listFilter?.map((item: any, index: number) => (
          <div
            key={index}
            className={`rounded-xl border px-2 py-0.5 text-sm border-neutral-10 shadow ${
              item.isActive ? 'bg-primary-base text-white' : ''
            }`}
            onClick={() => handleClickFilter(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className='-mx-4 scroll-x pb-8'>
        {listDumping?.map((item: any, index: number) => (
          <ArmadaCard
            key={index}
            isDumping
            hideBtn={false}
            simpleCard
            data={item}
            onClickDots={() => void 0}
            onDelete={() => void 0}
            onEdit={() => void 0}
            className='flex-none w-11/12 h-72'
            onClick={() => navigate(`/dumping-detail/${item.id_accommodation}`)}
            onDumpingClick={() =>
              navigate(`/dumping-detail/${item.id_accommodation}`)
            }
          />
        ))}
      </div>

      <div className=''>
        {(listHistoryDumping?.length !== 0 ||
          listHistoryDumpingSearch?.length !== 0) && (
          <div className='text-primary-darker text-sm font-semibold mt-3'>
            Riwayat
          </div>
        )}
        {search?.number_dumping_iplt || search.status !== 'All' ? (
          <InfiniteScroll
            className='!will-change-scroll px-4 pb-4'
            dataLength={listHistoryDumpingSearch?.length}
            loader={<Spinner className='mx-auto my-6' />}
            hasMore={hasMore}
            next={onLoadMore}
            refreshFunction={onRefresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={150}
            pullDownToRefreshContent={<RefreshContent type='pull' />}
          >
            {listHistoryDumpingSearch?.map((item: any, index: number) => (
              <ArmadaCard
                key={index}
                isDumping
                simpleCard
                data={item}
                onClickDots={() => void 0}
                onDelete={() => void 0}
                onEdit={() => void 0}
                onClick={() =>
                  navigate(`/dumping-detail-history/${item.id_iplt}`)
                }
                onDumpingClick={() => console.log('dumping now')}
              />
            ))}
          </InfiniteScroll>
        ) : (
          (search?.number_dumping_iplt || search.status === 'All') && (
            <InfiniteScroll
              className='!will-change-scroll px-4 pb-4'
              dataLength={listHistoryDumping?.length}
              loader={<Spinner className='mx-auto my-6' />}
              hasMore={hasMore}
              next={onLoadMore}
              refreshFunction={onRefresh}
              pullDownToRefresh
              pullDownToRefreshThreshold={150}
              pullDownToRefreshContent={<RefreshContent type='pull' />}
            >
              {listHistoryDumping?.map((item: any, index: number) => (
                <ArmadaCard
                  key={index}
                  isDumping
                  simpleCard
                  data={item}
                  onClickDots={() => void 0}
                  onDelete={() => void 0}
                  onEdit={() => void 0}
                  onClick={() =>
                    navigate(`/dumping-detail-history/${item.id_iplt}`)
                  }
                  onDumpingClick={() => console.log('dumping now')}
                />
              ))}
            </InfiniteScroll>
          )
        )}
      </div>
    </div>
  )
}
