import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import useFetchAllType from '@/queries/types/useFetchAllType'
import { IProductRequest } from '@/types/Product'
import { DatePicker, Form, Slider } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import React, { Dispatch, SetStateAction } from 'react'
interface IProps {
  setParams: Dispatch<SetStateAction<Partial<IProductRequest>>>
  params: Partial<IProductRequest>
}
export default function SearchForm({ setParams, params }: IProps) {
  const { data: dataTypes } = useFetchAllType()
  return (
    <div className={cn('bg-[#f9f9f9]')}>
      <h4 className={cn('text-2xl px-4 py-3 text-primary-color font-bold')}>
        Lọc kết quả
      </h4>
      <h4 className={cn('bg-hover-color text-white font-semibold px-4 py-3')}>
        Tất cả
      </h4>
      <Form className={cn('px-4 py-3')}>
        <div className={cn('mb-8')}>
          <p className={cn('text-primary-color font-semibold mb-2 text-xs')}>
            DÒNG TOUR
          </p>
          <div className='flex flex-wrap gap-2'>
            {dataTypes?.types?.map((type) => (
              <div
                onClick={() => {
                  setParams({
                    ...params,
                    types: params?.types === type._id ? undefined : type._id
                  })
                }}
                className='shadow-md px-4 py-2 bg-white text-center w-[calc(55%-16px)]'
                key={type._id}
              >
                {type.name}
              </div>
            ))}
          </div>
        </div>
        <div className={cn('mb-8')}>
          <p className={cn('text-primary-color font-semibold mb-2 text-xs')}>
            Số ngày
          </p>
          <div className='flex flex-wrap gap-2'>
            <div
              className='shadow-md px-4 py-2 bg-white font-semibold text-center w-[calc(55%-16px)]'
              onClick={() => {
                setParams({
                  ...params,
                  duration: '3'
                })
              }}
            >
              {'>'} 3 ngày
            </div>
            <div
              className='shadow-md px-4 py-2 bg-white font-semibold text-center w-[calc(55%-16px)]'
              onClick={() => {
                setParams({
                  ...params,
                  duration: '5'
                })
              }}
            >
              {'>'} 5 ngày
            </div>
            <div
              className='shadow-md px-4 py-2 bg-white font-semibold text-center w-[calc(55%-16px)]'
              onClick={() => {
                setParams({
                  ...params,
                  duration: '7'
                })
              }}
            >
              {'>'} 7 ngày
            </div>
            <div
              className='shadow-md px-4 py-2 bg-white font-semibold text-center w-[calc(55%-16px)]'
              onClick={() => {
                setParams({
                  ...params,
                  duration: '10'
                })
              }}
            >
              {'>'} 10 ngày
            </div>
          </div>
        </div>
        <div className={cn('mb-8')}>
          <p className={cn('text-primary-color font-semibold mb-2 text-xs')}>
            Ngày đi
          </p>
          <DatePicker
            size='large'
            style={{ width: '100%' }}
            value={dayjs(params.startDate, 'DDMMYYYY') as any}
            format={'DD/MM/YYYY'}
            onChange={(value) =>
              setParams({
                startDate: value?.format('DDMMYYYY')
              })
            }
          />
        </div>
        <div className={cn('mb-8')}>
          <p className={cn('text-primary-color font-semibold mb-2 text-xs')}>
            Ngân sách của quý khách
          </p>
          <Slider
            range
            step={100000}
            max={200000000}
            min={0}
            defaultValue={[params.minPrice, params.maxPrice] as any}
            onChangeComplete={(value) => {
              console.log(value)
              setParams({
                minPrice: value[0],
                maxPrice: value[1]
              })
            }}
          />
        </div>
        <div className={cn('mb-8')}>
          <p className={cn('text-primary-color font-semibold mb-2 text-base')}>
            Hiển thị những chuyến đi có
          </p>
          <div className='flex items-center space-x-2'>
            <Switch
              id='sale-mode'
              onCheckedChange={(checked) => {
                setParams({
                  isSale: checked
                })
              }}
            />
            <label htmlFor='sale-mode'>Khuyến mãi</label>
          </div>
        </div>
      </Form>
    </div>
  )
}
