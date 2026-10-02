export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const body = await request.json()
  const { postId, eventType, dwellSeconds } = body

  if (!postId || !eventType) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }

  // Store analytics in database
  return new Response(
    JSON.stringify({
      id: Date.now(),
      postId,
      eventType,
      dwellSeconds,
      createdAt: new Date().toISOString(),
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
