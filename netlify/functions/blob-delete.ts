export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 })
    }

    // Placeholder: In production, use Netlify Blobs SDK to delete
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 })
  }
}
