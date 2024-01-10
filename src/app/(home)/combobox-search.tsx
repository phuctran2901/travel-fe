'use client'
import React, { useState } from 'react'
import { BiSolidBusSchool } from 'react-icons/bi'
import TetIcon from '@/../public/tet.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MdSearch } from 'react-icons/md'
import FieldSearch from '@/components/FieldSearch/FieldSearch'
import { CiLocationOn } from 'react-icons/ci'
import { InputType } from '@/constants'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
interface ITabFilter {
  title: string
  icon: React.ReactElement
  form?: React.ReactElement
}

const PackageTour = () => {
  return (
    <div
      className={cn(
        'flex gap-3 transition-opacity duration-500 ease-in-out opacity-100 items-center'
      )}
    >
      <FieldSearch
        type={InputType.TEXT}
        label='Điểm đi'
        placeholder='Nơi khởi hành'
        className='w-1/4'
        icon={<CiLocationOn className='w-full h-full' />}
      />
      <div
        className={cn('flex items-center text-primary-color justify-center')}
      >
        <FaArrowRightArrowLeft size={35} />
      </div>

      <FieldSearch
        type={InputType.SELECT}
        className='w-1/4'
        icon={<CiLocationOn className='w-full h-full' />}
        label='Điểm đến'
        placeholder='Hãy chọn điểm đến'
      />

      <FieldSearch
        type={InputType.DATE_PICKER}
        className='w-1/4'
        icon={<IoCalendarNumberOutline className='w-full h-full' />}
        label='Ngày đi'
        placeholder='Hãy chọn điểm đến'
      />

      <FieldSearch
        type={InputType.SELECT}
        className='w-1/4'
        icon={<IoCalendarNumberOutline className='w-full h-full' />}
        label='Số ngày'
        placeholder='Tất cả'
      />

      <div className={cn('w-1/7')}>
        <Button
          className={cn(
            'bg-[#fe9b00] w-full font-bold text-md hover:bg-border-primary hover:opacity-80'
          )}
        >
          <MdSearch size={25} />
          Tìm kiếm
        </Button>
      </div>
    </div>
  )
}

const LunaNewYearTour = () => {
  return (
    <div>
      <div
        className={cn(
          'flex gap-3 transition-opacity duration-500 ease-in-out opacity-100 items-center'
        )}
      >
        <FieldSearch
          type={InputType.TEXT}
          label='Điểm đi'
          placeholder='Nơi khởi hành'
          className='w-1/2'
          icon={<CiLocationOn className='w-full h-full' />}
        />
        <div
          className={cn('flex items-center text-primary-color justify-center')}
        >
          <FaArrowRightArrowLeft size={35} />
        </div>
        <FieldSearch
          type={InputType.SELECT}
          className='w-1/2'
          icon={<CiLocationOn className='w-full h-full' />}
          label='Điểm đến'
          placeholder='Hãy chọn điểm đến'
        />

        <div className={cn('w-1/7')}>
          <Button
            className={cn(
              'bg-[#fe9b00] w-full font-bold text-md hover:bg-border-primary hover:opacity-80'
            )}
          >
            <MdSearch size={25} />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  )
}

const TABS_FILTER: ITabFilter[] = [
  {
    title: 'Tour du lịch trọn gói',
    icon: <BiSolidBusSchool className='w-full h-full' />,
    form: <PackageTour />
  },
  {
    title: 'Tour tết âm lịch',
    icon: (
      <Image alt='Tour tết âm lịch' src={TetIcon} className='w-full h-full' />
    ),
    form: <LunaNewYearTour />
  },
  {
    title: 'Tra cứu booking',
    icon: <MdSearch className='w-full h-full' />
  }
]
export default function ComboboxSearch() {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div>
      <nav>
        <ul className='flex bg-[rgba(45,66,113,.8)] rounded-t-xl overflow-hidden'>
          {TABS_FILTER.map((tab, idx) => (
            <li
              key={tab.title}
              onClick={() => setActiveTab(idx)}
              className={cn(
                'flex flex-col items-center gap-2 py-2 px-6 text-white cursor-pointer rounded-t-xl transition ease-in delay-[300] border-none',
                'hover:bg-white hover:text-hover-color',
                activeTab === idx && 'bg-white text-hover-color'
              )}
            >
              <p className={cn('h-8 w-8')}>{tab.icon}</p>
              <p>{tab.title}</p>
            </li>
          ))}
        </ul>
      </nav>
      <div className={cn('bg-white rounded-b-xl p-20')}>
        {TABS_FILTER[activeTab].form}
      </div>
    </div>
  )
}
