import { cn } from '@/lib/utils'
import React from 'react'
import { BsTicket } from 'react-icons/bs'
import { LuPlusCircle } from 'react-icons/lu'
import { IoHeartOutline } from 'react-icons/io5'
import { MdOutlinePriceCheck } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/types/Product'
import calculateDiscountedPrice from '@/helpers/discount'
import { DATE_FORMAT, PATH } from '@/constants'
import moment from 'moment'
import convertNumToVND from '@/helpers/convertNumToVND'
interface ICardVerticalProps {
  product: IProduct
}
const CardVertical: React.FC<ICardVerticalProps> = ({ product }) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden shadow-lg',
        'hover:mt-[2px] hover:shadow-2xl'
      )}
    >
      <div className={cn('h-[295px] relative')}>
        <div
          className={cn('absolute top-0 z-10 p-4 flex justify-between w-full')}
        >
          <div>
            <p className={cn('text-white bg-[rgba(0,0,0,.1)] rounded-md p-1')}>
              <IoHeartOutline size={30} />
            </p>
          </div>
          <div className={cn('flex flex-col items-end')}>
            <p
              className={cn(
                'bg-[#fdc432] font-bold w-fit py-[1px] px-[6px] text-white rounded-sm relative',
                'before:absolute before:bottom-[-4px] before:right-0 before:z-50 before:h-0 before:w-0  before:border-l-[6px] before:border-l-transparent before:border-t-[6px] before:border-t-[#fdc432]'
              )}
            >
              9.4
            </p>
            <div
              className={cn(
                'bg-[rgba(0,0,0,.2)] rounded-lg overflow-hidden px-2 py-4 mt-2 text-white'
              )}
            >
              <p className={cn('font-bold text-right')}>Tuyệt vời</p>
              <p className={cn('bg-[rgba(0,0,0,.4)] p-1 rounded-lg')}>
                989 quan tâm
              </p>
            </div>
          </div>
        </div>
        <Image
          src={product?.urls?.[0]?.url}
          alt='Image'
          layout='fill'
          objectFit='cover'
        />
        <div
          className={cn(
            'absolute bottom-0 left-0 bg-white text-hover-color flex px-3 py-2 items-center gap-1 text-sm'
          )}
        >
          <span>
            <MdOutlinePriceCheck />
          </span>
          <span>Giờ chót</span>
        </div>
      </div>
      <div className={cn('text-primary-color p-3')}>
        <p className={cn('text-xs mb-2')}>
          {moment(product?.startDate, DATE_FORMAT.dateDDMMYYYY).format(
            'DD/MM/YYYY'
          )}{' '}
          -{' '}
          {moment(product?.endDate, DATE_FORMAT.dateDDMMYYYY).diff(
            moment(product?.startDate, DATE_FORMAT.dateDDMMYYYY),
            'day'
          )}{' '}
          ngày
        </p>
        <Link
          href={`${PATH.TOUR}/${product?._id}`}
          className={cn('font-bold hover:text-hover-color')}
        >
          {product?.title}
        </Link>
        <div>
          <p className={cn('text-md mt-4')}>Mã tour:</p>
          <div className={cn('flex items-center gap-2')}>
            <span>
              <BsTicket />
            </span>
            <p>{product?._id}</p>
          </div>
          <p className={cn('mt-4')}>
            Nơi khởi hành: {product?.tripInfo?.startingGate?.name}
          </p>
        </div>
        <div className={cn('mt-4')}>
          <div className={cn('flex gap-1')}>
            <span>Giá:</span>
            <span
              className={cn(
                'relative',
                'before:absolute before:w-full before:h-[1px] before:top-1/2 before:bg-primary-color'
              )}
            >
              {convertNumToVND(product?.price?.audult)}
            </span>
          </div>
          <div className={cn('mt-2 flex justify-between items-center')}>
            <p className={cn('font-bold text-red-color text-lg ')}>
              {convertNumToVND(
                calculateDiscountedPrice(product?.price?.audult, product?.sale)
              )}
            </p>
            <div
              className={cn(
                'bg-red-color rounded-lg text-xs text-white px-1 py-2 font-bold'
              )}
            >
              {product?.sale.toString()}% giảm
            </div>
          </div>
          <div
            className={cn(
              'rounded-md border border-hover-color mt-4 px-2 py-3 text-xs font-semibold text-hover-color text-center'
            )}
          >
            Còn 00 ngày 03:35:49
          </div>
          <div className={cn('mt-4 flex justify-between  text-xs ')}>
            <div
              className={cn(
                'text-hover-color font-semibold flex items-center gap-1'
              )}
            >
              <span>
                <LuPlusCircle />
              </span>
              <span>Thêm vào so sánh</span>
            </div>
            <div className={cn('flex items-center')}>
              <span
                className={cn('text-primary-color font-bold underline mr-1')}
              >
                Số chỗ còn
              </span>
              <span className={cn('text-xl font-bold text-red-color mt-[3px]')}>
                {product?.numberOfSeatsLeft.toString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardVertical
