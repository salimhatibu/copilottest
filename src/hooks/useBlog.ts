import { useState } from 'react'
import type { ReactNode } from 'react'

export interface BlogPost {
  id: number
  slug: string
  title: string
  description?: string
  body: string
  seriesId?: number
  coverImageUrl?: string
  published: boolean
  publishedAt?: string
  createdAt: string
}

export interface BlogSeries {
  id: number
  name: string
  slug: string
  description?: string
}

const DEFAULT_SERIES: BlogSeries[] = [
  { id: 1, name: 'Marriage', slug: 'marriage', description: 'Islamic perspectives on marriage.' },
  { id: 2, name: 'Modesty', slug: 'modesty', description: 'The virtues of modesty.' },
  { id: 3, name: 'Worship', slug: 'worship', description: 'The heart of worship.' },
]

export function useBlogSeries() {
  const [series, setSeries] = useState<BlogSeries[]>(DEFAULT_SERIES)

  const addSeries = (name: string, description?: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const newSeries: BlogSeries = {
      id: Math.max(0, ...series.map((s) => s.id)) + 1,
      name,
      slug,
      description,
    }
    setSeries((prev) => [...prev, newSeries])
    return newSeries
  }

  const updateSeries = (id: number, updates: Partial<BlogSeries>) => {
    setSeries((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const deleteSeries = (id: number) => {
    setSeries((prev) => prev.filter((s) => s.id !== id))
  }

  return { series, addSeries, updateSeries, deleteSeries }
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      slug: 'quiet-start',
      title: 'A quiet start to the morning',
      description: 'The importance of beginning the day with remembrance.',
      body: 'When the day begins with remembrance, the rest of the hours are shaped by it.',
      seriesId: 1,
      published: true,
      publishedAt: '2026-10-02',
      createdAt: '2026-10-02',
    },
    {
      id: 2,
      slug: 'beauty-of-sincerity',
      title: 'The beauty of sincerity in worship',
      description: 'Worshipping with a pure heart.',
      body: 'Sincerity is the foundation of all righteous deeds.',
      seriesId: 3,
      published: true,
      publishedAt: '2026-10-01',
      createdAt: '2026-10-01',
    },
  ])

  const addPost = (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Math.max(0, ...posts.map((p) => p.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setPosts((prev) => [...prev, newPost])
    return newPost
  }

  const updatePost = (id: number, updates: Partial<BlogPost>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const publishPost = (id: number) => {
    const now = new Date().toISOString().split('T')[0]
    updatePost(id, { published: true, publishedAt: now })
  }

  return { posts, addPost, updatePost, deletePost, publishPost }
}
