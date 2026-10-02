export default async () => {
  return new Response(JSON.stringify({ ok: true, scheduled: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = {
  schedule: '30 6 * * 1',
}
