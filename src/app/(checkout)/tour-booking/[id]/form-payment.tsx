import useResponsiveFontSize from '@/hooks/useReponsiveFontSize'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { cx } from 'class-variance-authority'
import api from '@/config/api'
import TextArea from 'antd/es/input/TextArea'
import CustomInputNumber, { Label } from './CustomInputNumber'
import { PaymentType } from './page'
import { IProduct } from '@/types/Product'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { ICode } from '@/types/Discount'

const useOptions = () => {
  const fontSize = useResponsiveFontSize()
  const options = useMemo(
    () => ({
      classes: {
        base: 'border border-[#ccc] p-1 rounded'
      },
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#9e2146'
        }
      }
    }),
    [fontSize]
  )

  return options
}

interface IProps {
  product: IProduct | undefined
  paymentType: PaymentType
  totalDiscount: number
  form: FormInstance<any>
  codeId: string | undefined
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export default function FormPayment({
  product,
  paymentType,
  totalDiscount,
  codeId,
  form,
  loading,
  setLoading
}: IProps) {
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const paymentCard = async () => {
    if (!stripe || !elements) {
      return
    }

    const { paymentMethod }: any = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) as any
    })

    const { data: paymentIntentResult }: any = await api.post(
      '/payment/create-payment-intent',
      {
        amount: totalDiscount,
        paymentMethodId: paymentMethod.id
      }
    )

    return paymentIntentResult
  }

  const onSubmit = async (values: any) => {
    setLoading(true)
    switch (paymentType) {
      case 'card':
        const res = await paymentCard()
        console.log(res)
        await createBookingTour(values, res)
        setLoading(false)
        break
      case 'cash':
        break
      case 'qr':
        break
      default:
        return
    }
  }

  const createBookingTour = async (values: any, payment: any) => {
    try {
      const dataRequest = {
        ...values,
        priceInfo: {
          adult: values?.audult,
          child: values?.child,
          children: values?.children,
          infant: values?.infant
        },
        total: totalDiscount,
        payment: {
          type: paymentType,
          paymentId: payment.paymentIntent?.id
        },
        saleCode: codeId,
        productDetail: product?._id,
        status: 0
      }
      console.log(dataRequest)
      const res = await api.post('/orders/', dataRequest)
      console.log(res)
    } catch (err) {}
  }

  return (
    <Form
      title='Thông tin liên lạc'
      layout='vertical'
      onFinish={onSubmit}
      form={form}
      name='customerInfo'
      initialValues={{
        customer: []
      }}
    >
      <div>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label='Họ và tên'
              name={'name'}
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Email'
              name={'email'}
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label='Số điện thoại'
              name={'phone'}
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Địa chỉ'
              name={'address'}
              rules={[
                {
                  required: true,
                  message: 'Trường này là bắt buộc'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={20}>
          <Col span={12}>
            <CustomInputNumber label={'audult'} name={'audult'} form={form} />
          </Col>
          <Col span={12}>
            <CustomInputNumber label={'child'} name={'child'} form={form} />
          </Col>
          <Col span={12}>
            <CustomInputNumber
              label={'children'}
              name={'children'}
              form={form}
            />
          </Col>
          <Col span={12}>
            <CustomInputNumber label={'infant'} name={'infant'} form={form} />
          </Col>
        </Row>
      </div>
      <div className='mt-10 shadow-2xl p-4 rounded-lg'>
        <h3 className='text-primary-color font-bold text-lg'>
          Thông tin hành khách
        </h3>
        <Form.List name='customer'>
          {(fields) => (
            <div>
              {fields.map((field: any) => {
                return (
                  <Row key={field.key} gutter={20}>
                    <Col span={8}>
                      <Form.Item
                        key={field.key}
                        {...field}
                        name={[field.name, 'name']}
                        label='Họ và tên'
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        key={field.key}
                        {...field}
                        name={[field.name, 'gender']}
                        label='Giới tính'
                      >
                        <Select
                          options={[
                            {
                              value: 'male',
                              label: 'Name'
                            },
                            {
                              value: 'female',
                              label: 'Nữ'
                            }
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        key={field.key}
                        {...field}
                        label='Ngày'
                        name={[field.name, 'birthday']}
                      >
                        <DatePicker format={'DD'} />
                      </Form.Item>
                    </Col>
                  </Row>
                )
              })}
            </div>
          )}
        </Form.List>
      </div>
      {paymentType === 'card' && (
        <div className='mt-10'>
          <h3 className='font-bold text-primary-color text-xl'>
            Thông tin thanh toán
          </h3>
          <Form.Item label='Tên chủ thẻ' required>
            <Input placeholder='Nhập tên chủ thẻ' />
          </Form.Item>
          <Form.Item label='Thông tin thẻ' required>
            <CardElement options={options} />
          </Form.Item>
        </div>
      )}

      <div>
        <h3 className='text-primary-color font-bold text-base mt-10'>
          Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi!
        </h3>
        <div className='bg-[#F9F9F9] p-8'>
          <Form.Item
            name={'note'}
            label={<span className='text-primary-color '>Ghi chú thêm</span>}
          >
            <TextArea placeholder='Nhập ghi chú...' rows={10} />
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
