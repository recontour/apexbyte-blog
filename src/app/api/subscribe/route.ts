import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // 1. Get the email from the request
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    // 2. Connect to Database
    const payload = await getPayload({ config })

    // 3. Save the email
    await payload.create({
      collection: 'subscribers',
      data: {
        email,
      },
    })

    return NextResponse.json({ success: true, message: 'Subscribed!' })
  } catch (error) {
    // Duplicate email error usually
    return NextResponse.json({ error: 'Something went wrong or email exists.' }, { status: 500 })
  }
}
