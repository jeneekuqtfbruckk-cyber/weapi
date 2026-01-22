'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ErrorContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-surface text-foreground">
            <div className="w-full max-w-md space-y-8 text-center">
                <h1 className="text-3xl font-bold text-red-500">Authentication Error</h1>
                <p className="text-lg text-muted">
                    There was a problem signing you in.
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm font-mono text-red-500 break-all">
                        {error}
                    </div>
                )}

                <div className="pt-4">
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function AuthCodeErrorPage() {
    return (
        <Suspense fallback={<div>Loading error details...</div>}>
            <ErrorContent />
        </Suspense>
    )
}
