'use server';

import { requireUser } from './utils/hooks';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema, onboardingSchema } from './utils/zodSchemas';
import prisma from './utils/db';
import { redirect } from 'next/navigation';

export async function onboardUser(previousState: any, formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: onboardingSchema,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const data = await prisma.user.update({
		where: {
			id: session.user?.id,
		},
		data: {
			firstName: submission.value.firstName,
			lastName: submission.value.lastName,
			address: submission.value.address,
		},
	});

	return redirect('/dashboard');
}

export async function createInvoice(previousState: any, formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: invoiceSchema,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const data = await prisma.invoice.create({
		data: {
			clientAddress: submission.value.clientAddress,
			clientEmail: submission.value.clientEmail,
			clientName: submission.value.clientName,
			currency: submission.value.currency,
			date: submission.value.date,
			dueDate: submission.value.dueDate,
			fromAddress: submission.value.fromAddress,
			fromEmail: submission.value.fromEmail,
			fromName: submission.value.fromName,
			invoiceName: submission.value.invoiceName,
			invoiceItemDescription: submission.value.invoiceItemDescription,
			invoiceItemQuantity: submission.value.invoiceItemQuantity,
			invoiceItemRate: submission.value.invoiceItemRate,
			invoiceNumber: submission.value.invoiceNumber,
			note: submission.value.note,
			status: submission.value.status,
			total: submission.value.total,
		},
	});
}
