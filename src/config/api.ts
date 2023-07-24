export const API = {
  SPLASH_SCREEN: '/api/home/splash',
  OAUTH_LOGIN: '/oauth/token',
  DETAIL_LOGIN: '/api/mitra/detail',

  SUMMARY_HOME: '/api/tukang-sedot/home/summary',
  NEW_ORDER: '/api/tukang-sedot/home/order-waiting',
  NEW_ORDER_DETAIL: '/api/tukang-sedot/home/order-waiting/',
  NEW_ORDER_CONFIRM: '/api/tukang-sedot/confirm',
  CONFIRMED_ORDER: '/api/tukang-sedot/home/order-confirmed/:',

  CALENDER_GET_DATES: '/api/tukang-sedot/kalender-sedot/',
  CALENDER_GET_DATE: '/api/tukang-sedot/kalender-sedot/jadwal-sedot/',

  TRACKING_SEDOT_DETAIL: '/api/tukang-sedot/tracking-sedot/',
  TRACKING_FINISH_SEDOT: '/api/tukang-sedot/finish-work',

  BANK_ACCOUNT_LISTED: '/api/mitra/bank-account/list',
  MITRA_BANK_LIST: '/api/mitra/bank/list',
  MITRA_BANK_ACCOUNT_CHECK: '',
  MITRA_BANK_ACCOUNT_CREATE: '/api/mitra/bank-account/create',
  MITRA_BANK_LATEST: '/api/mitra/bank-account/latest',
  MITRA_BANK_DELETE: '/api/mitra/bank-account/delete',

  SALDO_DETAIL: '/api/mitra/balance/detail',
  SALDO_WITHDRAW_CHECK: '/api/mitra/balance/withdrawal/fee',
  SALDO_WITHDRAW: '/api/mitra/balance/withdrawal',
}
