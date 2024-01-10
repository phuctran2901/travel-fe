'use client'
import { DATE_FORMAT } from '@/constants'
import convertDateDDMMYYYY from '@/helpers/convertDateDDMMYYYY'
import { cn } from '@/lib/utils'
import useFetchProductDetail from '@/queries/products/useFetchProductDetail'
import { IProduct } from '@/types/Product'
import moment from 'moment'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import CustomInputNumber, { LABEL, Label } from './CustomInputNumber'
import { useForm, useWatch } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { useMommentLocaleVi } from '@/hooks/useMomentLocaleVi'
import { FaUsers } from 'react-icons/fa6'
import {
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Spin,
  message
} from 'antd'
import FormPayment from './form-payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import convertNumToVND from '@/helpers/convertNumToVND'
import { checkDiscount } from '@/mutation/discount/useCheckDiscount'
import { StatusResponse } from '@/types/Response'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ICode } from '@/types/Discount'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '')

export type PaymentType = 'card' | 'cash' | 'qr'

export default function TourBooking() {
  const [paymentType, setPaymentType] = useState<PaymentType>('card')
  const params = useParams()
  const [form] = useForm()
  const watchPriceChild = useWatch('child', form)
  const watchPriceAudult = useWatch('audult', form)
  const watchPriceChildren = useWatch('children', form)
  const watchPriceInfant = useWatch('infant', form)
  const { data }: any = useFetchProductDetail((params?.id as string) || '')
  const product: IProduct | undefined = data?.product
  const startDate = useMommentLocaleVi(product?.startDate || '', 'll')
  const endDate = useMommentLocaleVi(product?.endDate || '', 'll')
  const [totalPriceCustomer, setTotalPriceCustomer] = useState(0)
  const [discount, setDiscount] = useState<ICode | null>(null)
  const [code, setCode] = useState('')
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const prAudult = watchPriceAudult * (product?.price?.audult || 0)
    const prChild = watchPriceChild * (product?.price?.child || 0)
    const prChildren = watchPriceChildren * (product?.price?.children || 0)
    const prInfant = watchPriceInfant * (product?.price?.infant || 0)
    let total = prAudult + prChild + prChildren + prInfant
    if (discount) {
      setTotalDiscount(total - (handleCaculateDiscount(total) || 0))
    } else {
      setTotalDiscount(total)
    }
    setTotalPriceCustomer(total)
    return () => {
      setTotalPriceCustomer(0)
    }
  }, [
    watchPriceAudult,
    watchPriceChild,
    watchPriceChildren,
    watchPriceInfant,
    discount
  ])
  function calculatePercentage(number: number, percentage: number) {
    if (typeof number !== 'number' || typeof percentage !== 'number') {
      throw new Error('Both input values must be numbers')
    }

    const result = (number * percentage) / 100

    return result
  }

  const handleCaculateDiscount = (num: number) => {
    if (discount?.type === '%') {
      return calculatePercentage(num, discount.discount)
    }

    return discount?.discount
  }

  const handleCheckDiscount = async () => {
    const res = await checkDiscount({
      code: code
    })

    if (res.data.status === ('success' as any)) {
      setDiscount(res.data.coupon as any)
      message.warning('Áp dụng mã giảm giá thành công')
    } else {
      message.warning(res.data.messenger)
    }
  }

  return (
    <Elements stripe={stripePromise}>
      <section className={cn('w-[85%] m-auto')}>
        <div className='flex gap-5'>
          <div className='relative w-[400px] h-[300px] rounded-tl-lg rounded-bl-lg overflow-hidden'>
            <Image
              alt={product?.title || ''}
              src={product?.urls?.[0]?.url || ''}
              layout='fill'
            />
          </div>
          <div className='bg-[#f9f9f9] p-5 rounded-lg'>
            <h3 className='text-primary-color hover:text-hover-color font-bold text-xl'>
              {product?.title}
            </h3>
            <p className='flex gap-2 text-sm mt-2'>
              <span>Mã tour</span>
              <span className='font-bold text-primary-color'>
                {product?._id}
              </span>
            </p>
            <p className='flex gap-2 text-sm mt-2'>
              <span>Khởi hành</span>
              <span className='font-bold text-primary-color'>
                {convertDateDDMMYYYY(product?.tripInfo?.departAt || '')}
              </span>
            </p>
            <p className='flex gap-2 text-sm mt-2'>
              <span>Thời gian</span>
              <span className='font-bold text-primary-color'>
                {moment(product?.endDate, DATE_FORMAT.dateDDMMYYYY).diff(
                  moment(product?.startDate, DATE_FORMAT.dateDDMMYYYY),
                  'days'
                )}{' '}
                ngày
              </span>
            </p>
            <p className='flex gap-2 text-sm mt-2'>
              <span>Nơi khởi hành</span>
              <span className='font-bold text-primary-color'>
                {product?.tripInfo?.startingGate?.name}
              </span>
            </p>
            <p className='flex gap-2 text-sm mt-2'>
              <span>Số chỗ còn nhận</span>
              <span className='font-bold text-primary-color'>
                {product?.numberOfSeatsLeft}
              </span>
            </p>
          </div>
        </div>
        <Row className='mt-10' gutter={20}>
          <Col span={16}>
            <h3 className='text-primary-color font-bold text-lg'>
              Tổng quan về chuyến đi
            </h3>
            <FormPayment
              product={product}
              form={form}
              paymentType={paymentType}
              loading={loading}
              setLoading={setLoading}
              totalDiscount={totalDiscount}
              codeId={discount?._id}
            />
          </Col>
          <Col span={8}>
            <div className='border border-[#ccc] p-4'>
              <h3 className='text-primary-color font-bold text-2xl'>
                Tóm tắt chuyến đi
              </h3>
              <div className='mt-5'>
                <div className='flex gap-2'>
                  <div className='w-5/12 h-[100px] relative rounded-md overflow-hidden'>
                    <Image
                      src={product?.urls?.[0]?.url || ''}
                      alt={product?.title || ''}
                      layout='fill'
                    />
                  </div>
                  <p className='text-primary-color font-bold text-base hover:text-hover-color cursor-pointer'>
                    {product?.title}
                  </p>
                </div>
                <div className='before:absolute before:h-[20%] before:border-l before:border-dashed before:border-primary-color before:top-[30px] before:left-[10px] relative'>
                  <div className={cn('flex gap-4 mt-4')}>
                    <span>
                      <IoCalendarNumberOutline
                        size={25}
                        className='text-hover-color'
                      />
                    </span>
                    <div>
                      <span className='text-primary-color'>
                        Bắt đầu chuyến đi
                      </span>
                      <p className='text-primary-color font-bold text-base'>
                        {startDate}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-4 mt-10'>
                    <span>
                      <IoCalendarNumberOutline
                        size={25}
                        className='text-hover-color'
                      />
                    </span>
                    <div>
                      <span className='text-primary-color'>Kết thúc</span>
                      <p className='text-primary-color font-bold text-base'>
                        {endDate}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between mt-10'>
                      <p className='flex items-center gap-1'>
                        <FaUsers className='text-primary-color' />
                        <span className='font-bold text-primary-color'>
                          Hành khách
                        </span>
                      </p>
                      <span className='font-bold text-red-color text-lg'>
                        {convertNumToVND(totalPriceCustomer || 0)}
                      </span>
                    </div>
                    {watchPriceAudult > 0 && (
                      <div className='flex justify-between'>
                        <p>
                          <span>Người lớn</span>
                        </p>
                        <span className='font-bold text-primary-color'>
                          {watchPriceAudult} x{' '}
                          {convertNumToVND(product?.price?.audult || 0)}
                        </span>
                      </div>
                    )}
                    {watchPriceChild > 0 && (
                      <div className='flex justify-between'>
                        <p>
                          <span>Trẻ em</span>
                        </p>
                        <span className='font-bold text-primary-color'>
                          {watchPriceChild} x{' '}
                          {convertNumToVND(product?.price?.child || 0)}
                        </span>
                      </div>
                    )}
                    {watchPriceChildren > 0 && (
                      <div className='flex justify-between'>
                        <p>
                          <span>Trẻ nhỏ</span>
                        </p>
                        <span className='font-bold text-primary-color'>
                          {watchPriceChildren} x{' '}
                          {convertNumToVND(product?.price?.children || 0)}
                        </span>
                      </div>
                    )}
                    {watchPriceInfant > 0 && (
                      <div className='flex justify-between'>
                        <p>
                          <span>Em bé</span>
                        </p>
                        <span className='font-bold text-primary-color'>
                          {watchPriceInfant} x{' '}
                          {convertNumToVND(product?.price?.infant || 0)}
                        </span>
                      </div>
                    )}
                    {discount && (
                      <div className='flex justify-between'>
                        <div>
                          <p className=' font-bold text-primary-color'>
                            Mã giảm giá: <span>{discount?.code}</span>
                          </p>
                          <p className=' font-bold text-primary-color'>
                            Giảm giá:{' '}
                            <span>
                              {discount?.discount} {discount?.type}
                            </span>
                          </p>
                        </div>
                        <Button
                          className='bg-red-color hover:bg-red-color'
                          size={'sm'}
                          onClick={() => setDiscount(null)}
                        >
                          Không áp dụng
                        </Button>
                      </div>
                    )}
                    {!discount && (
                      <div className='flex gap-1 mt-2 w-full'>
                        <p className='w-1/3 font-bold text-primary-color'>
                          Mã giảm giá
                        </p>
                        <div className='w-2/3 flex gap-1'>
                          <Input
                            placeholder='Nhập mã giảm giá'
                            value={code}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setCode(e.target.value)}
                          />
                          <Button onClick={handleCheckDiscount}>Áp dụng</Button>
                        </div>
                      </div>
                    )}
                    <div className='mt-8'>
                      <Radio.Group
                        name='payment'
                        value={paymentType}
                        onChange={(e: RadioChangeEvent) => {
                          const value: PaymentType = e.target.value
                          setPaymentType(value)
                        }}
                      >
                        <Radio value={'card'}>
                          Thanh toán qua thẻ ngân hàng
                        </Radio>
                        <Radio value={'cash'}>Thanh toán tiền mặt</Radio>
                        <Radio value={'qr'}>Thanh toán bằng QR Code</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
                <div className='mt-5 border-t border-t-red-color'>
                  <div className='flex mt-2 justify-between items-center'>
                    <p className='text-2xl font-bold text-primary-color'>
                      Tổng tiền
                    </p>
                    <p className='text-2xl font-bold text-red-color'>
                      {convertNumToVND(totalDiscount)}
                    </p>
                  </div>
                  {/* <Button
                    className='w-full mt-2 bg-red-color hover:bg-red-400 text-xl'
                    // onClick={onSubmit}
                    // onClick={() => form.submit()}
                    type='submit'
                    name='customerInfo'
                  >
                    Đặt ngay
                  </Button> */}
                  <Spin spinning={loading}>
                    <Button
                      style={{ width: '100%' }}
                      className='mt-2'
                      form='customerInfo'
                      type='submit'
                      disabled={loading}
                    >
                      Đặt ngay
                    </Button>
                  </Spin>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </Elements>
  )
}
