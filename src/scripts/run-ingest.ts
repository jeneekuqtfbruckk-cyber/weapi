import { ingestPublicApis } from "./ingest";

(async () => {
    try {
        await ingestPublicApis();
        process.exit(0);
    } catch (error) {
        console.error("Ingestion Failed:", error);
        process.exit(1);
    }
})();
