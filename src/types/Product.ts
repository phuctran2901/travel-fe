import { IRequestParams, SortEnum } from './Request'
import { StatusResponse, IResponse } from './Response'

export interface IProduct {
  _id: string
  title: string
  startDate: string
  endDate: string
  description: string
  category: string[]
  urls: Array<ProductImage>
  sale: number
  departurePoint: string
  review: Array<any>
  address: string
  numberOfSeatsLeft: number
  price: {
    audult: number
    child: number
    children: number
    infant: number
  }
  types: any
  averagedStars: number
  schedule: Array<Schedule>
  tripInfo: TripInfo
}

export interface TripInfo {
  departAt: string
  focusAt: string
  idealTime: string
  startingGate: {
    codename: string
    name: string
  }
  suitableObject: Array<string>
  cuisine: string
  modesOfTransportation: Array<string>
}

export interface ProductImage {
  _id: string
  url: string
}

export interface Schedule {
  location: Location
  date: string
  index: number
}

export interface Location {
  locationName: string
  image: string
  lat: string
  description: string
  address: string
}

export interface ProductsResponse extends IResponse {
  products: Array<IProduct>
}

export interface ProductDetailReponse {
  product: IProduct
  status: StatusResponse
}

export interface IProductRequest extends IRequestParams {
  duration: string
  types: string
  location: string
  sortField: string
  sortOrder: SortEnum
  startDate: string
  maxPrice: number
  minPrice: number
  isSale: boolean
}
