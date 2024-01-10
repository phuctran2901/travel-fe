import { cn } from '@/lib/utils'
import { IPost } from '@/types/Post'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProps {
  post: IPost
}

export default function CardBlogHorizontal({ post }: IProps) {
  const getFirstElementFromHtmlString = (string: string): string | null => {
    var parser = new DOMParser()
    var doc = parser.parseFromString(string, 'text/html')

    var firstElement = doc.querySelector('p')

    if (firstElement) {
      return firstElement.innerText
    } else {
      return null
    }
  }
  return (
    <div
      className={cn(
        'py-6 first:border-t border-b border-primary-color grid grid-cols-1 gap-4',
        'md:grid-cols-6'
      )}
    >
      <div
        className={cn(
          'relative  pt-[58%] rounded-xl overflow-hidden',
          'md:col-span-2'
        )}
      >
        <Image layout='fill' src={post?.image || ''} alt={post?.title || ''} />
      </div>
      <div className={cn('md:col-span-4')}>
        <h3
          className={cn(
            'text-primary-color font-bold cursor-pointer mb-5 text-3xl',
            'hover:text-hover-color'
          )}
        >
          <Link href={`/post/${post?._id}`}>{post?.title}</Link>
        </h3>
        <div className={cn('text-red-color font-semibold mb-5')}>
          Tin tức du lịch
        </div>
        <p className={cn('text-muted')}>
          {getFirstElementFromHtmlString(post?.content || '')}
        </p>
      </div>
    </div>
  )
}
