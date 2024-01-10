import { AxiosResponse } from 'axios'
import endpoints from '@/constants/endpoint'
import api from '@/config/api'
import { useQuery } from '@tanstack/react-query'
import { IRequestParams } from '@/types/Request'
import { ITagResponse } from '@/types/Tag'

export async function getAllTag(
  params?: Partial<IRequestParams>
): Promise<ITagResponse> {
  const { data }: AxiosResponse<ITagResponse> = await api.get(
    endpoints.tnEnpoint().allTag(),
    { params }
  )
  return data
}

export default function useFetchAllTag(params?: Partial<IRequestParams>) {
  return useQuery<ITagResponse>({
    queryKey: ['allTags', params],
    queryFn: () => getAllTag(params)
  })
}
