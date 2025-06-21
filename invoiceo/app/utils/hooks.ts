import { redirect } from 'next/navigation';
import { auth } from './auth';
import prisma from './db';

export async function requireUser() {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return session;
}

export async function getNextInvoiceNumber(userId: string): Promise<number> {
	const lastInvoice = await prisma.invoice.findFirst({
		where: {
			userId: userId,
		},
		orderBy: {
			invoiceNumber: 'desc',
		},
		select: {
			invoiceNumber: true,
		},
	});

	return lastInvoice ? lastInvoice.invoiceNumber + 1 : 1;
}
