import { cn } from '@/lib/utils'
import React from 'react'
import { FaRegUser } from 'react-icons/fa'

export default function UserInfo() {
  return (
    <span className={cn('text-2xl text-primary-color')}>
      <FaRegUser />
    </span>
  )
}
