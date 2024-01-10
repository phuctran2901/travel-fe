import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'

export default function BlogLayout({
  children
}: {
  children: React.ReactElement
}) {
  return (
    <div>
      <section className={cn('w-[85%] m-auto')}>
        <h1
          className={cn(
            'mt-20 mb-10 uppercase text-center text-red-color font-semibold text-2xl'
          )}
        >
          Tin tức An Giang Travel
        </h1>
        <div
          className={cn(
            'flex justify-between items-center px-48 text-primary-color font-bold'
          )}
        >
          <div className={cn('hover:text-hover-color')}>
            <Link href={'/news-travel'}>Tin tức du lịch</Link>
          </div>
          <div className={cn('hover:text-hover-color')}>
            <Link href={'/tips-travel'}>Cẩm nang du lịch</Link>
          </div>
          <div className={cn('hover:text-hover-color')}>
            <Link href={''}>Kinh nghiệm du lịch</Link>
          </div>
        </div>
      </section>
      <section className={cn('w-[85%] m-auto mt-10')}>{children}</section>
    </div>
  )
}
