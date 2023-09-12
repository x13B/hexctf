import { PrismaClient } from "@prisma/client";

// Centralized database client.
// Anytime a connection is needed, import:
// lib/db.server.js
export const db = new PrismaClient();