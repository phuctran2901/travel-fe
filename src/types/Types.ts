import { IResponse } from './Response'

export interface IType {
  name: string
  _id: string
}

export interface ITypeResponse extends IResponse {
  types: IType[]
}
