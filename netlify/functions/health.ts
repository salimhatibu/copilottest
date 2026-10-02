export default async () => {
  return new Response(JSON.stringify({ ok: true, service: 'markaz-ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
