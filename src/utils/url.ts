export const getQueryString = (history: any, key: string) => {
  const search = new URLSearchParams(history.location.search)
  return search.get(key) || ''
}
