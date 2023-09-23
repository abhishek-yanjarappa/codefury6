import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: "libsql://stable-tara-abhishek-yanjarappa.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU0NzkxOTMsImlkIjoiZjhiYjYxYTEtNTlmYi0xMWVlLWEyZWMtNGVjZjM4YTU0MTM1In0.IwjVhfrn3STEzrFcBIn5dNj9FRu522xuyUfc2AoSAVZym6iWfOOo8NGYg973tDJrK7EmXJiNH9oV96AWpNPcBg",
  },
} satisfies Config;
