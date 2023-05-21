import images from 'assets/images'

export const ORDER_LIST = [
  {
    date: '23 Juni 2023',
    product_name: 'Kaca Kamar mandi',
    product_image: 'https://picsum.photos/60/60/',
    price: 'RP. 18.000',
    total: 1,
    status: 'Menunggu Pembayaran',
    need_paid: true,
    can_review: false,
    already_review: false,
    address:
      'Jl. Gajah Mada No.18 Genteng, Banyuwangi Rumah warna putih minimalis',
    type: 'sedot',
  },
  {
    date: '23 Juni 2023',
    product_name: 'Rak Gantung',
    product_image: 'https://picsum.photos/60/60/',
    price: 'RP. 78.000',
    total: 3,
    status: 'Selesai',
    need_paid: false,
    can_review: true,
    already_review: false,
    type: 'product',
  },
  {
    date: '19 Juni 2023',
    product_name: 'Keran',
    product_image: 'https://picsum.photos/60/60/',
    price: 'RP. 45.000',
    total: 1,
    status: 'Selesai',
    need_paid: false,
    can_review: true,
    already_review: true,
    type: 'product',
  },
]

export const LAYANAN_SEDOT = [
  {
    icon: images.ic_layanan_kantor,
    text: 'Kantor',
  },
  {
    icon: images.ic_layanan_rumah,
    text: 'Rumah',
  },
  {
    icon: images.ic_layanan_rumah_makan,
    text: 'R. Makan',
  },
  {
    icon: images.ic_layanan_pabrik,
    text: 'Pabrik',
  },
]

export const MENU_PROFILE = [
  {
    label: 'Info Akun',
    icon: images.ic_profile_info,
    to: '',
  },
  {
    label: 'Chat',
    icon: images.ic_profile_chat,
    to: '',
  },
  {
    label: 'Ubah Password',
    icon: images.ic_profile_changepass,
    to: '',
  },
  {
    label: 'Tentang Aplikasi',
    icon: images.ic_profile_about,
    to: '',
  },
  {
    label: 'FAQs',
    icon: images.ic_profile_faq,
    to: '',
  },
  {
    label: 'Berikan Rating Applikasi',
    icon: images.ic_profile_rating,
    to: '',
  },
]

export const BANNER_HOME = [
  {
    banner: images.ic_banner_1,
  },
  {
    banner: images.ic_banner_2,
  },
  {
    banner: images.ic_banner_3,
  },
]

export const ACTIVITY_HOME = [
  {
    title: 'Sosialisasi Toilet Bersih',
    location: 'Kantor Desa Banjarwaru',
    date: '20 Maret 2023',
  },
  {
    title: 'Sensus penggunaan toilet',
    location: 'RT.3 RW.5, Kel. Pekunden, Semarang Tengah',
    date: '24 Juli 2023',
  },
  {
    title: 'Seminar Lingkungan Hidup',
    location: 'Kantor Desa Banjarwaru',
    date: '25 Juli 2023',
  },
]

export const PAYMENT_DATA = [
  {
    logo: images.ic_ovo,
    code: 'xendit_ovo',
    payment_gateway: 'Xendit',
    payment_method: 'Ovo',
    text: 'OVO',
    status: 1,
  },
  {
    logo: images.ic_bca,
    code: 'xendit_bca',
    payment_gateway: 'Xendit',
    payment_method: 'Bca',
    text: 'BCA',
    status: 1,
  },
  {
    logo: images.ic_gopay,
    code: 'Xendit_gopay',
    payment_gateway: 'Midtrans',
    payment_method: 'Gopay',
    text: 'GoPay',
    status: 1,
  },
]

export const ADDRESS_LIST = [
  {
    title: 'RUMAH',
    address: 'Jl. Mawar No.45 Tegal Timur',
    isActive: true,
    id: 1,
  },
  {
    title: 'Kantor',
    address: 'Jl. Cendrawasih No.45 Tegal Timur',
    isActive: false,
    id: 2,
  },
]

export const NEWORDER_LIST = [
  {
    title: 'RUMAH',
    address: 'Jl. Mawar No.45, Kejambon, Tegal Timur, Kota Tegal',
    isActive: true,
    id: 1,
  },
  {
    title: 'Pabrik',
    address: 'Jl. Mawar No.45, Kejambon, Tegal Timur, Kota Tegal',
    isActive: true,
    id: 0,
  },
  {
    title: 'Rumah',
    address: 'Jl. Mawar No.45, Kejambon, Tegal Timur, Kota Tegal',
    isActive: true,
    id: 0,
  },
  {
    title: 'Kantor',
    address: 'Jl. Cendrawasih No.45 Tegal Timur',
    isActive: false,
    id: 2,
  },
]

export const USER_REVIEW = [
  {
    name: 'Sarah Tesla',
    review_text: 'Tukang sedot berpengalaman, hasil pekerjaan bagus',
    emoji: images.ic_emoji,
    time: '1 menit yang lalu',
  },
  {
    name: 'Rahmat Adi',
    review_text:
      'Terimakasih tukang sedot berpengalaman, hasil pekerjaan bagus',
    emoji: '',
    time: 'Baru saja',
  },
]

export const PROGRESS_TRACK = [
  {
    title: 'Konfirmasi Pesanan',
    description: 'Melakukan konfirmasi pesanan yang masuk',
    status: 'done',
  },
  {
    title: 'Survey lokasi',
    description: 'Melakukan survei lokasi proyek',
    status: 'done',
  },
  {
    title: 'Verifikasi RAB',
    description: 'Menentukan dan verifikasi RAB project',
    status: 'progress',
  },
  {
    title: 'Order selesai',
    description: 'Ingatkan user untuk membagikan pengalaman mereka atas jasamu',
    status: 'undone',
  },
  {
    title: 'Order selesai',
    description: 'Ingatkan user untuk membagikan pengalaman mereka atas jasamu',
    status: 'undone',
  },
  {
    title: 'Order selesai',
    description: 'Ingatkan user untuk membagikan pengalaman mereka atas jasamu',
    status: 'undone',
  },
]
