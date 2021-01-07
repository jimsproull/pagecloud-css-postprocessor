import { configure } from "@vendia/serverless-express";
import { app } from "./src/app.mjs";

const servererlessExpress = configure({ app });
export const { handler } = servererlessExpress;
