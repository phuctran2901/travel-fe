export type StatusResponse = {
  SUCCESS: 'success'
  ERROR: 'error'
}

export interface IResponse {
  totalPage: number
  status: StatusResponse
  result: number
}
