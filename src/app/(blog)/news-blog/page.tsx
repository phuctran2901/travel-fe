'use client'
import React from 'react'
import NewThread from './new-thread'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { useFetchPosts } from '@/queries/posts/useFetchPosts'
import { TYPE_POST } from '@/constants'
import moment from 'moment'

export default function NewsBlogPage() {
  const { data } = useFetchPosts({})
  const newPosts = data?.Posts?.filter((post) => post.types === TYPE_POST.NEWS)
  const tipPosts = data?.Posts?.filter((post) => post.types === TYPE_POST.TIPS)
  const experiencePosts = data?.Posts?.filter(
    (post) => post.types === TYPE_POST.EXPERIENCE
  )

  return (
    <div>
      <NewThread newPosts={newPosts || []} />
      <section className={cn('mt-8')}>
        <div className={cn('flex justify-between items-center mb-4')}>
          <h2 className={cn('text-primary-color font-semibold text-lg mb-4')}>
            Cẩm nang du lịch
          </h2>
          <Link className={cn('text-hover-color font-bold')} href={''}>
            Xem tất cả
          </Link>
        </div>
        <div className={cn('grid grid-cols-3 gap-4')}>
          {[...new Array(3)].map((_, idx) => (
            <div
              className={cn('relative pt-[79%] rounded-xl overflow-hidden')}
              key={tipPosts?.[idx]?._id}
            >
              <Image
                className=' top-1/2 left-1/2 transform transition-all duration-200 ease-in border-radius-10'
                layout='fill'
                src={tipPosts?.[idx]?.image || ''}
                alt={tipPosts?.[idx]?.title || ''}
              />
              <div
                className={cn(
                  'absolute bottom-0 p-5 text-white bg-gradient-to-t from-[rgba(19,19,19,0.8)] to-[rgba(179,171,171,0)] via-[rgba(48,48,48,0.71]'
                )}
              >
                <p className={cn('text-2xl font-bold mb-4')}>
                  {tipPosts?.[idx]?.title}
                </p>
                <p>{moment(tipPosts?.[idx]?.createdAt).format('DD/MM/YYYY')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={cn('mt-10')}>
        <div className={cn('flex justify-between items-center mb-4')}>
          <h2 className={cn('text-primary-color font-semibold text-lg mb-4')}>
            Kinh nghiệm du lịch
          </h2>
          <Link className={cn('text-hover-color font-bold')} href={''}>
            Xem tất cả
          </Link>
        </div>
        <div className={cn('grid grid-cols-3 gap-4')}>
          {[...new Array(3)]?.map((_, idx) => (
            <div key={experiencePosts?.[idx]?._id}>
              <div
                className={cn('relative pt-[58%] rounded-xl overflow-hidden')}
              >
                <Image
                  className=' top-1/2 left-1/2 transform transition-all duration-200 ease-in border-radius-10'
                  layout='fill'
                  objectFit='cover'
                  src={experiencePosts?.[idx]?.image || ''}
                  alt={experiencePosts?.[idx]?.title || ''}
                />
              </div>
              <div>
                <div
                  className={cn(
                    'text-red-color font-semibold mb-2 text-lg mt-6'
                  )}
                >
                  Tin tức dữ liệu
                </div>
                <h3
                  className={cn(
                    'text-primary-color font-bold cursor-pointer mb-2 text-2xl mt-4',
                    'hover:text-hover-color'
                  )}
                >
                  {experiencePosts?.[idx]?.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
