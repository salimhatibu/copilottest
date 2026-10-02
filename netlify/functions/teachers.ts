export default async (request: Request) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  // Mock teachers endpoint
  const teachers = [
    { id: 1, name: 'Ustadh Juma', expectedSalaryCents: 3500000, paidCents: 2500000 },
  ]

  return new Response(JSON.stringify(teachers), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
