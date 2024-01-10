'use client'
import { TYPE_POST } from '@/constants'
import { cn } from '@/lib/utils'
import { useFetchDetailPost } from '@/queries/posts/useFetchDetailPost'
import { useFetchPosts } from '@/queries/posts/useFetchPosts'
import { IPost, PostDetailResponse, PostResponse } from '@/types/Post'
import { Col, Row } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

export default function PostDetailPage() {
  const { data: posts } = useFetchPosts({})
  const newPosts = posts?.Posts?.filter((post) => post.types === TYPE_POST.NEWS)

  const params = useParams()
  const { data } = useFetchDetailPost((params?.id as string) || '', {
    enabled: !!params?.id
  })
  const post = data?.post as IPost
  return (
    <section className={cn('w-[85%] m-auto')}>
      <h1 className='text-2xl font-bold mb-5'>{data?.post?.title}</h1>
      <Row gutter={40}>
        <Col span={18}>
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </Col>
        <Col span={6}>
          <h3 className='text-primary-color text-xl'>Tin tức</h3>
          <ul>
            {[...new Array(5)].map(
              (_, idx) =>
                newPosts?.[idx] && (
                  <li
                    key={newPosts?.[idx]?._id}
                    className='cursor-pointer hover:text-hover-color text-primary-color list-disc'
                  >
                    {newPosts?.[idx]?.title}
                  </li>
                )
            )}
          </ul>
        </Col>
      </Row>
    </section>
  )
}
