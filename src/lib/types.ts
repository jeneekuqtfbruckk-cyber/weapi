export interface ApiEntry {
    id: string; // UUID or unique slug
    name: string;
    description: string;
    auth: string; // "apiKey", "OAuth", "No", etc.
    https: boolean;
    cors: string; // "Yes", "No", "Unknown"
    link: string;
    category: string;

    // WEAPI Augmented Fields
    provider?: string; // e.g. "Google", "Twitter"
    logo_url?: string; // Validated logo
    openapi_url?: string; // Location of spec
    atoms_cost: number; // Atomic pricing cost (default 1)
    last_validated?: string; // ISO Date
    is_active: boolean; // Result of validation
}

export interface Category {
    id: string; // slugified name e.g. "development-tools"
    name: string; // Display name e.g. "Development Tools"
    count: number;
}
