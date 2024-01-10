'use client'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { IProduct } from '@/types/Product'
import { useRouter } from 'next/navigation'
import { PATH } from '@/constants'

interface IProps {
  products: IProduct[]
}

export default function PromotionSlide({ products = [] }: IProps) {
  const router = useRouter()
  const slideImage: { _id: string; url: string }[] =
    products.map((product) => ({
      _id: product._id,
      url: product.urls[0].url
    })) || []

  return (
    <div>
      <Swiper
        spaceBetween={-60}
        modules={[Pagination]}
        slidesPerView={3}
        pagination={{
          clickable: true,
          el: '.promotion-custom-pagination'
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slideImage?.map((src) => (
          <SwiperSlide
            key={src._id}
            onClick={() => router.push(`${PATH.TOUR}/${src._id}`)}
          >
            <div className={cn('cursor-pointer')}>
              <Image
                className={cn('rounded-sm')}
                width={412}
                height={309}
                src={src.url}
                objectFit='cover'
                style={{ height: 309 }}
                alt={src.url}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='promotion-custom-pagination mt-2 text-center gap-2' />
    </div>
  )
}
