export interface ApiEntry {
    id: string;
    name: string;
    description: string;
    auth: string;
    https: boolean;
    cors: string;
    link: string;
    category: string;
    is_active?: boolean;
    atoms_cost: number;
    last_validated?: string;
}

export interface Category {
    id: string;
    label: string;
    icon: any; // Lucide icon
}
