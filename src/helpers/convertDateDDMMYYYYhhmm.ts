import { DATE_FORMAT } from '@/constants'
import moment from 'moment'

export const convertDateDDMMYYYYhhmm = (date: string) => {
  console.log(date)
  return moment(date, DATE_FORMAT.dateDDMMYYYYhhmm).format('DD/MM/YYYY hh:mm')
}
