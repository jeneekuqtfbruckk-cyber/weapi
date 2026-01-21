import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-white pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2 pr-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                                W
                            </div>
                            <span className="text-xl font-semibold tracking-tight text-foreground">
                                WEAPI
                            </span>
                        </div>
                        <p className="text-sm text-muted/80 leading-relaxed mb-6 max-w-sm">
                            Accelerate development, innovate faster, and transform your business with our comprehensive OpenAPI ecosystem.
                            The ultimate geek's holy land for standardized APIs.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted hover:text-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">For Developers</h3>
                        <ul className="space-y-3">
                            <li><Link href="/docs" className="text-sm text-muted hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="/collections" className="text-sm text-muted hover:text-primary transition-colors">Collections</Link></li>
                            <li><Link href="/status" className="text-sm text-muted hover:text-primary transition-colors">System Status</Link></li>
                            <li><Link href="/open-source" className="text-sm text-muted hover:text-primary transition-colors">Open Source</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-sm text-muted hover:text-primary transition-colors">Browse APIs</Link></li>
                            <li><Link href="/pricing" className="text-sm text-muted hover:text-primary transition-colors">Atomic Pricing</Link></li>
                            <li><Link href="/suggest" className="text-sm text-muted hover:text-primary transition-colors">Suggest API</Link></li>
                            <li><Link href="/tools/convert" className="text-sm text-muted hover:text-primary transition-colors">Smart Converter</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-sm text-muted hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="text-sm text-muted hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/legal/privacy" className="text-sm text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms" className="text-sm text-muted hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Badges Row (Mimicking Juhe's credibility footer) */}
                <div className="flex flex-wrap items-center gap-6 py-8 border-t border-border/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {/* Placeholders for badges - using text for now to keep it clean code-wise */}
                    <div className="h-8 border border-border rounded px-3 flex items-center text-xs font-semibold">Featured on Product Hunt</div>
                    <div className="h-8 border border-border rounded px-3 flex items-center text-xs font-semibold">Verified by GitHub</div>
                    <div className="h-8 border border-border rounded px-3 flex items-center text-xs font-semibold">Stripe Partner</div>
                </div>

                {/* Bottom Rights */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/40 text-xs text-muted/60">
                    <p>&copy; 2026 WEAPI Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-foreground">Cookies</Link>
                        <Link href="#" className="hover:text-foreground">Security</Link>
                        <Link href="#" className="hover:text-foreground">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
