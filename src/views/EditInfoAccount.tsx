import { Button, Header, Input } from 'components'
import { API } from 'config/api'
import { useGlobalContext } from 'hooks/context'
import { useGet, usePost } from 'hooks/useRequest'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const EditInfoAccount: React.FC = () => {
  const navigate = useNavigate()
  const { openAlert } = useGlobalContext()
  const [provinceList, setProvinceList] = useState<any[]>()
  const [selectedProvince, setSelectedProvince] = useState<any>()
  const [dataProvinceList, getProvince] = useGet()

  const [cityList, setCityList] = useState<any[]>()
  const [selectedCity, setSelectedCity] = useState<any>()
  const [dataCityList, getCity] = usePost()

  const [districtList, setDistrictList] = useState<any[]>()
  const [selectedDistrict, setSelectedDistrict] = useState<any>()
  const [dataDistrictList, getDistrict] = usePost()

  const [subdistrictList, setSubdistrictList] = useState<any[]>()
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<any>()
  const [dataSubdistrictList, getSubdistrict] = usePost()

  const [dataEditAccount, postEditAccount] = usePost({ isLoading: false })
  const [dataDetailAccount, getDetailAccount] = useGet({ isLoading: false })

  const [form, setForm] = useState<any>({
    email: '',
    name: '',
    id_province: '',
    id_city: '',
    id_district: '',
    address: '',
    id_subdistrict: '',
    longitude: '',
    latitude: '',
  })

  useEffect(() => {
    getDetailAccount?.getRequest(API.PROFILE)
    getProvince.getRequest(API.PROVINCE_LIST)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { data } = dataEditAccount
    if (data?.status === 'success') {
      openAlert({ messages: 'Perubahan berhasil disimpan' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEditAccount])

  useEffect(() => {
    const { data } = dataProvinceList
    if (data?.status === 'success') {
      let tmp: any[] = []
      data?.result?.forEach((item: any) => {
        tmp.push({
          label: item.province_name,
          value: item.id_province,
        })
      })
      setProvinceList([...tmp])
    } else if (data?.status === 'fail') {
      console.log(data?.messages)
    }
  }, [dataProvinceList])

  useEffect(() => {
    const { data } = dataCityList
    if (data?.status === 'success') {
      let tmp: any[] = []
      data?.result?.forEach((item: any) => {
        tmp.push({
          label: item.city_name,
          value: item.id_city,
          city_postal_code: item.city_postal_code,
        })
      })
      setCityList([...tmp])
    } else if (data?.status === 'fail') {
      console.log(data?.messages)
    }
  }, [dataCityList])

  useEffect(() => {
    const { data } = dataDistrictList
    if (data?.status === 'success') {
      let tmp: any[] = []
      data?.result?.forEach((item: any) => {
        tmp.push({
          label: item.district_name,
          value: item.id_district,
        })
      })
      setDistrictList([...tmp])
    } else if (data?.status === 'fail') {
      console.log(data?.messages)
    }
  }, [dataDistrictList])

  useEffect(() => {
    const { data } = dataSubdistrictList
    if (data?.status === 'success') {
      let tmp: any[] = []
      data?.result?.forEach((item: any) => {
        tmp.push({
          label: item.subdistrict_name,
          value: item.id_subdistrict,
        })
      })
      setSubdistrictList([...tmp])
    } else if (data?.status === 'fail') {
      console.log(data?.messages)
    }
  }, [dataSubdistrictList])

  useEffect(() => {
    const idProvince = form?.id_province
    if (idProvince) {
      getCity.getRequest(API.CITY_LIST, {
        id_province: idProvince,
      })
      const searchProvince = provinceList?.find(
        (item) => item?.value === idProvince
      )
      setSelectedProvince(searchProvince)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceList, form])

  useEffect(() => {
    const idCity = form?.id_city
    if (idCity) {
      getDistrict.getRequest(API.DISTRICT_LIST, { id_city: idCity })
      const searchCity = cityList?.find((item) => item?.value === idCity)
      setSelectedCity(searchCity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityList, form])

  useEffect(() => {
    const idCity = form?.id_district
    if (idCity) {
      getSubdistrict.getRequest(API.SUBDISTRICT_LIST, { id_district: idCity })
      const searchCity = districtList?.find((item) => item?.value === idCity)
      setSelectedDistrict(searchCity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtList, form])

  useEffect(() => {
    const idCity = form?.id_subdistrict
    if (idCity) {
      const searchCity = subdistrictList?.find((item) => item?.value === idCity)
      setSelectedSubdistrict(searchCity)
    }
  }, [subdistrictList, form])

  useEffect(() => {
    const { data } = dataDetailAccount
    if (data?.status === 'success') {
      setForm({
        email: data?.result?.email,
        name: data?.result?.name,
        id_province: data?.result?.id_province,
        id_city: data?.result?.id_city,
        id_district: data?.result?.id_district,
        id_subdistrict: data?.result?.id_subdistrict,
        longitude: data?.result?.longitude,
        latitude: data?.result?.latitude,
        address: data?.result?.address,
      })
    } else if (data?.status === 'fail') {
    }
  }, [dataDetailAccount])

  const handleChangeForm = (e: any) => {
    const { value, name } = e
    setForm({ ...form, [name]: value })
  }

  const handleSubmitEdit = () => {
    postEditAccount.getRequest(API.EDIT_ACCOUNT, form)
  }

  const handleSelectProvince = (e: any) => {
    setSelectedProvince(e)
    setSelectedCity(null)
    setSelectedDistrict(null)
    setSelectedSubdistrict(null)
    setForm({
      ...form,
      id_province: e.value,
      id_city: null,
    })

    getCity.getRequest(API.CITY_LIST, { id_province: e.value })
  }

  const handleSelectCity = (e: any) => {
    setSelectedCity(e)
    setSelectedDistrict(null)
    setSelectedSubdistrict(null)
    setForm({
      ...form,
      id_city: e.value,
      id_district: null,
      id_subdistrict: null,
    })
  }

  const handleSelectDistrict = (e: any) => {
    setSelectedDistrict(e)
    setSelectedSubdistrict(null)
    setForm({
      ...form,
      id_district: e.value,
      id_subdistrict: null,
    })

    getSubdistrict.getRequest(API.SUBDISTRICT_LIST, { id_district: e.value })
  }

  const handleSelectSubdistrict = (e: any) => {
    setSelectedSubdistrict(e)
    setForm({
      ...form,
      id_subdistrict: e.value,
    })
  }

  return (
    <div className='mb-10'>
      <Header label='Edit Akun' onBackClick={() => navigate(-1)} />

      <div className='text-primary-darker font-semi-bold'>Informasi Kontak</div>
      <div className='my-4'>
        <Input
          onChange={handleChangeForm}
          name='email'
          value={form.email}
          label='Email'
          isDisabled
          placeholder='Vendor Sedot WC'
          className='mb-2'
          labelClassName='text-primary-darker'
        />
        <Input
          onChange={handleChangeForm}
          name='name'
          value={form.name}
          label='Nama'
          placeholder='Nama perusahaan anda'
          className='mb-4'
          labelClassName='text-primary-darker'
        />
      </div>

      <Input
        onChange={handleChangeForm}
        name='address'
        value={form.address}
        label='Lokasi Alamat'
        isDisabled
        placeholder='Vendor Sedot WC'
        className='mb-2'
        labelClassName='text-primary-darker'
      />

      <Button
        onClick={handleSubmitEdit}
        label='Simpan'
        isLoading={dataEditAccount.isLoading}
        className='btn-primary w-full'
      />
    </div>
  )
}
