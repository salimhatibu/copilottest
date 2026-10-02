export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const body = await request.json()
  const { period } = body

  if (!period || !['monthly', 'biweekly'].includes(period)) {
    return new Response(JSON.stringify({ error: 'Invalid period' }), { status: 400 })
  }

  // Generate PDF (placeholder)
  const reportUrl = `https://example.com/reports/${period}-${Date.now()}.pdf`

  return new Response(
    JSON.stringify({
      id: Date.now(),
      period,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      blobUrl: reportUrl,
      generatedAt: new Date().toISOString(),
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
