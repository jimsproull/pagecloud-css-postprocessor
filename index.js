import express from "express";
import expressValidator from "express-validator";

import { processCss } from "./process.mjs";
import { redirectSsl } from "./ssl.js";

const { SECRET_KEY = "foo", PORT = 3002 } = process.env;
const { check, validationResult } = expressValidator;

const SSL_ENVIRONMENTS = ["staging", "production"];
const app = express();
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

if (
    process.env.NODE_ENV &&
    SSL_ENVIRONMENTS.find((env) => env === process.env.NODE_ENV)
) {
    app.use(redirectSsl());
}

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
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            res.send(await processCss(req.body.html));
        } catch (e) {
            next(e);
        }
        return null;
    },
);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}...`);
});
