export const API = {
  SPLASH_SCREEN: '/api/home/splash',
  OAUTH_LOGIN: '/oauth/token',
  DETAIL_LOGIN: '/api/mitra/detail',

  SUMMARY_HOME: '/api/tukang-sedot/home/summary',
  NEW_ORDER: '/api/tukang-sedot/home/order-waiting',
  NEW_ORDER_DETAIL: '/api/tukang-sedot/home/order-waiting/',
  NEW_ORDER_CONFIRM: '/api/tukang-sedot/confirm',
  CONFIRMED_ORDER: '/api/tukang-sedot/home/order-confirmed',

  CALENDER_GET_DATES: '/api/tukang-sedot/kalender-sedot/',
  CALENDER_GET_DATE: '/api/tukang-sedot/kalender-sedot/jadwal-sedot/',

  CALENDER_GET_DATES_KONTRAKTOR: '/api/kontraktor/kalender-konstruksi?',
  CALENDER_GET_DATE_KONTRAKTOR: '/api/kontraktor/jadwal-konstruksi?',

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

  //endpoint kontraktor==================================================================
  NEW_ORDER_DETAIL_KONTRAKTOR: '/api/kontraktor/home/order-waiting/',
  CONFIRMED_ORDER_KONTRAKTOR: '/api/kontraktor/home/order-confirmed',
  NEW_ORDER_KONTRAKTOR: '/api/kontraktor/home/order-waiting',
  TRACKING_SEDOT_DETAIL_KONTRAKTOR: '/api/kontraktor/tracking/',
  SURVEY_RENOV: '/api/kontraktor/survey',
  RENOV_CONFIRM: '/api/kontraktor/confirm',

  RAB_LIST: '/api/kontraktor/rab/list',
  RAB_CREATE: '/api/kontraktor/rab/create',
  RAB_DELETE: '/api/kontraktor/rab/delete/',
  RAB_EDIT: '/api/kontraktor/rab/edit',

  CONFIRM_RAB: '/api/kontraktor/rab',
  RAB_DETAIL: '/api/kontraktor/rab/detail/',

  FAQ_LIST: '/api/setting/faq/mitra',
  PANDUAN_MITRA: '/api/setting/panduan/mitra',
}
