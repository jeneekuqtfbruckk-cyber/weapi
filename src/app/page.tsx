import { Header } from "@/components/shell/header";
import { PillNav } from "@/components/shell/pill-nav";
import { ApiCard } from "@/components/api-card";
import { Fingerprint, Smartphone, Mail, Globe, CloudRain, Truck, LayoutGrid } from "lucide-react";
import fs from "fs/promises";
import path from "path";
import { ApiEntry } from "@/lib/types";

// Helper to get icon based on category (Simple mapping for now)
const getIcon = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes("weather")) return CloudRain;
  if (c.includes("identity") || c.includes("security")) return Fingerprint;
  if (c.includes("location") || c.includes("geo")) return Globe;
  if (c.includes("phone") || c.includes("sms")) return Smartphone;
  if (c.includes("email")) return Mail;
  if (c.includes("logistics")) return Truck;
  return LayoutGrid;
};

// Map Authentication to colors
const getColor = (auth: string) => {
  if (auth.toLowerCase().includes("oauth")) return "#0071e3"; // Apple Blue
  if (auth.toLowerCase().includes("key")) return "#ff9f0a"; // Orange
  return "#34c759"; // Green (No Auth/Open)
};

async function getApis(query?: string, category?: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf8");
    let data = JSON.parse(file) as ApiEntry[];

    // 1. Filter by Category
    if (category && category !== "all") {
      data = data.filter(api => api.category.toLowerCase().includes(category.toLowerCase()));
    }

    // 2. Filter by Search Query
    if (query) {
      const lowerQuery = query.toLowerCase();
      data = data.filter(api =>
        api.name.toLowerCase().includes(lowerQuery) ||
        api.description.toLowerCase().includes(lowerQuery)
      );
    }

    return data.slice(0, 50); // Pagination limit
  } catch (e) {
    return [];
  }
}

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams; // Next 15+ needs await
  const query = typeof params?.q === 'string' ? params.q : undefined;
  const category = typeof params?.category === 'string' ? params.category : undefined;

  const apis = await getApis(query, category);

  return (
    <div className="min-h-screen bg-surface/50 font-sans selection:bg-primary/20">
      <Header />
      <PillNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} APIs` : "Explore APIs"}
            </h1>
            <p className="text-muted text-base max-w-2xl">
              Discover {apis.length} results. {query ? `Matching "${query}"` : "Standardized, validated, and ready for integration."}
            </p>
          </div>
          <div className="hidden sm:block text-sm text-muted">
            Showing {apis.length} results
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api) => {
            const Icon = getIcon(api.category);
            const color = getColor(api.auth);

            return (
              <ApiCard
                key={api.id}
                title={api.name}
                description={api.description}
                icon={Icon}
                color={color}
                badge={api.https ? "HTTPS Secure" : undefined}
                price={`${api.atoms_cost} Atom${api.atoms_cost > 1 ? 's' : ''}`}
                isHot={api.category === "Animals" || api.category === "Security"} // Mock logic
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
