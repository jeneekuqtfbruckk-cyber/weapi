"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";

export function UserNav() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        // Check active session
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };
        checkUser();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return <div className="h-9 w-9 rounded-full bg-surface animate-pulse" />;
    }

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-medium text-foreground">{user.user_metadata.full_name || user.email}</span>
                    <span className="text-xs text-muted">Dev Account</span>
                </div>
                <div className="group relative">
                    <button className="h-9 w-9 rounded-full overflow-hidden border border-border/50 transition-transform active:scale-95">
                        {user.user_metadata.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Avatar"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white">
                                <UserIcon className="h-4 w-4" />
                            </div>
                        )}
                    </button>

                    {/* Simple Dropdown for MVP */}
                    <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none hidden group-focus-within:block">
                        <button
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link href="/login">
            <button className="h-9 px-4 rounded-full bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-transform active:scale-95 shadow-sm">
                Sign In
            </button>
        </Link>
    );
}
