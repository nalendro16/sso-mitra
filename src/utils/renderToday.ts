export const renderToday = (itemDate: string) => {
  let day = new Date(),
    weekday = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dayOfWeek = weekday[day.getDay()],
    date = day.getDate().toString(),
    month = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    dayOfMonth = month[day.getMonth()],
    year = day.getFullYear().toString()
  let today = `${dayOfWeek}, ${date} ${dayOfMonth} ${year}`
  let noDay = `${date} ${dayOfMonth} ${year}`

  if (today === itemDate) {
    return true
  } else if (noDay === itemDate) {
    return true
  }
}
