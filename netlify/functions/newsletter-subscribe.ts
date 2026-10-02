export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const body = await request.json()
  const { email } = body

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 })
  }

  const token = Math.random().toString(36).slice(2)
  const unsubscribeUrl = `${new URL(request.url).origin}/unsubscribe?token=${token}`

  return new Response(
    JSON.stringify({
      success: true,
      email,
      subscribedAt: new Date().toISOString(),
      unsubscribeToken: token,
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
