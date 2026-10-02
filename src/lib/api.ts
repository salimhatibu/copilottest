import type { BlogPost } from '@/hooks/useBlog'

const API_BASE = '/.netlify/functions'

export async function getStudents() {
  const response = await fetch(`${API_BASE}/students`)
  if (!response.ok) throw new Error('Failed to fetch students')
  return response.json()
}

export async function getTeachers() {
  const response = await fetch(`${API_BASE}/teachers`)
  if (!response.ok) throw new Error('Failed to fetch teachers')
  return response.json()
}

export async function getExpenses() {
  const response = await fetch(`${API_BASE}/expenses`)
  if (!response.ok) throw new Error('Failed to fetch expenses')
  return response.json()
}

export async function getPosts(published?: boolean) {
  const url = published !== undefined ? `${API_BASE}/posts?published=${published}` : `${API_BASE}/posts`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

export async function getPostBySlug(slug: string) {
  const response = await fetch(`${API_BASE}/posts/${slug}`)
  if (!response.ok) throw new Error('Post not found')
  return response.json()
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt'>) {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!response.ok) throw new Error('Failed to create post')
  return response.json()
}

export async function updatePost(id: number, updates: Partial<BlogPost>) {
  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!response.ok) throw new Error('Failed to update post')
  return response.json()
}

export async function publishPost(id: number) {
  const response = await fetch(`${API_BASE}/posts/${id}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) throw new Error('Failed to publish post')
  return response.json()
}

export async function recordAnalytics(postId: number, eventType: 'view' | 'impression' | 'click', dwellSeconds?: number) {
  const response = await fetch(`${API_BASE}/analytics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postId, eventType, dwellSeconds }),
  })
  if (!response.ok) throw new Error('Failed to record analytics')
  return response.json()
}

export async function subscribeNewsletter(email: string) {
  const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!response.ok) throw new Error('Failed to subscribe')
  return response.json()
}

export async function getReports() {
  const response = await fetch(`${API_BASE}/reports`)
  if (!response.ok) throw new Error('Failed to fetch reports')
  return response.json()
}

export async function generateReport(period: 'monthly' | 'biweekly') {
  const response = await fetch(`${API_BASE}/reports/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ period }),
  })
  if (!response.ok) throw new Error('Failed to generate report')
  return response.json()
}
