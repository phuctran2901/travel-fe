import { cn } from '@/lib/utils'
import React from 'react'
import { Input, InputProps } from '../ui/input'
import { InputType } from '@/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import DatePicker from '../ui/date-picker'

interface Option {
  value: string
  label: string
}

interface IProps {
  className?: string
  icon?: React.ReactElement
  type: InputType
  label?: string
  placeholder?: string
  options?: Option[]
}
const FieldSearch: React.FC<IProps> = ({
  type = InputType.TEXT,
  icon,
  label,
  placeholder = 'Input here...',
  options = [],
  ...props
}) => {
  return (
    <div
      className={cn(
        'border-4 border-border-primary rounded-xl py-3 px-2 flex gap-2',
        props.className
      )}
    >
      <div className={cn('w-1/5  flex items-center justify-center')}>
        <span className={cn('w-6 h-6')}>{icon}</span>
      </div>
      <div className={cn('w-full')}>
        <label className='text-xs text-primary-color'>{label}</label>

        {type === InputType.TEXT && (
          <Input
            placeholder={placeholder}
            className={cn(
              'placeholder:font-bold outline-none w-full focus-visible:border-none border-none text-primary-color placeholder:text-primary-color p-0'
            )}
            focusDefault={false}
          />
        )}

        {type === InputType.SELECT && (
          <Select>
            <SelectTrigger
              focusDefault={false}
              className={cn('w-full border-none outline-none text-left p-0')}
            >
              <SelectValue
                placeholder={placeholder}
                className={cn('placeholder:font-bold font-bold')}
              />
            </SelectTrigger>
            <SelectContent>
              {options.map((option: Option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {type === InputType.DATE_PICKER && <DatePicker />}
      </div>
    </div>
  )
}

export default FieldSearch
