import CardHorizontal from '@/components/CardHorizontal/card-horizontal'
import { cn } from '@/lib/utils'
import { IProduct } from '@/types/Product'
import React from 'react'
interface IProps {
  products: IProduct[]
}

export default function ComboTour({ products = [] }: IProps) {
  return (
    <div className={cn('flex flex-col gap-5')}>
      {products?.map((product) => (
        <CardHorizontal product={product} key={product._id} />
      ))}
    </div>
  )
}
