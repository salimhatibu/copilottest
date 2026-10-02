export default async (request: Request) => {
  if (request.method === 'GET') {
    const posts = [
      {
        id: 1,
        slug: 'quiet-start',
        title: 'A quiet start to the morning',
        published: true,
        publishedAt: '2026-10-02',
      },
    ]
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (request.method === 'POST') {
    const body = await request.json()
    const newPost = { id: Date.now(), ...body, createdAt: new Date().toISOString() }
    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
}
