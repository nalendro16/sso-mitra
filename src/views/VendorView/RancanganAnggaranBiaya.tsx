import images from 'assets/images'
import { Button, Header, Input, InputSelect, Modal } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useGet, usePost } from 'hooks/useRequest'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'

export const RancanganAnggaranBiaya: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const { id_transaction, id } = useParams() as any
  const [dataRAB, setDataRAB] = useState<any>()
  const [dataListAllRAB, postDataListAllRAB] = usePost({ isLoading: false })

  const [currentMaterial, setCurrentMaterial] = useState<any>()
  const [isModalEditMaterial, setModalEditMaterial] = useState<boolean>(false)
  const [isModalMaterial, setAddModalMaterial] = useState<boolean>(false)
  const [dataAddMaterial, postAddMaterial] = usePost({ isLoading: false })
  const [dataDeleteMaterial, postDeleteMaterial] = useGet({ isLoading: false })
  const [dataEditMaterial, postEditMaterial] = usePost({ isLoading: false })
  const [standard_septic_tank, setStandard_septic_tank] = useState<string>('')
  const [selectedStandardSepticTank, setSelectedSepticTank] = useState<{
    label: string
    value: number | null
  }>()

  const [dataStandarOption, postDataStandarOption] = usePost({
    isLoading: false,
  })
  const [dataStandarOptionDetail, postDataStandarOptionDetail] = usePost({
    isLoading: false,
  })
  const [optionStandar, setOptionStandar] = useState([])
  const [detailStandar, setDetailStandar] = useState<any>([])

  const [dataSubmitRAB, postSubmitRAB] = usePost({ isLoading: false })

  const [formMaterial, setFormMaterial] = useState({
    id_transaction_renovasi: id_transaction,
    type: '', //Material or Jasa
    name_product: '',
    product_price: '',
    qty: '',
  })

  useEffect(() => {
    postDataListAllRAB.getRequest(API.RAB_LIST, {
      id_transaction_renovasi: id_transaction,
      id_paket: selectedStandardSepticTank?.value,
    })
    postDataStandarOption.getRequest(API.RAB_PAKET, {
      id_transaction_renovasi: id_transaction,
    })
  }, [])

  useEffect(() => {
    const { data } = dataStandarOption
    if (data?.status === 'success') {
      let tmp: any = []
      data?.result?.forEach((item: any) => {
        tmp.push({
          label: `${item.name_paket} - ${item.price_paket}`,
          value: item.id_paket,
        })
      })
      setOptionStandar(tmp)
    }
  }, [dataStandarOption])

  useEffect(() => {
    const { data } = dataStandarOptionDetail
    if (data?.status === 'success') {
      setDetailStandar(data.result)
      postDataListAllRAB.getRequest(API.RAB_LIST, {
        id_transaction_renovasi: id_transaction,
        id_paket: selectedStandardSepticTank?.value,
      })
    } else if (data?.status === 'fail') {
      setDetailStandar([])
      openAlert({ messages: data?.messages })
    }
  }, [dataStandarOptionDetail])

  useEffect(() => {
    const { data } = dataSubmitRAB
    if (data?.status === 'success') {
      navigate(`/detail-kontruksi/${data?.result?.id_transaction}`)
    } else if (data?.status === 'fail') {
      openAlert({ messages: data?.messages })
    }
  }, [dataSubmitRAB])

  useEffect(() => {
    const { data } = dataListAllRAB
    if (data?.status === 'success') {
      setDataRAB(data?.result)
    }
  }, [dataListAllRAB])

  useEffect(() => {
    const { data } = dataAddMaterial
    if (data?.status === 'success') {
      postDataListAllRAB.getRequest(API.RAB_LIST, {
        id_transaction_renovasi: id_transaction,
        id_paket: selectedStandardSepticTank?.value,
      })
      onResetForm()
      setAddModalMaterial(false)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages || 'terjadi kesalahan saat input material',
      })
    }
  }, [dataAddMaterial])

  useEffect(() => {
    const { data } = dataDeleteMaterial
    if (data?.status === 'success') {
      postDataListAllRAB.getRequest(API.RAB_LIST, {
        id_transaction_renovasi: id_transaction,
        id_paket: selectedStandardSepticTank?.value,
      })
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages || 'terjadi kesalahan saat input material',
      })
    }
  }, [dataDeleteMaterial])

  useEffect(() => {
    const { data } = dataEditMaterial
    if (data?.status === 'success') {
      postDataListAllRAB.getRequest(API.RAB_LIST, {
        id_transaction_renovasi: id_transaction,
        id_paket: selectedStandardSepticTank?.value,
      })
      setModalEditMaterial(false)
      onResetForm()
      setAddModalMaterial(false)
    } else if (data?.status === 'fail') {
      openAlert({
        messages: data?.messages || 'terjadi kesalahan saat input material',
      })
    }
  }, [dataEditMaterial])

  const handleChangeForm = (e: any) => {
    const { value, name } = e
    setFormMaterial({ ...formMaterial, [name]: value })
  }

  const onResetForm = () => {
    setFormMaterial({
      id_transaction_renovasi: id_transaction,
      type: '', //Material or Jasa
      name_product: '',
      product_price: '',
      qty: '',
    })
  }

  const onAddMaterial = () => {
    postAddMaterial.getRequest(API.RAB_CREATE, {
      id_transaction_renovasi: formMaterial?.id_transaction_renovasi,
      type: formMaterial?.type, //Material or Jasa
      name_product: formMaterial.name_product,
      product_price: formMaterial?.product_price,
      qty: formMaterial?.qty,
    })
  }

  const onDeleteMaterial = (id: number) => {
    postDeleteMaterial.getRequest(API.RAB_DELETE + id)
  }

  const handleEditMaterial = (item: any) => {
    setFormMaterial({
      ...formMaterial,
      type: item?.type, //Material or Jasa
      name_product: item?.name_product,
      product_price: item?.product_price,
      qty: item?.qty,
    })
    setCurrentMaterial(item)
    setModalEditMaterial(true)
    setAddModalMaterial(true)
  }

  const onEditMaterial = () => {
    postEditMaterial.getRequest(API.RAB_EDIT, {
      transaction_renovasi_detail: currentMaterial?.transaction_renovasi_detail,
      type: formMaterial?.type, //Material or Jasa
      name_product: formMaterial?.name_product,
      product_price: formMaterial?.product_price,
      qty: formMaterial?.qty,
    })
  }

  return (
    <div>
      <Header
        label='Rancangan Anggaran Biaya'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />

      <div>
        <InputSelect
          className='mb-8'
          label='Paket Pembangunan'
          classNameLabel='mb-2 !font-semi-bold !text-secondary'
          placeholder='Pilih Paket Pembangunan'
          noOptionsMessage={() => 'Tidak dapat menunjukan data'}
          value={selectedStandardSepticTank}
          options={optionStandar}
          isSearchable
          onChange={(e) => {
            setSelectedSepticTank(e)
            setStandard_septic_tank(e.value)
            postDataStandarOptionDetail.getRequest(API.RAB_PAKET_DETAIL, {
              id_paket: e.value,
            })
          }}
        />

        <div className=' font-semi-bold'>{'Tambahan Biaya'}</div>
        {dataRAB?.material.map((item: any, index: number) => (
          <div className='w-full' key={index}>
            <div className='justify-between items-end flex w-full'>
              <div className='text-sm mt-4'>{item?.name_product}</div>
              <div className='flex items-center gap-4'>
                <div
                  className='text-xs flex items-center text-error gap-1'
                  onClick={() =>
                    onDeleteMaterial(item.transaction_renovasi_detail)
                  }
                >
                  <div>Delete</div>
                  <img src={images.ic_delete} alt='' className='h-5' />
                </div>
                <img
                  src={images.ic_edit_rab}
                  alt=''
                  onClick={() => handleEditMaterial(item)}
                />
              </div>
            </div>
            <div className='bg-neutral-10 p-2 mt-2 rounded-lg text-sm px-4'>
              Rp.{item?.product_price}
            </div>
          </div>
        ))}

        <div
          className=' shadow-md outline-1 outline-dashed outline-primary-lightest text-center py-2 rounded-xl text-primary-lighter font-semi-bold flex justify-center gap-2 items-center mt-4'
          onClick={() => {
            setAddModalMaterial(true)
            setFormMaterial({ ...formMaterial, type: 'Material' })
          }}
        >
          <img src={images.ic_plus} alt='' className='h-6' />
          <div>Tambah</div>
        </div>
      </div>

      {detailStandar?.length !== 0 ? (
        <div className='mt-6'>
          <div>Paket ini berisi</div>
          {detailStandar?.map((item: any, index: number) => (
            <div
              key={index}
              className='border border-neutral-20 rounded-lg p-2'
            >
              <div className='flex justify-between'>
                <div>{item.spesifikasi_paket}</div>
                <div>{item.jumlah}</div>
                <div>{item.satuan}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      <div className='w-full -ml-4 fixed bottom-0 max-w-content p-4 pt-6 rounded-t-xl top-shadow bg-white'>
        <div className='mb-4 text-sm'>
          Baca mengenai layanan Bangun dan Renovasi sebelum melanjutkan.
          <span className='font-semi-bold text-primary-base'>
            {` Ketentuan layanan`}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <div className='text-sm'>Total biaya</div>
            <div className='font-semi-bold text-primary-base'>
              {dataRAB?.total}
            </div>
          </div>
          <Button
            disabled={
              dataSubmitRAB?.isLoading || !selectedStandardSepticTank?.value
            }
            onClick={() =>
              openAlert({
                title: 'Apakah anda yakin ingin melanjutkan?',
                isConfirm: true,
                btnConfirmText: 'Ya',
                btnCloseText: 'Tidak',
                callback: (e: any) => {
                  if (e.isConfirm) {
                    postSubmitRAB.getRequest(API.CONFIRM_RAB, {
                      id_transaction: id,
                      id_paket: standard_septic_tank,
                    })
                  }
                },
              })
            }
            label='Selanjutnya'
            className='btn-primary'
          />
        </div>
      </div>

      <Modal
        show={isModalMaterial}
        onHide={() => {
          setAddModalMaterial(false)
          onResetForm()
          setModalEditMaterial(false)
        }}
        dialogClassName='px-8'
      >
        <div className='p-4 bg-white h-1/3 rounded-lg'>
          <Input
            placeholder='Peruntukan Biaya'
            label='Peruntukan Biaya'
            name='name_product'
            value={formMaterial.name_product}
            onChange={handleChangeForm}
          />
          <div className='text-sm mt-4 mb-2'>Harga Produk</div>
          <input
            className='appearance-none focus:outline-none w-full rounded-md bg-neutral-10 focus:border-active p-3'
            type='number'
            placeholder='Harga keseluruhan material'
            value={formMaterial?.product_price}
            name='product_price'
            onChange={(e) =>
              setFormMaterial({
                ...formMaterial,
                product_price: e.target.value,
              })
            }
            autoComplete='off'
          />
          <div className='text-sm mt-4 mb-2'>Jumlah</div>
          <input
            className='appearance-none focus:outline-none w-full rounded-md bg-neutral-10 focus:border-active p-3'
            type='number'
            placeholder='Jumlah keseluruhan material'
            value={formMaterial?.qty}
            name='qty'
            onChange={(e) =>
              setFormMaterial({
                ...formMaterial,
                qty: e.target.value,
              })
            }
            autoComplete='off'
          />
          <Button
            onClick={() =>
              isModalEditMaterial ? onEditMaterial() : onAddMaterial()
            }
            className='btn-primary w-full mt-4'
            label={`${isModalEditMaterial ? 'Ubah' : 'Tambah'}`}
          />
        </div>
      </Modal>
    </div>
  )
}
