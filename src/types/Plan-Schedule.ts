import { Schedule } from './Product'

export type IPlanScheduleResponse = Schedule[]

export interface IPlanScheduleRequest {
  tags: string
  suitableObject: string
  startDate: string
  endate: string
}
