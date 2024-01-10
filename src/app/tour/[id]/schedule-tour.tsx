import convertDate from '@/helpers/convertDate'
import convertDateDDMMYYYY from '@/helpers/convertDateDDMMYYYY'
import { cn } from '@/lib/utils'
import { Schedule } from '@/types/Product'
import React from 'react'
export interface Props {
  schedule: Array<Schedule>
}
const GoTour = ({ schedule }: Props) => {
  return (
    <div>
      {schedule.map((s, index) => {
        return (
          <div
            key={s?.index?.toString()}
            className={cn(
              'flex items-center gap-3 text-sm relative py-8 text-primary-color',
              'before:absolute before:border-l-[0.5px] before:border-dashed before:left-[59px] before:z-0 before:border-red-color before:h-full'
            )}
          >
            <p>Ngày</p>
            <p
              className={cn(
                'w-10 h-6 rounded-full bg-red-color  flex items-center justify-center text-white font-semibold z-10'
              )}
            >
              {(index + 1)?.toString()}
            </p>
            <div className={cn('font-bold')}>
              <p className={cn('text-xs mb-2')}>{convertDate(s?.date)}</p>
              <p>{s?.location?.locationName}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const TimeLineTour = ({ schedule }: Props) => {
  return (
    <div>
      {schedule?.map((s, i) => {
        return <TimeLineItem key={s?.index?.toString()} item={s} index={i} />
      })}
    </div>
  )
}

const TimeLineItem = ({ item, index }: { item: Schedule; index: number }) => {
  return (
    <div className={cn('mb-4')}>
      <h3 className={cn('text-primary-color font-bold text-xl tracking-wider')}>
        Ngày {index + 1} - {item.location.locationName}
      </h3>
      <div className={cn('relative pl-10 mt-2')}>
        <span
          className={cn(
            'absolute left-0 h-[calc(100%-16px)] border-l-[0.5px] border-l-hover-color border-dashed top-[6px]',
            'before:absolute before:w-2 before:h-2 before:bg-hover-color before:rounded-full before:left-[-5px]',
            'after:absolute after:w-2 after:h-2 after:bg-hover-color after:rounded-full after:left-[-5px] after:bottom-0'
          )}
        ></span>
        <div className={cn('text-primary-color text-sm')}>
          <div
            dangerouslySetInnerHTML={{ __html: item.location.description }}
          />
        </div>
      </div>
    </div>
  )
}

export default function ScheduleTour({
  schedule
}: {
  schedule: Array<Schedule>
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-12 w-[85%] m-auto gap-4 border border-[#e7e7e7] rounded-xl'
      )}
    >
      <div className={cn('bg-[#f9f9f9] col-span-4 p-4')}>
        <GoTour schedule={schedule} />
      </div>
      <div className={cn('col-span-8 py-8 px-4')}>
        <TimeLineTour schedule={schedule} />
      </div>
    </div>
  )
}
