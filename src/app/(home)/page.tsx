'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ComboboxSearch from './combobox-search'
import PromotionSlide from './promotion-slide'
import ExploreTour from './explore-tour'
import LastDeal from './last-deal'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import ComboTour from './combo-tour'
import useFetchAllProduct from '@/queries/products/useFetchAllProducts'
import { TOUR_CATE } from '@/constants'
type HomePageProps = {}

const HomePage = (props: HomePageProps) => {
  const { data } = useFetchAllProduct()

  const filterCate = (cate: string) => {
    return data?.products?.filter((product) => product.category.includes(cate))
  }
  return (
    <div>
      <section>
        <div className={cn('relative h-[454px]')}>
          <Link href={'google.com'}>
            <Image
              layout='fill'
              objectFit='cover'
              alt='banner'
              src='https://media.travel.com.vn/SlideShow/sl_231109_KV%20CTKMXuan2024_TopBannerWeb%201920-570px.webp'
            />
          </Link>
        </div>
      </section>
      <section
        className={cn(
          'relative mt-[-227px] left-1/2 transform -translate-x-1/2  rounded-2xl mb-12  w-[90%] min-h-[310px] shadow-md'
        )}
      >
        <ComboboxSearch />
      </section>
      <section className={cn('w-[90%] mx-auto mb-12')}>
        <h4 className={cn('font-bold mb-[20px] text-3xl text-primary-color')}>
          Ưu đãi
        </h4>
        <PromotionSlide products={filterCate(TOUR_CATE.SALE) || []} />
      </section>
      <section className={cn('w-[90%] mx-auto mb-12')}>
        <h4 className={cn('font-bold mb-[20px] text-3xl text-primary-color')}>
          Khám phá các tour
        </h4>
        <ExploreTour products={filterCate(TOUR_CATE.EXPLORE) || []} />
      </section>
      <section className={cn('w-[90%] mx-auto mb-12')}>
        <h4 className={cn('font-bold mb-[20px] text-3xl text-primary-color')}>
          Tour mới
        </h4>
        <LastDeal products={filterCate(TOUR_CATE.NEWS) || []} />
        <div className={cn('mt-10 text-right')}>
          <Button
            className={cn(
              'bg-transparent text-primary-color border-[#ced4de] border hover:border-primary-color hover:bg-transparent text-lg'
            )}
          >
            Xem tất cả
            <FaArrowRightLong className={cn('ml-2')} size={20} />
          </Button>
        </div>
      </section>
      <section className={cn('w-[90%] mx-auto')}>
        <h4 className={cn('font-bold mb-[20px] text-3xl text-primary-color')}>
          Gói tour phổ biến
        </h4>
        <ComboTour products={filterCate(TOUR_CATE.POPULAR) || []} />
        <div className={cn('mt-10 text-right')}>
          <Button
            className={cn(
              'bg-transparent text-primary-color border-[#ced4de] border hover:border-primary-color hover:bg-transparent text-lg'
            )}
          >
            Xem tất cả
            <FaArrowRightLong className={cn('ml-2')} size={20} />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
