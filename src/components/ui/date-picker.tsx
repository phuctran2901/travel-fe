'use client'

import * as React from 'react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
interface IProps {
  placeholder?: string
}
const DatePicker: React.FC<IProps> = ({ placeholder = 'Pick a date' }) => {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal border-none p-0 block w-full',
            !date && 'text-muted-foreground'
          )}
        >
          <div className={cn('text-primary-color font-bold')}>
            {date ? format(date, 'MM/dd/yyyy') : placeholder}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
