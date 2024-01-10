const objToParams = (obj: Record<string, unknown>) => {
  let str = ''
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (str !== '') {
        str += '&'
      }
      str += `${encodeURIComponent(key)}=${encodeURIComponent(
        obj[key] as string
      )}`
    }
  }
  return str
}
export default objToParams
