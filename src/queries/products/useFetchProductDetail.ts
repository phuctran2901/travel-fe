import { AxiosResponse } from 'axios'
import { ProductDetailReponse } from '@/types/Product'
import endpoints from '@/constants/endpoint'
import api from '@/config/api'
import { QueryOptions, useQuery } from '@tanstack/react-query'

export async function getProductDetail(
  id: string
): Promise<ProductDetailReponse> {
  const { data }: AxiosResponse<ProductDetailReponse> = await api.get(
    endpoints.productsEndpoint().productsById(id)
  )
  return data
}

export default function useFetchProductDetail(
  id: string,
  options?: QueryOptions
) {
  return useQuery<ProductDetailReponse>({
    queryKey: ['products', id],
    queryFn: () => getProductDetail(id),
    ...options
  })
}
