import { app } from "./src/app.mjs";

const { PORT = 3002 } = process.env;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}...`);
});
