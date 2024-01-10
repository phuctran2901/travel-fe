import { DATE_FORMAT } from '@/constants'
import moment from 'moment'
const convertDateDDMMYYYY = (date: string) => {
  return moment(date, DATE_FORMAT.dateDDMMYYYY).format('DD/MM/YYYY')
}

export default convertDateDDMMYYYY
