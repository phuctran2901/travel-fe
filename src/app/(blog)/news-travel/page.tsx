'use client'
import React from 'react'
import NewThread from '../news-blog/new-thread'
import { cn } from '@/lib/utils'
import CardBlogHorizontal from '../card-blog-horizontal'
import { useFetchPosts } from '@/queries/posts/useFetchPosts'
import { TYPE_POST } from '@/constants'

export default function NewTravelPage() {
  const { data } = useFetchPosts({})
  const newPosts = data?.Posts?.filter((post) => post.types === TYPE_POST.NEWS)
  return (
    <div>
      <NewThread newPosts={newPosts || []} />
      <div className={cn('mt-16')}>
        {newPosts?.map((post) => (
          <CardBlogHorizontal key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
