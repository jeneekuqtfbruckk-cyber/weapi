"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, Cloud, MessageSquare, Briefcase, MapPin, Fingerprint, Cpu, Truck, Globe, Shield, Video, Music } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Extended categories to match popular public-apis
const categories = [
    { id: "all", label: "All", icon: LayoutGrid },
    { id: "animals", label: "Animals", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "finance", label: "Finance", icon: Briefcase },
    { id: "development", label: "Dev Tools", icon: Cpu },
    { id: "weather", label: "Weather", icon: Cloud },
    { id: "transportation", label: "Transport", icon: Truck },
    { id: "video", label: "Video", icon: Video },
];

export function PillNav() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || "all";

    const handleSelect = (id: string) => {
        const params = new URLSearchParams(searchParams);
        if (id === "all") {
            params.delete("category");
        } else {
            params.set("category", id);
            // Reset page if we had pagination
        }
        router.replace(`/?${params.toString()}`);
    }

    return (
        <div className="w-full border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-16 z-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider mr-2 shrink-0">
                        Browse by Category
                    </span>
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id || (activeCategory === "" && cat.id === "all");
                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleSelect(cat.id)}
                                className={cn(
                                    "group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shrink-0 border",
                                    isActive
                                        ? "bg-gradient-to-r from-primary to-[#5e5ce6] text-white border-transparent shadow-md scale-[1.02]"
                                        : "bg-transparent border-border/60 text-muted hover:text-foreground hover:border-border hover:bg-surface hover:scale-[1.02]"
                                )}
                            >
                                {isActive ? (
                                    <Icon className="h-4 w-4 text-white/90" />
                                ) : (
                                    <Icon className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
                                )}
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
