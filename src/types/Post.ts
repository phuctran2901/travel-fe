import { IResponse } from './Response'
import { IUser } from './User'

export interface PostResponse extends IResponse {
  Posts: IPost[]
}

export interface IPost {
  _id: string
  types: string
  title: string
  tags: string
  content: string
  image: string
  author: IUser
  createdAt: string
  updatedAt: string
}

export interface PostDetailResponse extends IResponse {
  post: IPost
}
