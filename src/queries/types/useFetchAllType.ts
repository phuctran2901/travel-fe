import { AxiosResponse } from 'axios'
import endpoints from '@/constants/endpoint'
import api from '@/config/api'
import { useQuery } from '@tanstack/react-query'
import { IRequestParams } from '@/types/Request'
import { ITypeResponse } from '@/types/Types'

export async function getAllType(
  params?: Partial<IRequestParams>
): Promise<ITypeResponse> {
  const { data }: AxiosResponse<ITypeResponse> = await api.get(
    endpoints.tnEnpoint().allType(),
    { params }
  )
  return data
}

export default function useFetchAllType(params?: Partial<IRequestParams>) {
  return useQuery<ITypeResponse>({
    queryKey: ['allType', params],
    queryFn: () => getAllType(params)
  })
}
