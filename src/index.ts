import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bookRouter } from "./books/booksRouter";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    origin: "*", // specify your frontend URL or accept all
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", bookRouter);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
