import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { bookRouter } from "./books/booksRouter";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    origin: "*", // specify your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", bookRouter);

console.log(`Server is running on port ${process.env.PORT}`);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
