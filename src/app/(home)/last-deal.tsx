import { cn } from '@/lib/utils'
import React from 'react'
import CardVertical from '@/components/CardVertical/card-vertical'
import { IProduct } from '@/types/Product'
interface IProps {
  products: IProduct[]
}

export default function LastDeal({ products = [] }: IProps) {
  return (
    <div className={cn('grid grid-cols-3 gap-7')}>
      {products?.map((product) => (
        <CardVertical product={product} key={product._id} />
      ))}
    </div>
  )
}
