import Image from 'next/image'
import React from 'react'
import logoPNG from '@/../public/logo.svg'
import { cn } from '@/lib/utils'
export default function Logo() {
  return (
    <div className={cn('flex items-center')}>
      <Image
        alt='Logo'
        src={logoPNG}
        className={cn('w-[200px] h-[100px] object-cover')}
      />
    </div>
  )
}
