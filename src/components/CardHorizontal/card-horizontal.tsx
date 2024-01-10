import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { FaStar } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'
import { IProduct } from '@/types/Product'
import convertNumToVND from '@/helpers/convertNumToVND'
import convertDateDDMMYYYY from '@/helpers/convertDateDDMMYYYY'
interface ICardHorizontalProps {
  product: IProduct
}
const CardHorizontal: React.FC<ICardHorizontalProps> = ({ product }) => {
  return (
    <div
      className={cn(
        'flex gap-3 shadow-lg rounded-xl overflow-hidden hover:mt-[-2px] hover:shadow-xl'
      )}
    >
      <div className={cn('relative h-[290px] w-1/4')}>
        <Image
          alt='Image'
          layout='fill'
          objectFit='cover'
          src={product?.urls[0]?.url}
        />
      </div>
      <div className={cn('w-2/4 py-3')}>
        <Button className={cn('bg-primary-color hover:bg-primary-color')}>
          {product?.tripInfo?.modesOfTransportation?.join(', ')}
        </Button>
        <p
          className={cn(
            'text-primary-color hover:text-hover-color font-semibold mt-2'
          )}
        >
          {product?.title}
        </p>
        <p className={cn('flex text-[#fdc432] mt-2')}>
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
        </p>
        <p className={cn('text-muted text-sm mt-2')}>
          Vé máy bay khứ hồi Vietravel Airlines + Phòng Tiêu chuẩn + Ăn sáng
        </p>
        <div className={cn('flex gap-3 mt-4')}>
          <p
            className={cn(
              'bg-[#fdc432] font-bold w-fit px-3 py-2 text-white rounded-md relative',
              'before:absolute before:bottom-[-4px] before:right-0 before:z-50 before:h-0 before:w-0  before:border-l-[10px] before:border-l-transparent before:border-t-[10px] before:border-t-[#fdc432]'
            )}
          >
            10
          </p>
          <span className={cn('text-primary-color font-bold')}> Tuyệt vời</span>
        </div>

        <p
          className={cn(
            'flex gap-1 items-center text-xs text-hover-color mt-6'
          )}
        >
          <CiLocationOn size={20} />
          {product?.address}
        </p>
      </div>
      <div className={cn('w-1/4 flex flex-col justify-end items-end p-4')}>
        <p className={cn('text-primary-color font-bold')}>Giá chỉ từ</p>
        <p>
          <span className={cn('text-red-color font-bold text-lg')}>
            {convertNumToVND(product?.price?.audult || 0)}
          </span>
          /khách
        </p>
        <p className={cn('mt-2')}>
          Ngày đi {convertDateDDMMYYYY(product?.tripInfo?.departAt)}
        </p>
        <div className={cn('flex justify-between w-full mt-4')}>
          <Button
            size={'sm'}
            className={cn(
              'bg-transparent text-hover-color border border-hover-color hover:bg-hover-color hover:text-white'
            )}
          >
            Ngày khác
          </Button>
          <Button size={'sm'} className={cn('bg-red-color hover:bg-red-600')}>
            Đặt ngay
          </Button>
        </div>
        <p className={'text-hover-color mb-4 mt-4'}>Đã bao gồm trong giá</p>
      </div>
    </div>
  )
}
export default CardHorizontal
