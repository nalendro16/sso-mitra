import images from 'assets/images'

export const TABS_CONSULTING = [
  {
    title: 'Online',
    key: 'online',
    to: '/consulting/online',
  },
  {
    title: 'Terjadwal',
    key: 'scheduled',
    to: '/consulting/scheduled',
  },
  {
    title: 'Selesai',
    key: 'completed',
    to: '/consulting/completed',
  },
]

export const TABS_SCHEDULE = [
  {
    title: 'Jadwal Online',
    key: 'online-schedule',
    to: '/schedule/online-schedule',
  },
  {
    title: 'Pengaturan',
    key: 'set-schedule',
    to: '/schedule/set-schedule',
  },
]

export const MENU_BOTTOM = [
  {
    icon: images.ic_inactive_home,
    icon_active: images.ic_active_home,
    title: 'Home',
    to: '/home',
  },
  {
    icon: images.ic_inactive_order,
    icon_active: images.ic_active_order,
    title: 'Order',
    to: '/order',
    secondary_to: '/payment-waiting',
  },
  {
    icon: images.ic_inactive_paper,
    icon_active: images.ic_active_paper,
    title: 'Tansaksi',
    to: '/transaksi',
  },
  {
    icon: images.ic_inactive_profile,
    icon_active: images.ic_active_profile,
    title: 'Akun',
    to: '/profile',
  },
]

export const MENU_ITEM = [
  { icon: images.ic_home_request, title: 'Rekues Sedot', to: '/request-sedot' },
  { icon: images.ic_home_schedule, title: 'Sedot Rutin', to: '' },
  { icon: images.ic_home_tank, title: 'Tangki Saya', to: '' },
  { icon: images.ic_home_repair, title: 'Bangun dan Renovasi', to: '' },
  { icon: images.ic_home_calender, title: 'Kalender', to: '' },
]
