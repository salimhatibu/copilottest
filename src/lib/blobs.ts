/**
 * Netlify Blobs helper for storing PDFs and images.
 * This is a client-side placeholder; actual blob access goes through Netlify functions.
 */

export async function uploadToBlobs(file: File, namespace: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('namespace', namespace)

  const response = await fetch('/.netlify/functions/blob-upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) throw new Error('Blob upload failed')
  const { url } = await response.json()
  return url
}

export async function deleteFromBlobs(url: string): Promise<void> {
  const response = await fetch('/.netlify/functions/blob-delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) throw new Error('Blob delete failed')
}
