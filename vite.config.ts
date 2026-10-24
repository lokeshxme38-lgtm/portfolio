import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * Dev-only: serves the /api/leetcode function from `npm run dev`, so you do not
 * need `vercel dev` locally. In production, Vercel runs the same file natively.
 */
function localApi(): Plugin {
  return {
    name: "local-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/leetcode", async (req, res) => {
        try {
          const mod = (await server.ssrLoadModule("/api/leetcode.ts")) as {
            GET: (request: Request) => Promise<Response>;
          };
          const response = await mod.GET(new Request(`http://localhost${req.originalUrl ?? req.url ?? ""}`));
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch {
          res.statusCode = 502;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ message: "The local LeetCode function failed to run." }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localApi()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["motion"],
        },
      },
    },
  },
});