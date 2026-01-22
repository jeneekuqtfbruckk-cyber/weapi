import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const cookieStore = await cookies()
         // Capture cookies to be set
        const cookiesToSet: { name: string, value: string, options: CookieOptions }[] = []

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookies) {
                        cookies.forEach(c => cookiesToSet.push(c))
                    },
                },
            }
        )

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            if (data.session) {
                await supabase.auth.setSession(data.session)
            }
            
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            
            let redirectUrl = `${origin}${next}`
            if (!isLocalEnv && forwardedHost) {
                redirectUrl = `https://${forwardedHost}${next}`
            }

            const response = NextResponse.redirect(redirectUrl)

            // Apply captured cookies to the response
            cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
            )

            return response
        } else {
            console.error('Auth callback error:', error)
            return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error.message)}`)
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=NoCodeProvided`)
}
