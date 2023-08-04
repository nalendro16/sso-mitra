import images from 'assets/images'
import { Button, Header, Input, InputCurrency, Modal } from 'components'
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

  const [dataSubmitRAB, postSubmitRAB] = usePost({ isLoading: false })

  const [currentJasa, setCurrentJasa] = useState<any>()
  const [isModalJasa, setAddModalJasa] = useState<boolean>(false)

  const [formMaterial, setFormMaterial] = useState({
    id_transaction_renovasi: id_transaction,
    type: '', //Material or Jasa
    name_product: '',
    product_price: '',
    qty: '',
  })

  const [formJasa, setFormJasa] = useState({
    id_transaction_renovasi: id_transaction,
    type: '', //Material or Jasa
    name_product: '',
    product_price: '',
    qty: '',
  })

  useEffect(() => {
    postDataListAllRAB.getRequest(API.RAB_LIST, {
      id_transaction_renovasi: id_transaction,
    })
  }, [])

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
      })
      onResetForm()
      setAddModalMaterial(false)
      setAddModalJasa(false)
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
      })
      setModalEditMaterial(false)
      onResetForm()
      setAddModalMaterial(false)
      setAddModalJasa(false)
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

    setFormJasa({
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

  const onAddJasa = () => {
    postAddMaterial.getRequest(API.RAB_CREATE, {
      id_transaction_renovasi: formJasa?.id_transaction_renovasi,
      type: formJasa?.type, //Material or Jasa
      name_product: formJasa.name_product,
      product_price: formJasa?.product_price,
      qty: formJasa?.qty,
    })
  }

  const onDeleteMaterial = (id: number) => {
    postDeleteMaterial.getRequest(API.RAB_DELETE + id)
  }

  const handleEditJasa = (item: any) => {
    setFormJasa({
      ...formJasa,
      type: item?.type, //Material or Jasa
      name_product: item?.name_product,
      product_price: item?.product_price,
      qty: item?.qty,
    })
    setCurrentJasa(item)
    setModalEditMaterial(true)
    setAddModalJasa(true)
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

  const onEditJasa = () => {
    postEditMaterial.getRequest(API.RAB_EDIT, {
      transaction_renovasi_detail: currentJasa?.transaction_renovasi_detail,
      type: formJasa?.type, //Material or Jasa
      name_product: formJasa?.name_product,
      product_price: formJasa?.product_price,
      qty: formJasa?.qty,
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
        <div className='mb-4 font-semi-bold'>{'Material'}</div>
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
          className=' shadow-md outline-1 outline-dashed outline-primary-lightest text-center py-2 rounded-xl text-primary-lighter font-semi-bold flex justify-center gap-2 items-center mt-6'
          onClick={() => {
            setAddModalMaterial(true)
            setFormMaterial({ ...formMaterial, type: 'Material' })
          }}
        >
          <img src={images.ic_plus} alt='' className='h-6' />
          <div>Tambah</div>
        </div>
      </div>

      <div className='mt-4'>
        <div className='mb-4 font-semi-bold'>{'Jasa'}</div>
        {dataRAB?.jasa.map((item: any, index: number) => (
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
                  onClick={() => handleEditJasa(item)}
                />
              </div>
            </div>
            <div className='bg-neutral-10 p-2 mt-2 rounded-lg text-sm px-4'>
              Rp.{item?.product_price}
            </div>
          </div>
        ))}

        <div
          className='shadow-md outline-1 outline-dashed outline-primary-lightest text-center py-2 rounded-xl text-primary-lighter font-semi-bold flex justify-center gap-2 items-center mt-6'
          onClick={() => {
            setAddModalJasa(true)
            setFormJasa({ ...formJasa, type: 'Jasa' })
          }}
        >
          <img src={images.ic_plus} alt='' className='h-6' />
          <div>Tambah</div>
        </div>
      </div>

      <div className='w-full -ml-4 fixed bottom-0 max-w-content p-4 pt-6 rounded-t-xl top-shadow'>
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
            disabled={dataSubmitRAB?.isLoading}
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
            placeholder='Nama material'
            label='Nama material'
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

      <Modal
        show={isModalJasa}
        onHide={() => {
          setAddModalJasa(false)
          onResetForm()
        }}
        dialogClassName='px-8'
      >
        <div className='p-4 bg-white h-1/3 rounded-lg'>
          <Input
            placeholder='Nama Jasa'
            label='Nama jasa'
            name='name_product'
            value={formJasa.name_product}
            onChange={(e) =>
              setFormJasa({
                ...formJasa,
                name_product: e.value,
              })
            }
          />
          <div className='text-sm mt-4 mb-2'>Harga Jasa</div>
          <input
            className='appearance-none focus:outline-none w-full rounded-md bg-neutral-10 focus:border-active p-3'
            type='number'
            placeholder='Harga keseluruhan jasa*'
            value={formJasa?.product_price}
            name='product_price'
            onChange={(e) =>
              setFormJasa({
                ...formJasa,
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
            value={formJasa?.qty}
            name='qty'
            onChange={(e) =>
              setFormJasa({
                ...formJasa,
                qty: e.target.value,
              })
            }
            autoComplete='off'
          />
          <Button
            onClick={() => (isModalEditMaterial ? onEditJasa() : onAddJasa())}
            className='btn-primary w-full mt-4'
            label={`${isModalEditMaterial ? 'Ubah' : 'Tambah'}`}
          />
        </div>
      </Modal>
    </div>
  )
}
