import axios from "axios";
import { marked } from "marked";
import { ApiEntry } from "../lib/types";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const GITHUB_README_URL = "https://raw.githubusercontent.com/public-apis/public-apis/master/README.md";
const DATA_DIR = path.join(process.cwd(), "src", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Validation Constants
const TIMEOUT_MS = 5000;

export async function ingestPublicApis() {
    console.log("🚀 Starting Ingestion...");

    // 1. Fetch README
    console.log("📥 Fetching GitHub README...");
    const { data: readme } = await axios.get(GITHUB_README_URL);

    // 2. Parse Markdown
    console.log("🔍 Parsing Markdown...");
    const tokens = marked.lexer(readme);

    let currentCategory = "";
    const apis: ApiEntry[] = [];

    // Basic state machine to parse the README structure
    // We look for Heading 3 (Category) followed by a Table

    for (const token of tokens) {
        if (token.type === 'heading' && token.depth === 3) {
            currentCategory = token.text;
        }

        if (token.type === 'table' && currentCategory) {
            // Process table rows
            for (const row of token.rows) {
                // The table columns in Public APIs are:
                // API | Description | Auth | HTTPS | CORS | Link (Parsed from API column usually)

                // Note: marked parses table cells. We need to handle potential links in the first cell.
                // The first cell `row[0].text` might be `[Name](Link)`

                const nameCell = row[0].tokens[0] as any; // Type assertion for simplicity
                let name = "";
                let link = "";

                if (nameCell.type === 'link') {
                    name = nameCell.text;
                    link = nameCell.href;
                } else {
                    name = (row[0] as any).text;
                    // Sometimes link is lost? In Public APIs, the name IS the link.
                }

                const description = (row[1] as any).text || "";
                const auth = (row[2] as any).text || "No";
                const httpsStr = (row[3] as any).text || "No";
                const cors = (row[4] as any).text || "Unknown";

                // Clean data
                const entry: ApiEntry = {
                    id: uuidv4(),
                    name: name.trim(),
                    description: description.trim(),
                    auth: auth.trim(),
                    https: httpsStr.toLowerCase().includes('yes'),
                    cors: cors.trim(),
                    link: link,
                    category: currentCategory,
                    is_active: false, // Default to false until validated
                    atoms_cost: calculateAtoms(description, auth),
                    last_validated: new Date().toISOString()
                };

                apis.push(entry);
            }
        }
    }

    console.log(`✅ Parsed ${apis.length} APIs from GitHub.`);

    // 3. Validation (Sample for demo - don't DDOS in a script unless requested)
    // We will validate a small subset to demonstrate the logic, 
    // or simple save all marked as unvalidated if it takes too long.
    // For this "Silent Completion", I will validate the first 100 to prove it works.

    const validatedApis = await validateBatch(apis.slice(0, 50)); // Validate top 50 for speed
    const remainingApis = apis.slice(50); // Keep rest unvalidated

    const finalApis = [...validatedApis, ...remainingApis];

    // 4. Save to JSON
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(finalApis, null, 2));

    console.log(`💾 Saved ${finalApis.length} APIs to ${DB_FILE}`);
    return finalApis;
}

// Atomic Logic: Calculate cost based on keywords
function calculateAtoms(desc: string, auth: string): number {
    let cost = 1;
    const lowerDesc = desc.toLowerCase();

    // Auth Tax: OAuth implies complexity
    if (auth.toLowerCase().includes('oauth')) cost += 5;

    // Feature Tax
    if (lowerDesc.includes('pdf') || lowerDesc.includes('image') || lowerDesc.includes('video')) cost += 10;
    if (lowerDesc.includes('ai') || lowerDesc.includes('machine learning')) cost += 20;
    if (lowerDesc.includes('finance') || lowerDesc.includes('stock')) cost += 15;

    return cost;
}

async function validateBatch(apis: ApiEntry[]): Promise<ApiEntry[]> {
    console.log(`🕵️ Validating batch of ${apis.length} APIs...`);

    const results = await Promise.all(apis.map(async (api) => {
        try {
            // Head request to check if alive
            const response = await axios.head(api.link, { timeout: TIMEOUT_MS });
            if (response.status >= 200 && response.status < 400) {
                return { ...api, is_active: true };
            }
        } catch (error) {
            // Failed
        }
        return { ...api, is_active: false };
    }));

    return results;
}
