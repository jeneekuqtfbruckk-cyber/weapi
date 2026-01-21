"use client";

import { Search, Command } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { UserNav } from "./user-nav";
import { Suspense } from "react";

function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative w-full transition-all duration-300 ease-out group-focus-within:scale-[1.02]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted group-focus-within:text-primary transition-colors" />
            <input
                type="text"
                placeholder="Search APIs, services, or solutions..."
                defaultValue={searchParams.get('q')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full h-10 rounded-xl bg-surface border-none pl-10 pr-4 text-sm text-foreground focus:ring-0 focus:bg-white focus:shadow-sm placeholder:text-muted/70 transition-all shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-border/50 rounded px-1.5 py-0.5 bg-white/50">
                <Command className="h-3 w-3 text-muted/80" />
                <span className="text-[10px] text-muted/80 font-medium">K</span>
            </div>
        </div>
    );
}

export function Header() {
    const atomBalance = useUserStore((state) => state.atomBalance);

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                        W
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-foreground">
                        WEAPI
                    </span>
                </Link>

                {/* Central Search Bar (Apple Style) */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 group">
                    <Suspense fallback={<div className="w-full h-10 rounded-xl bg-surface/50 animate-pulse" />}>
                        <SearchBar />
                    </Suspense>
                </div>

                {/* Right Nav */}
                <nav className="flex items-center gap-6">
                    {/* Atom Balance Display */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-semibold text-foreground">{atomBalance} Atoms</span>
                    </div>

                    <Link href="/collections" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                        Collections
                    </Link>
                    <Link href="/docs" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                        Docs
                    </Link>
                    <UserNav />
                </nav>
            </div>
        </header>
    );
}
