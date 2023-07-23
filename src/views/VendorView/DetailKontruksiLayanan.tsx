import { Header } from 'components'
import { useNavigate } from 'react-router-dom'

export const DetailKontruksiLayanan: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header
        label='Detail Layanan Konstruksi'
        onBackClick={() => navigate(-1)}
        labelClassName='!font-bold text-white'
        className='bg-gradient-header'
        backWhite
      />
    </div>
  )
}
