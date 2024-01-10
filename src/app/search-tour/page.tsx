'use client'
import { cn } from '@/lib/utils'
import React, { Key, useState } from 'react'
import SearchForm from './search-form'
import CardVertical from '@/components/CardVertical/card-vertical'

import { Pagination, Select, Spin } from 'antd'
import useFetchProducts from '@/queries/products/useFetchProducts'
import { IProduct, IProductRequest } from '@/types/Product'
import { IRequestParams, SortEnum } from '@/types/Request'
import dayjs from 'dayjs'
export default function SearchTourPage() {
  const [params, setParams] = useState<Partial<IProductRequest>>({
    pageSize: 9,
    page: 1,
    sortField: 'price.audult',
    sortOrder: 'asc' as SortEnum,
    maxPrice: 200000000,
    minPrice: 0
    // startDate: dayjs().format('DDMMYYYY')
  })
  const { data, isLoading } = useFetchProducts(params)

  const handlePageChange = (page: number, pageSize: number) => {
    setParams({
      ...params,
      page
    })
  }

  const handleChangeSort = (value: string) => {
    const sV = value.split(',')
    setParams({
      ...params,
      sortField: sV[0],
      sortOrder: sV[1] as SortEnum
    })
  }

  return (
    <div className={cn('w-[85%] m-auto grid grid-cols-10 gap-2')}>
      <div className={cn('col-span-2')}>
        <SearchForm setParams={setParams} params={params} />
      </div>
      <div className={cn('col-span-8')}>
        <h1 className='py-6 border-b mb-2 border-b-[#d5d5d5]'></h1>

        <div>
          <div className='flex justify-between items-center my-4 p-2 text-primary-color'>
            <p>
              Chúng tôi tìm thấy{' '}
              <span className={cn('font-bold')}>{data?.result.toString()}</span>{' '}
              tour cho quý khách
            </p>
            <div className={cn('flex items-center gap-1')}>
              <span>Sắp xếp theo</span>
              <Select
                onChange={handleChangeSort}
                style={{ width: 180 }}
                value={`${params.sortField},${params.sortOrder}`}
                options={[
                  {
                    label: 'Theo giá thấp -> cao',
                    value: 'price.audult,asc'
                  },
                  {
                    label: 'Theo giá cao -> thấp',
                    value: 'price.audult,desc'
                  },
                  {
                    label: 'Giảm giá nhiều nhất',
                    value: 'sale,desc'
                  }
                ]}
              />
            </div>
          </div>
          <Spin spinning={isLoading}>
            <div className={cn('grid grid-cols-3 gap-4 min-h-[500px]')}>
              {data?.products?.map((product: IProduct) => {
                return (
                  <CardVertical product={product} key={product._id as Key} />
                )
              })}
            </div>
          </Spin>
          <div className={cn('flex items-center justify-center mt-10')}>
            <Pagination
              current={params.page}
              total={data?.totalPage || 0 * (params?.pageSize || 0)}
              pageSize={params?.pageSize}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
