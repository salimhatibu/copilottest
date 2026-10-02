export default async (request: Request) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  // Mock students endpoint
  const students = [
    {
      id: 1,
      admissionNumber: 'A-001',
      name: 'Amina Hassan',
      section: 'morning',
      expectedFeesCents: 1500000,
      paidCents: 900000,
    },
  ]

  return new Response(JSON.stringify(students), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
