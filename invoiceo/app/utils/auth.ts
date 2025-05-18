import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import prisma from './db';

// Make sure to use our Prisma instance directly with the adapter
export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Nodemailer({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],

	pages: {
		signIn: '/login',
		signOut: '/logout',
		error: '/error',
		verifyRequest: '/verify',
	},
});
