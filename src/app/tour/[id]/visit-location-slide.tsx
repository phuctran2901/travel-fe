'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Schedule } from '@/types/Product'

interface IProps {
  schedule: Array<Schedule>
}
const SLIDE_IMAGE = [
  'https://media.travel.com.vn/Advertisings/bn_230928_Dubai%20412x309px.webp',
  'https://media.travel.com.vn/Advertisings/bn_230927_BannerFrameThaiLan%20412x309.webp',
  'https://media.travel.com.vn/Advertisings/bn_231018_BannerWebHanQuoc%20412x309-01.webp',
  'https://media.travel.com.vn/Advertisings/bn_231019_BannerWeb_MienBac-04.webp',
  'https://media.travel.com.vn/Advertisings/bn_231101_DL%20AmThucMienTrung_1.webp',
  'https://media.travel.com.vn/Advertisings/bn_231101_DL%20AmThucMienTrung_1.webp',
  'https://media.travel.com.vn/Advertisings/bn_231101_DL%20AmThucMienTrung_1.webp',
  'https://media.travel.com.vn/Advertisings/bn_231101_DL%20AmThucMienTrung_1.webp',
  'https://media.travel.com.vn/Advertisings/bn_231101_DL%20AmThucMienTrung_1.webp'
]
export default function VisitLocationSlide({ schedule }: IProps) {
  const imgSlide = schedule?.map((s) => s.location.image)
  return (
    <Swiper
      spaceBetween={20}
      modules={[Pagination]}
      slidesPerView={5}
      pagination={{
        clickable: true,
        el: '.promotion-custom-pagination'
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {imgSlide.map((src: string) => (
        <SwiperSlide key={src}>
          <div className={cn('h-[200px] relative w-full')}>
            <Image
              className={cn('rounded-sm')}
              src={src}
              objectFit='containt'
              layout='fill'
              alt={src}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
