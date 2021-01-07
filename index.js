import express from "express";
import { check, validationResult } from "express-validator";

import { processCss } from "./process.mjs";
import { redirectSsl } from "./ssl.js";

const { SECRET_KEY, PORT } = process.env;

const htmlSource = `<html>
<head>
<style>
    :root {
        --pc-color-1: rgba(0,1,2,.3);
        --pc-color-2: red;
    }
    :root {
        --my-custom-color: var(--pc-color-2);
    }
</style>
<style>
    .foo {
        color: var(--pc-color-1);
        background-color: var(--pc-color-2);
        border-color: var(--my-custom-color);
    }

    ::placeholder {
        color: gray;
        }

        @media (min-resolution: 2dppx) {
        .image {
            background-image: url(image@2x.png);
        }
        }
</style>
<div class="foo" style="color: var(--my-custom-color);">
    hi!
</div>
</html>`;

const source = htmlSource;
const SSL_ENVIRONMENTS = ["staging", "production"];
const app = express();
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

if (
    process.env.NODE_ENV &&
    SSL_ENVIRONMENTS.find((env) => env === process.env.NODE_ENV)
) {
    app.use(redirectSsl());
    // sentry.configure(app);
}
// app.use(bodyParser.raw({type: 'application/*', limit: '700kb'}));

app.post(
    "/",
    [
        check("html").custom((html) => {
            if (!html.length) {
                // no validation on html for now really
                throw new Error("bad html");
            }
            return true;
        }),
        check("key").equals(SECRET_KEY),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            res.send(await processCss(req.body.html));
        } catch (e) {
            console.log(e);
        }
    },
);
// app.post('/ssr', routes.objectScreenshot);
// app.get('/ss/:bucketName/:siteName/*', routes.pageScreenshot);
// app.get('/*' , async (req, res) => res.status(404).end());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
