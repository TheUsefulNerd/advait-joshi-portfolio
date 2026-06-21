import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Initialize Resend API key from Supabase Secrets
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Very basic auth to ensure only you can trigger this (e.g., via a manual curl)
  const authHeader = req.headers.get('Authorization')
  const EXPECTED_SECRET = Deno.env.get('BLAST_SECRET')
  
  if (!authHeader || authHeader !== `Bearer ${EXPECTED_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const { subject, html, emails } = await req.json()

    if (!subject || !html || !emails || !Array.isArray(emails)) {
      return new Response(
        JSON.stringify({ error: 'Missing subject, html, or emails array' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured in Supabase secrets')
    }

    // Prepare batch request for Resend
    // Note: Resend batch API limit is typically 100 emails per request.
    // For larger lists, you'd chunk the 'emails' array.
    const resendPayload = emails.map(email => ({
      from: 'Advait Joshi <newsletter@yourdomain.com>', // MUST update to verified domain
      to: email,
      subject: subject,
      html: html,
    }))

    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend API Error:', data)
      return new Response(
        JSON.stringify({ error: 'Failed to send emails via Resend', details: data }),
        { headers: { 'Content-Type': 'application/json' }, status: res.status }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Function error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
