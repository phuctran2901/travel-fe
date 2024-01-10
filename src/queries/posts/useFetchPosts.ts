import api from '@/config/api'
import endpoints from '@/constants/endpoint'
import { PostResponse } from '@/types/Post'
import { IRequestParams } from '@/types/Request'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

async function getPosts(
  params: Partial<IRequestParams>
): Promise<PostResponse> {
  const { data }: AxiosResponse<PostResponse> = await api.get(
    endpoints.postsEndpoint().posts(),
    { params }
  )
  return data
}

export const useFetchPosts = (params: Partial<IRequestParams>) => {
  return useQuery<PostResponse>({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params)
  })
}
