import { Form, FormInstance, InputNumber } from 'antd'
import { useWatch } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { CiCircleMinus } from 'react-icons/ci'
import { CiCirclePlus } from 'react-icons/ci'
export const LABEL = {
  audult: {
    title: 'Người lớn',
    age: 'Từ 12 tuổi'
  },
  child: {
    title: 'Trẻ em',
    age: 'Từ 5 - 11 tuổi'
  },
  children: {
    title: 'Trẻ nhỏ',
    age: 'Từ 2 - 4 tuổi'
  },
  infant: {
    title: 'Em bé',
    age: 'Từ 0 - 2 tuổi'
  }
}

export type Label = 'audult' | 'child' | 'children' | 'infant'

interface IProps {
  label: Label | 'audult'
  name: string
  form: FormInstance<any>
}

export default function CustomInputNumber({ name, form, label }: IProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    form?.setFieldValue('count', value)
  }, [value])
  return (
    <div className='flex justify-between'>
      <div>
        <p className='font-bold text-primary-color text-base'>
          {label && LABEL?.[label]?.title}
        </p>
        <span>{label && LABEL?.[label]?.age}</span>
      </div>
      <div className='flex gap-5'>
        <span
          className='cursor-pointer'
          onClick={() => {
            form?.setFieldValue(name, value > 0 ? value - 1 : 0)
            setValue(value > 0 ? value - 1 : 0)
          }}
        >
          <CiCircleMinus size={30} />
        </span>
        <span className='text-xl'>{value}</span>
        <Form.Item name={name} hidden initialValue={0}>
          <InputNumber name={name} />
        </Form.Item>
        <CiCirclePlus
          size={30}
          onClick={() => {
            setValue(value + 1)
            form?.setFieldValue(name, value + 1)
            const beforeCustomer = form?.getFieldValue('customer') || []
            console.log(name, beforeCustomer)
            form?.setFieldValue('customer', [...beforeCustomer, { type: name }])
          }}
        />
      </div>
    </div>
  )
}
