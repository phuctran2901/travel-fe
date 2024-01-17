'use client'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import { useFetchPlanTour } from '@/queries/plan-tour/useFetchPlanSchedule'
import PlanSchedule from './plan-schedule'
import { Col, Form, Input, Row, Spin, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Button } from '@/components/ui/button'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'antd/es/form/Form'
import api from '@/config/api'

const DesignTourSchedulePage = (props: any) => {
  const [form] = useForm()
  const params = useSearchParams()
  const router = useRouter()
  const query = {
    tags: params?.get('tags') || '',
    startDate: params?.get('startDate') || '',
    endDate: params?.get('endDate') || '',
    suitableObject: params?.get('suitableObject') || ''
  }
  // const params = props.searchParams
  const { data, isLoading } = useFetchPlanTour({ ...query })
  useEffect(() => {
    if (data) {
      setSchedule(data?.map((d, i) => ({ ...d, index: i })) as any)
    }
  }, [data])
  const [schedule, setSchedule] = useState([])

  function arrayMove(array: any[], fromIndex: number, toIndex: number) {
    const newArray = [...array]
    const [removedItem] = newArray.splice(fromIndex, 1)
    newArray.splice(toIndex, 0, removedItem)
    console.log(newArray)
    return newArray
  }
  const onDragEnd = (e: any) => {
    setSchedule(
      arrayMove(schedule, e?.source?.index, e?.destination?.index) as any
    )
  }

  const createPlanTour = async (data: any) => {
    await api.post('/plan-tour', {
      ...data
    })
  }

  const onFinish = async (values: any) => {
    try {
      await createPlanTour({
        ...values,
        schedule: JSON.stringify(
          schedule?.map((s: any, index) => ({
            index: index,
            location: s?.location?._id,
            date: data && data[index]?.date
          }))
        )
      })

      message.success('Gửi thành công')
      router.push('/search-tour')
      form.resetFields()
    } catch (err: any) {
      message.error(err.message)
    }
  }

  return (
    <div className='px-28'>
      <Spin spinning={isLoading}>
        {data && (
          <Row gutter={10}>
            <Col span={18}>
              <PlanSchedule
                schedule={schedule}
                startDate={query.startDate}
                setSchedule={setSchedule}
                onDragEnd={onDragEnd}
              />
            </Col>
            <Col span={6}>
              <div className='bg-[#f9f9f9] p-4 rounded-xl'>
                <Form layout='vertical' form={form} onFinish={onFinish}>
                  <Form.Item
                    name={'fullName'}
                    label='Họ tên'
                    rules={[
                      {
                        required: true,
                        message: 'This field is require'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label='Email'
                    name={'email'}
                    rules={[
                      {
                        required: true,
                        message: 'This field is require'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label='Số điện thoại'
                    name={'phone'}
                    rules={[
                      {
                        required: true,
                        message: 'This field is require'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name={'content'} label='Ghi chú'>
                    <TextArea />
                  </Form.Item>
                  <Form.Item>
                    <div className='w-full'>
                      <Button style={{ width: '100%' }} type='submit'>
                        Gửi
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        )}
      </Spin>
    </div>
  )
}

export default DesignTourSchedulePage
