'use client'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import { useFetchPlanTour } from '@/queries/plan-tour/useFetchPlanSchedule'
import PlanSchedule from './plan-schedule'
import { Col, Form, Input, Row, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Button } from '@/components/ui/button'

const DesignTourSchedulePage = (props: any) => {
  const params = props.searchParams
  const { data, isLoading } = useFetchPlanTour({
    ...params
  })
  useEffect(() => {
    if (data) {
      setSchedule(data?.map((d, i) => ({ ...d, index: i })) as any)
    }
  }, [data])
  const [schedule, setSchedule] = useState([])
  return (
    <div className='px-28'>
      <Spin spinning={isLoading}>
        {data && (
          <Row gutter={10}>
            <Col span={18}>
              <PlanSchedule schedule={schedule} />
            </Col>
            <Col span={6}>
              <div className='bg-[#f9f9f9] p-4 rounded-xl'>
                <Form layout='vertical'>
                  <Form.Item label='Họ tên'>
                    <Input />
                  </Form.Item>
                  <Form.Item label='Email'>
                    <Input />
                  </Form.Item>
                  <Form.Item label='Số điện thoại'>
                    <Input />
                  </Form.Item>
                  <Form.Item label='Ghi chú'>
                    <TextArea />
                  </Form.Item>
                  <Form.Item>
                    <div className='w-full'>
                      <Button style={{ width: '100%' }}>Gửi</Button>
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
