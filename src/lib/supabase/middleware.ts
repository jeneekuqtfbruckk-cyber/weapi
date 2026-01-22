import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: DO NOT CALL THESE LINES
    // 
    // DO NOT:
    // const { data: { user } } = await supabase.auth.getUser()
    // 
    // The getUser() method will attempt to validate JWT and may trigger token refresh.
    // In middleware, this can cause issues. Instead, use getSession() which just reads cookies.
    // However, note that getSession() may return stale data.
    // 
    // For Next.js 15+, the recommended approach is to validate tokens
    // in Server Components/Actions using getClaims() instead.

    // Refresh session if expired - required for Server Components
    // This is the simple pattern that works for most cases
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Optional: Redirect unauthenticated users from protected routes
    // Uncomment and customize as needed:
    // if (
    //     !user &&
    //     !request.nextUrl.pathname.startsWith('/login') &&
    //     !request.nextUrl.pathname.startsWith('/auth')
    // ) {
    //     const url = request.nextUrl.clone()
    //     url.pathname = '/login'
    //     return NextResponse.redirect(url)
    // }

    // CRITICAL: Always return the supabaseResponse object
    // This ensures cookies are properly sent to the browser
    return supabaseResponse
}
