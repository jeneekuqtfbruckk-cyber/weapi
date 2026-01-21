import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ApiCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string; // Hex for the color bar and icon bg
    badge?: string;
    price: string;
    isHot?: boolean;
}

export function ApiCard({ title, description, icon: Icon, color, badge, price, isHot }: ApiCardProps) {
    return (
        <Link href="#" className="group block h-full">
            <div className="relative h-full flex flex-col rounded-xl bg-white/95 border border-border/40 shadow-sm transition-all duration-300 hover:shadow-float hover:-translate-y-1 hover:border-border/80 overflow-hidden">

                {/* Top Color Bar (Juhe Style) */}
                <div className="h-1 w-full" style={{ backgroundColor: color }} />

                <div className="p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div
                            className="h-12 w-12 rounded-xl flex items-center justify-center shadow-inner"
                            style={{ backgroundColor: `${color}15` }} // 15 = roughly 8% opacity
                        >
                            <Icon className="h-6 w-6" style={{ color: color }} />
                        </div>

                        {/* Status Badges */}
                        <div className="flex gap-2">
                            {isHot && (
                                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider border border-red-100">
                                    Hot
                                </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                                API
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-muted/90 leading-relaxed line-clamp-2 mb-6 flex-1">
                        {description}
                    </p>

                    {/* Footer Features */}
                    {badge && (
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2.5 py-1 rounded-md bg-green-50/80 border border-green-100 text-green-700 text-xs font-semibold flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3" />
                                {badge}
                            </span>
                        </div>
                    )}

                    {/* Action Footer */}
                    <div className="flex items-end justify-between border-t border-border/30 pt-4 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted font-medium uppercase tracking-wider">Starting at</span>
                            <span className="text-sm font-bold text-primary">{price}</span>
                        </div>
                        <div className="text-xs font-medium text-primary flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Explore <ArrowRight className="h-3 w-3" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
