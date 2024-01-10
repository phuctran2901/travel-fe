import Image from 'next/image'
import React from 'react'
import go from '@/../public/go.webp'
import to from '@/../public/to.webp'
import bus from '@/../public/bus.webp'
import { cn } from '@/lib/utils'
interface Location {
  adress: string
  time: string
}
interface Props {
  dateLabel: string
  date: string
  locationFrom: Location
  locationTo: Location
}
export default function DetailTourInner() {
  return (
    <div>
      <p className={cn('text-primary-color my-4 text-sm')}>
        Ngày đi - <span className={cn('font-bold')}>25/11/2023</span>
      </p>
      <div
        className={cn(
          'flex justify-between items-center mb-4 text-hover-color text-center text-xs'
        )}
      >
        <div>
          <p className={cn('font-bold')}>TP. Hồ Chí Minh</p>
          <p>(Địa điểm)</p>
        </div>
        <div>
          <p className={cn('font-bold')}>TP. Hồ Chí Minh</p>
          <p>(Địa điểm)</p>
        </div>
      </div>
      <div>
        <div
          className={cn(
            'flex justify-between items-center relative',
            'before:absolute  before:top-0 before:border-t before:border-t-[#ced4de] before:border-dashed before:w-full'
          )}
        >
          <Image src={go} alt='go' />
          <Image src={bus} alt='bus' />
          <Image src={to} alt='to' />
        </div>
        <div
          className={cn(
            'flex justify-between items-center text-primary-color text-xs mt-4'
          )}
        >
          <span className={cn('font-bold')}>05:30</span>
          <span>Đi thẳng</span>
          <span className={cn('font-bold')}>12:00</span>
        </div>
      </div>
    </div>
  )
}
