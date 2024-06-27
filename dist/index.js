"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const booksRouter_1 = require("./books/booksRouter");
const cors_1 = require("hono/cors");
const app = new hono_1.Hono();
app.use((0, cors_1.cors)({
    origin: "http://localhost:5173", // specify your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
}));
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.route("/api", booksRouter_1.bookRouter);
console.log(`Server is running on port ${process.env.PORT}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
});
