import endpoints from '@/constants/endpoint'
import api from '@/config/api'
import { AxiosResponse } from 'axios'
import { PostDetailResponse } from '@/types/Post'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
type QueryOptions = UseQueryOptions<
  PostDetailResponse,
  Error,
  PostDetailResponse,
  ['post', string]
>
const getDetailPost = async (id: string): Promise<PostDetailResponse> => {
  const { data }: AxiosResponse<PostDetailResponse> = await api.get(
    endpoints.postsEndpoint().postById(id)
  )
  return data
}

export const useFetchDetailPost = (
  id: string,
  options: Partial<QueryOptions>
) => {
  return useQuery<PostDetailResponse>({
    queryKey: ['post', id],
    queryFn: () => getDetailPost(id),
    ...options
  })
}
