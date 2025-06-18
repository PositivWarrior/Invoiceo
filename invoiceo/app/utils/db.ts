// Import the PrismaClient from the path where it was generated
// This is specified in prisma/schema.prisma as output = "../lib/generated/prisma"
import { PrismaClient } from '@prisma/client';
import { PrismaClient as _PrismaClient } from '../../lib/generated/prisma';

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
	return new PrismaClient();
};

// TypeScript declaration for global singleton
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Use existing instance or create a new one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export as default for direct imports
export default prisma;

// Store in global for development to prevent multiple instances during hot reload
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// Export the PrismaClient type for type safety
export { _PrismaClient };
