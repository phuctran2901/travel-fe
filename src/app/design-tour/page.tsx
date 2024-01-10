'use client'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Col,
  DatePicker,
  Form,
  Radio,
  Row,
  Select,
  Typography
} from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { RiHeartsLine } from 'react-icons/ri'
import { LiaUserFriendsSolid } from 'react-icons/lia'
import { MdOutlineFamilyRestroom } from 'react-icons/md'
import useFetchAllTag from '@/queries/tags/useFetchAllTags'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { useRouter } from 'next/navigation'

export default function DesignTourPage() {
  const { data } = useFetchAllTag()
  const [steps, setSteps] = useState(0)
  const router = useRouter()
  const [suggestInfo, setSuggestInfo] = useState<{
    tags: string[]
    startDate: string
    endDate: string
    suitableObject: string
  }>({
    tags: [],
    startDate: moment(new Date()).format('DDMMYYYY'),
    endDate: moment(new Date()).format('DDMMYYYY'),
    suitableObject: ''
  })

  const getDisabledDate = (dateString: any) => {
    const disabledDay = moment(dateString, 'DDMMYYYY')
    return (current: any) => {
      return current && current < disabledDay.startOf('day')
    }
  }

  const STEPS_FORM: any = {
    0: (
      <Form.Item>
        <Calendar
          onChange={(date) =>
            setSuggestInfo({
              ...suggestInfo,
              startDate: date.format('DDMMYYYY'),
              endDate: date.format('DDMMYYYY')
            })
          }
          disabledDate={getDisabledDate(moment(new Date()).format('DDMMYYYY'))}
          headerRender={({ value, type, onChange, onTypeChange }: any) => {
            const start = 0
            const end = 12
            const monthOptions = []

            let current = value.clone()
            const localeData = value?.localeData()
            const months = []
            for (let i = 0; i < 12; i++) {
              current = current.month(i)
              months.push(localeData.monthsShort(current))
            }

            for (let i = start; i < end; i++) {
              monthOptions.push(
                <Select.Option key={i} value={i} className='month-item'>
                  {'Tháng'} {i + 1}
                </Select.Option>
              )
            }

            const year = value.year()
            const month = value.month()
            const options = []
            for (let i = year - 10; i < year + 10; i += 1) {
              // options.push(
              //   <Select.Option key={i} value={i} className='year-item'>
              //     {i}
              //   </Select.Option>
              // )
              options.push({
                label: i,
                value: i,
                disabled: i < dayjs().year()
              })
            }
            return (
              <div style={{ padding: 8 }}>
                <Typography.Title level={2}>
                  Chọn ngày bắt đầu khởi hành
                </Typography.Title>
                <Typography.Title level={4}>
                  Ngày:{' '}
                  {dayjs(suggestInfo.startDate, 'DDMMYYYY').format(
                    'DD/MM/YYYY'
                  )}
                </Typography.Title>
                <Row gutter={8} justify={'end'}>
                  <Col>
                    <Select
                      size='large'
                      dropdownMatchSelectWidth={false}
                      className='my-year-select'
                      value={year}
                      onChange={(newYear) => {
                        const now = value.clone().year(newYear)
                        onChange(now)
                      }}
                      options={options}
                    ></Select>
                  </Col>
                  <Col>
                    <Select
                      size='large'
                      dropdownMatchSelectWidth={false}
                      value={month}
                      onChange={(newMonth) => {
                        const now = value.clone().month(newMonth)
                        onChange(now)
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                </Row>
              </div>
            )
          }}
        />
      </Form.Item>
    ),
    1: (
      <Form.Item>
        <Calendar
          onChange={(date) =>
            setSuggestInfo({ ...suggestInfo, endDate: date.format('DDMMYYYY') })
          }
          disabledDate={getDisabledDate(suggestInfo.startDate)}
          headerRender={({ value, type, onChange, onTypeChange }: any) => {
            const start = 0
            const end = 12
            const monthOptions = []

            let current = value.clone()
            const localeData = value?.localeData()
            const months = []
            for (let i = 0; i < 12; i++) {
              current = current.month(i)
              months.push(localeData.monthsShort(current))
            }

            for (let i = start; i < end; i++) {
              monthOptions.push(
                <Select.Option key={i} value={i} className='month-item'>
                  {months[i]}
                </Select.Option>
              )
            }

            const year = value.year()
            const month = value.month()
            const options = []
            for (let i = year - 10; i < year + 10; i += 1) {
              // options.push(
              //   <Select.Option key={i} value={i} className='year-item'>
              //     {i}
              //   </Select.Option>
              // )
              options.push({
                label: i,
                value: i,
                disabled: i < dayjs().year()
              })
            }
            return (
              <div style={{ padding: 8 }}>
                <Typography.Title level={2}>
                  Chọn ngày kết thúc
                </Typography.Title>
                <Typography.Title level={4}>
                  Ngày:{' '}
                  {dayjs(suggestInfo.endDate, 'DDMMYYYY').format('DD/MM/YYYY')}
                </Typography.Title>
                <Row gutter={8} justify={'end'}>
                  <Col>
                    <Select
                      size='large'
                      dropdownMatchSelectWidth={false}
                      className='my-year-select'
                      value={year}
                      onChange={(newYear) => {
                        const now = value.clone().year(newYear)
                        onChange(now)
                      }}
                      options={options}
                    ></Select>
                  </Col>
                  <Col>
                    <Select
                      size='large'
                      dropdownMatchSelectWidth={false}
                      value={month}
                      onChange={(newMonth) => {
                        const now = value.clone().month(newMonth)
                        onChange(now)
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                </Row>
              </div>
            )
          }}
        />
      </Form.Item>
    ),
    2: (
      <div>
        <h3 className='font-bold text-3xl'>Bạn muốn đi với ai???</h3>
        <p className='text-gray font-light'>Chọn một.</p>
        <div className='flex gap-10 m-auto justify-center mt-20'>
          <div
            className={cn(
              'pl-4 pr-20 py-10 border rounded-2xl cursor-pointer',
              suggestInfo.suitableObject === 'Một mình' && 'border-black'
            )}
            onClick={() =>
              setSuggestInfo({ ...suggestInfo, suitableObject: 'Một mình' })
            }
          >
            <span>
              <FaRegUser size={30} />
            </span>
            <p className='text-xl mt-2 font-bold'>Một mình</p>
          </div>
          <div
            className={cn(
              'pl-4 pr-20 py-10 border rounded-2xl cursor-pointer',
              suggestInfo.suitableObject === 'Cặp đôi' && 'border-black'
            )}
            onClick={() =>
              setSuggestInfo({ ...suggestInfo, suitableObject: 'Cặp đôi' })
            }
          >
            <span>
              <RiHeartsLine size={30} />
            </span>
            <p className='text-xl mt-2 font-bold'>Cặp đôi</p>
          </div>
          <div
            className={cn(
              'pl-4 pr-20 py-10 border rounded-2xl cursor-pointer',
              suggestInfo.suitableObject === 'Bạn bè' && 'border-black'
            )}
            onClick={() =>
              setSuggestInfo({ ...suggestInfo, suitableObject: 'Bạn bè' })
            }
          >
            <span>
              <LiaUserFriendsSolid size={30} />
            </span>
            <p className='text-xl mt-2 font-bold'>Bạn bè</p>
          </div>
          <div
            className={cn(
              'pl-4 pr-20 py-10 border rounded-2xl cursor-pointer',
              suggestInfo.suitableObject === 'Gia đình' && 'border-black'
            )}
            onClick={() =>
              setSuggestInfo({ ...suggestInfo, suitableObject: 'Gia đình' })
            }
          >
            <span>
              <MdOutlineFamilyRestroom size={30} />
            </span>
            <p className='text-xl mt-2 font-bold'>Gia đình</p>
          </div>
        </div>
      </div>
    ),
    3: (
      <>
        {' '}
        <h3 className='font-bold text-3xl'>
          Bạn muốn sử dụng thời gian của mình như thế nào?
        </h3>
        <p className='text-gray font-light'>Chọn bao nhiêu tùy thích</p>
        <div className='mt-12 flex gap-4 flex-wrap'>
          {data?.tags?.map((t) => (
            <div
              key={t._id}
              className='cursor-pointer'
              onClick={() => {
                if (suggestInfo.tags.includes(t._id)) {
                  setSuggestInfo({
                    ...suggestInfo,
                    tags: [...suggestInfo.tags].filter((v) => v !== t._id)
                  })
                } else
                  setSuggestInfo({
                    ...suggestInfo,
                    tags: [...suggestInfo.tags, t._id]
                  })
              }}
            >
              <span
                className={cn(
                  'border rounded-xl p-2',
                  suggestInfo.tags.includes(t._id) && 'border-black'
                )}
                key={t._id}
              >
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div>
      <div
        className='transition-width duration-200 ease-in-out h-3'
        style={{
          background: 'linear-gradient(90deg,#34e0a1,#dfd3ee);'
        }}
      />
      <div className='w-[80%] m-auto py-8'>{STEPS_FORM?.[steps as any]}</div>
      <div
        style={{
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1);'
        }}
        className='h-[100px] shadow-2xl fixed bottom-0 left-0 right-0 flex justify-between items-center px-4'
      >
        {steps !== 0 ? (
          <Button
            size={'lg'}
            onClick={() => {
              steps !== 0 && setSteps(steps - 1)
            }}
          >
            Trở lại
          </Button>
        ) : (
          <div />
        )}
        <Button
          size={'lg'}
          onClick={() => {
            steps !== 3 && setSteps(steps + 1)
            if (steps === 3) {
              const sg: any = { ...suggestInfo }
              const queryString = Object.keys(sg)
                .map(
                  (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(sg[key])}`
                )
                .join('&')
              router.push('/design-tour-schedule?' + queryString, {
                scroll: false
              })
            }
          }}
        >
          {steps === 3 ? 'Gửi' : 'Tiếp tục'}
        </Button>
      </div>
    </div>
  )
}
