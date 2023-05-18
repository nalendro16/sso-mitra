export const numberSeparator = (
  number: number | null,
  symbol?: string,
  separator = '.'
) => {
  if (number === 0) return `${symbol || ''} 0`
  if (!number) return

  let str = number.toString()
  let str_split = str.split('.')

  let str_1 = str_split[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  if (str_split[1]) {
    return `${symbol || ''} ${str_1},${str_split[1].substring(0, 2)}`
  }

  return `${symbol || ''} ${str_1}`
}
