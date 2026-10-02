export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const namespace = (formData.get('namespace') as string) || 'uploads'

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 })
    }

    // Placeholder: In production, use Netlify Blobs SDK
    const filename = `${namespace}/${Date.now()}-${file.name}`
    const url = `https://cdn.example.com/${filename}`

    return new Response(JSON.stringify({ url, filename }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 })
  }
}
