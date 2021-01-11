import { promises } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import process from "../src/process.js";

const { processCss } = process;

const testPath = dirname(fileURLToPath(import.meta.url));

it("does not crash", async () => {
    const html = await promises.readFile(`${testPath}/page.html`);
    const results = await processCss(html);
    expect(results).toContain("<html");
});

it("throws an error on bad semicolon styles", async () => {
    const html = `<html>
    <head style="color: color: blue">
    </head>
</html>`;

    return processCss(html)
        .catch((e) => {
            expect(e.message).toContain("Missed semicolon");
        })
        .then((e) => expect(e).toBe(undefined));
});
