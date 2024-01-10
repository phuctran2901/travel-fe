'use client'

import { TYPE_POST } from '@/constants'
import { useFetchPosts } from '@/queries/posts/useFetchPosts'
import React from 'react'
import CardBlogHorizontal from '../card-blog-horizontal'

export default function ExperienceTravelPage() {
  const { data } = useFetchPosts({})
  const tipPosts = data?.Posts?.filter(
    (post) => post.types === TYPE_POST.EXPERIENCE
  )
  return (
    <div>
      {tipPosts?.map((post) => (
        <CardBlogHorizontal key={post?._id} post={post} />
      ))}
    </div>
  )
}
