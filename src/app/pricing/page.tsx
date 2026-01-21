import { Header } from "@/components/shell/header";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-surface/50 font-sans">
            <Header />
            <main className="mx-auto max-w-7xl px-4 py-16 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">Atomic Pricing</h1>
                <p className="text-muted">Flexible, granular pricing that scales with your usage.</p>
                <div className="mt-8 p-12 border border-dashed border-border rounded-2xl bg-white/50">
                    <span className="text-sm text-muted">Content coming in Phase 2</span>
                </div>
            </main>
        </div>
    );
}
