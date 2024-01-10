import { AxiosResponse } from 'axios'
import { ProductsResponse } from '@/types/Product'
import endpoints from '@/constants/endpoint'
import api from '@/config/api'
import { useQuery } from '@tanstack/react-query'
import { IRequestParams } from '@/types/Request'

export async function getAllProduct(
  params?: Partial<IRequestParams>
): Promise<ProductsResponse> {
  const { data }: AxiosResponse<ProductsResponse> = await api.get(
    endpoints.productsEndpoint().allProducts(),
    { params }
  )
  return data
}

export default function useFetchAllProduct(params?: Partial<IRequestParams>) {
  return useQuery<ProductsResponse>({
    queryKey: ['allProducts', params],
    queryFn: () => getAllProduct(params)
  })
}
