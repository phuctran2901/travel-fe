import { cn } from '@/lib/utils'
import { IPost } from '@/types/Post'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface IProps {
  newPosts: IPost[]
}

export default function NewThread({ newPosts }: IProps) {
  console.log(newPosts)
  return (
    <div>
      <h2 className={cn('text-primary-color font-semibold text-lg mb-4')}>
        Tin tức du lịch
      </h2>
      <div className={cn('grid grid-cols-10 gap-6')}>
        <div className={cn('col-span-6 ')}>
          <div
            className={cn(
              'relative w-full h-[450px] rounded-xl overflow-hidden'
            )}
          >
            <Image layout='fill' src={newPosts?.[0]?.image} alt='new thread' />
          </div>
          <div className={cn('mt-4')}>
            <div className={cn('text-red-color font-semibold mb-2 ')}>
              Tin tức du lịch
            </div>
            <h3
              className={cn(
                'text-primary-color font-bold cursor-pointer mb-2 text-2xl',
                'hover:text-hover-color'
              )}
            >
              <Link href={`/post/${newPosts?.[0]?._id}` || ''}>
                {newPosts?.[0]?.title}
              </Link>
            </h3>
            <p className={cn('text-muted')}>
              {moment(newPosts?.[0]?.createdAt).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
        <div className={cn('col-span-4 flex flex-col gap-6')}>
          {[...new Array(3)].map((_, i) => (
            <div className={cn('flex gap-6 h-[calc(450px/3-16px)]')} key={i}>
              <div
                className={cn(
                  'h-full w-full relative flex-grow-0 flex-shrink-0 basis-[40%] rounded-xl overflow-hidden'
                )}
              >
                <Image
                  layout='fill'
                  src={
                    newPosts?.[i + 1]?.image ||
                    'https://media.vietravel.com/images/news/tam-onsen-nhat-ban-00.png'
                  }
                  alt='new thread'
                />
              </div>
              <div>
                <div className={cn('text-red-color font-semibold mb-2')}>
                  Tin tức dữ liệu
                </div>
                <h3
                  className={cn(
                    'text-primary-color font-bold cursor-pointer mb-2 text-base',
                    'hover:text-hover-color'
                  )}
                >
                  <Link href={`/blog/${newPosts?.[i + 1]?._id}` || ''}>
                    {newPosts?.[i + 1]?.title ||
                      'Du lịch Nhật Bản nhất định phải trải nghiệm tắm suối nước nóng'}
                  </Link>
                </h3>
                <p className={cn('text-sm text-muted')}>
                  {moment(newPosts?.[i + 1]?.createdAt).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
