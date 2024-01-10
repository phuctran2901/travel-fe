import endpoints from '@/constants/endpoint'
import api from '@/config/api'
import { AxiosResponse } from 'axios'
import { UseMutationOptions } from '@tanstack/react-query'
import { CheckDiscountResponse } from '@/types/Discount'
import { useMutation } from '@tanstack/react-query'
export const checkDiscount = async (
  body: any
): Promise<AxiosResponse<CheckDiscountResponse, any>> => {
  const data: AxiosResponse<CheckDiscountResponse, any> = await api.post(
    endpoints.discountsEndpoint().checkDiscount(),
    body
  )
  return data
}

// export const useCheckDiscount = (body: any) => {
//   const mutationOptions: UseMutationOptions<
//     AxiosResponse<CheckDiscountResponse, any>,
//     Error,
//     any,
//     any
//   > = {
//     // Bạn có thể tùy chỉnh các tùy chọn ở đây nếu cần
//   }

//   return useMutation(checkDiscount)
// }
