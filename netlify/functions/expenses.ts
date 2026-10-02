export default async (request: Request) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  // Mock expenses endpoint
  const expenses = [
    { id: 1, reason: 'Maintenance', amountCents: 650000, date: '2026-10-02', details: 'Classroom light repair' },
  ]

  return new Response(JSON.stringify(expenses), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
