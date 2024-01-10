const convertNumToVND = (num: number) => {
  return num?.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND'
  })
}
export default convertNumToVND
