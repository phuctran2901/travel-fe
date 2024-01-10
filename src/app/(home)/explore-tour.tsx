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
interface IProps {
  products: IProduct[]
}

export default function ExploreTour({ products = [] }: IProps) {
  const slideImage = products?.map((product) => ({
    _id: product._id,
    url: product?.urls?.[0]?.url,
    title: product.title
  }))
  return (
    <div>
      <Swiper
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={5}
        pagination={{
          el: '.swiper-custom-pagination',
          clickable: true
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slideImage?.map((item) => (
          <SwiperSlide key={item.url}>
            <div className={cn('relative rounded-xl overflow-hidden')}>
              <Image
                className={cn('rounded-sm ')}
                width={412}
                height={309}
                style={{ height: 350 }}
                src={item.url}
                objectFit='cover'
                alt={item.title}
              />
              <p
                className={cn(
                  'text-white text-xl absolute bg-gradient-to-b from-transparent to-primary-color bottom-0 p-4 font-bold'
                )}
              >
                {item.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-custom-pagination mt-2 text-center gap-2' />
    </div>
  )
}
