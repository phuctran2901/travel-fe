import { IResponse } from './Response'

export interface CheckDiscountResponse extends IResponse {
  coupon: ICode
  messenger: string
}

export interface ICode {
  _id: string
  code: string
  type: string
  discount: number
  createdAt: string
  updatedAt: string
}
