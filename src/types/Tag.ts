import { IResponse } from './Response'

export interface ITag {
  name: string
  _id: string
}

export interface ITagResponse extends IResponse {
  tags: ITag[]
}
