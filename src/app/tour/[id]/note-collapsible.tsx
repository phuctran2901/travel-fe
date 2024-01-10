import React from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { IoIosArrowDown } from 'react-icons/io'
import { cn } from '@/lib/utils'
interface IProps {
  title: string
  description: string
}
export default function NoteCollapsible({ title, description }: IProps) {
  return (
    <div className={cn('h-fit ')}>
      <Collapsible className={cn('bg-[#f9f9f9] rounded-xl')}>
        <CollapsibleTrigger className={cn('p-4 flex justify-between w-full')}>
          <span className={cn('font-bold text-primary-color')}>{title}</span>
          <span>
            <IoIosArrowDown />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className={cn('p-4')}>
          {description}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
