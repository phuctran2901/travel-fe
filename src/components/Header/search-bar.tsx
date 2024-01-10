import React from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

export default function SearchBar() {
  return (
    <div className={cn('border-2 border-border-primary rounded-md p-1')}>
      <Input
        className={cn(
          'outline-none focus-visible:border-none border-none text-primary-color placeholder:text-primary-color'
        )}
        focusDefault={false}
        placeholder='Bắt đầu tìm kiếm...'
      />
    </div>
  )
}
