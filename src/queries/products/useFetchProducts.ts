import { AxiosResponse } from 'axios'
import { ProductsResponse } from '@/types/Product'
import endpoints from '@/constants/endpoint'
import api from '@/config/api'
import { useQuery } from '@tanstack/react-query'
import { IRequestParams } from '@/types/Request'

export async function getProducts(
  params?: Partial<IRequestParams>
): Promise<ProductsResponse> {
  const { data }: AxiosResponse<ProductsResponse> = await api.get(
    endpoints.productsEndpoint().products(),
    { params }
  )
  return data
}

export default function useFetchProducts(params?: Partial<IRequestParams>) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params)
  })
}
