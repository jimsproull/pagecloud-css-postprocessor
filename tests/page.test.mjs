import { promises } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { processCss } from "../process.mjs";

const testPath = dirname(fileURLToPath(import.meta.url));

it("does not crash", async () => {
    const html = await promises.readFile(`${testPath}/page.html`);
    const results = await processCss(html);
    expect(results).toBe("fo");
});
