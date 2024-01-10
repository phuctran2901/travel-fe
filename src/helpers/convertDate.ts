import moment from 'moment'
const convertDate = (date: string) => {
  return moment(date).format('DD/MM/YYYY')
}

export default convertDate
