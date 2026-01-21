import { ingestPublicApis } from "./ingest";

// Wrapper to run async function
(async () => {
    try {
        await ingestPublicApis();
        process.exit(0);
    } catch (error) {
        console.error("Ingestion Failed:", error);
        process.exit(1);
    }
})();
