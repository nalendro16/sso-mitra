import { Button, Header } from 'components'
import { useGet } from 'hooks/useRequest'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from 'config/api'
import images from 'assets/images'
import Skeleton from 'react-loading-skeleton'

export const FAQ: React.FC = () => {
  const navigate = useNavigate()
  const [dataFaq, setDataFaq] = useState<Array<object>>([])
  const [faqListData, getFaqList] = useGet({ isLoading: false })

  useEffect(() => {
    const { data } = faqListData
    let tmp: any = []
    if (data?.status === 'success') {
      data?.result?.forEach((item: any) =>
        tmp.push({ ...item, isActive: false })
      )
      setDataFaq([...tmp])
    }
  }, [faqListData])

  useEffect(() => {
    getFaqList.getRequest(API.FAQ_LIST)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickQuestion = (id: number) => {
    dataFaq?.map((item: any) => {
      if (item.id_faq_kontraktor === id) {
        item.isActive = !item.isActive
      }
      return setDataFaq([...dataFaq])
    })
  }

  return (
    <div>
      <Header
        label='FAQ'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-primary-base'
        circled
      />
      <div className='text-primary-darker font-semi-bold text-xl'>
        Kamu memiliki pertanyaan?
      </div>
      <div className='mt-4 mb-6'>
        Berikut merupakan beberapa pertanyaan yang sering diajukan
      </div>
      <div className='mb-12 mx-4'>
        {faqListData?.isLoading
          ? Array.from([1, 2]).map((item: any) => {
              return (
                <div
                  className='my-6 !h-fit flex-none rounded-lg px-4 py-3'
                  key={item}
                >
                  <Skeleton width={200} height={30} />
                  <Skeleton width={240} height={20} className='my-2' />
                </div>
              )
            })
          : dataFaq?.map((item: any) => (
              <div key={item.id_faq_kontraktor} className='mb-4'>
                <div
                  className='flex justify-between items-center'
                  onClick={() => handleClickQuestion(item.id_faq_kontraktor)}
                >
                  <div className='font-semi-bold text-primary-darker text-lg '>
                    {item.question}
                  </div>
                  <img src={images.ic_down} alt='' className='w-4 h-4' />
                </div>
                {item.isActive && (
                  <div className='mt-4 text-sm'>{item.answer}</div>
                )}
              </div>
            ))}
      </div>

      <Button
        className='btn-primary !w-full mt-4'
        label='Kontak kami'
        onClick={() => console.log('hubungi')}
      />
    </div>
  )
}
