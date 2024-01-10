import api from '@/config/api'
import endpoints from '@/constants/endpoint'
import {
  IPlanScheduleRequest,
  IPlanScheduleResponse
} from '@/types/Plan-Schedule'
import { IRequestParams } from '@/types/Request'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

async function getPlanTour(
  params: Partial<IPlanScheduleRequest>
): Promise<IPlanScheduleResponse> {
  const { data }: AxiosResponse<IPlanScheduleResponse> = await api.get(
    endpoints.planTourEndpoint().getPlanTour(),
    { params }
  )
  return data
}

export const useFetchPlanTour = (params: Partial<IPlanScheduleRequest>) => {
  return useQuery<IPlanScheduleResponse>({
    queryKey: ['planSchedule', params],
    queryFn: () => getPlanTour(params)
  })
}
