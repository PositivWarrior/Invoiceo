'use server';

import { requireUser } from './utils/hooks';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema, onboardingSchema } from './utils/zodSchemas';
import prisma from './utils/db';
import { redirect } from 'next/navigation';
import { emailClient } from './utils/mailtrap';
import { formatCurrency } from './utils/formatCurrency';

export async function onboardUser(previousState: unknown, formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: onboardingSchema,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	await prisma.user.update({
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

export async function createInvoice(prevState: unknown, formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: invoiceSchema,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	await prisma.invoice.create({
		data: {
			invoiceNumber: submission.value.invoiceNumber,
			invoiceName: submission.value.invoiceName,
			total: submission.value.total,
			status: 'PENDING',
			date: submission.value.date,
			dueDate: submission.value.dueDate,
			fromName: submission.value.fromName,
			fromEmail: submission.value.fromEmail,
			fromAddress: submission.value.fromAddress,
			clientName: submission.value.clientName,
			clientEmail: submission.value.clientEmail,
			clientAddress: submission.value.clientAddress,
			currency: submission.value.currency,
			invoiceItemDescription: submission.value.invoiceItemDescription,
			invoiceItemQuantity: submission.value.invoiceItemQuantity,
			invoiceItemRate: submission.value.invoiceItemRate,
			note: submission.value.note,
			// Commented out temporarily due to Prisma client regeneration issues
			// taxRate: submission.value.taxRate ?? 0,
			// taxAmount: submission.value.taxAmount ?? 0,
			// subtotal: submission.value.subtotal ?? submission.value.total,
			userId: session.user?.id,
		},
	});

	// Send email immediately
	const sender = {
		email: 'hello@demomailtrap.com',
		name: 'Jan Kowalski',
	};

	emailClient.send({
		from: sender,
		to: [{ email: 'jan@acompany.com' }],
		template_uuid: 'c9c5e343-9a14-4e8b-a3ab-77b9f4ebe35d',
		template_variables: {
			first_name: submission.value.clientName,
			company_info_name: submission.value.fromName,
			company_info_address: submission.value.fromAddress,
			company_info_city: 'Berlin',
			company_info_zip_code: '10115',
			company_info_country: 'Germany',
			invoice_number: submission.value.invoiceNumber,
			invoice_date: new Date(submission.value.date).toLocaleDateString(
				'en-US',
				{
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				},
			),
			invoice_due_date: new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}).format(
				new Date(
					Date.now() + submission.value.dueDate * 24 * 60 * 60 * 1000,
				),
			),
			invoice_total: formatCurrency({
				amount: submission.value.total,
				currency: submission.value.currency as 'NOK' | 'USD' | 'EUR',
			}),
			client_name: submission.value.clientName,
			client_address: submission.value.clientAddress,
			client_city: 'Berlin',
			client_zip_code: '10115',
			client_country: 'Germany',
			invoice_item_description: submission.value.invoiceItemDescription,
			invoice_item_quantity: submission.value.invoiceItemQuantity,
			invoice_item_rate: formatCurrency({
				amount: submission.value.invoiceItemRate,
				currency: submission.value.currency as 'NOK' | 'USD' | 'EUR',
			}),
			invoice_note: submission.value.note ?? '',
		},
	});

	return redirect('/dashboard/invoices');
}

export async function editInvoice(previousState: unknown, formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: invoiceSchema,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	await prisma.invoice.update({
		where: {
			id: formData.get('id') as string,
			userId: session.user?.id,
		},
		data: {
			invoiceNumber: submission.value.invoiceNumber,
			invoiceName: submission.value.invoiceName,
			total: submission.value.total,
			status: submission.value.status,
			date: submission.value.date,
			dueDate: submission.value.dueDate,
			fromName: submission.value.fromName,
			fromEmail: submission.value.fromEmail,
			fromAddress: submission.value.fromAddress,
			clientName: submission.value.clientName,
			clientEmail: submission.value.clientEmail,
			clientAddress: submission.value.clientAddress,
			currency: submission.value.currency,
			invoiceItemDescription: submission.value.invoiceItemDescription,
			invoiceItemQuantity: submission.value.invoiceItemQuantity,
			invoiceItemRate: submission.value.invoiceItemRate,
			note: submission.value.note,
		},
	});

	return redirect('/dashboard/invoices');
}

export async function deleteInvoice(invoiceId: string) {
	const session = await requireUser();

	await prisma.invoice.delete({
		where: {
			id: invoiceId,
			userId: session.user?.id,
		},
	});

	return redirect('/dashboard/invoices');
}

export async function markAsPaidAction(invoiceId: string) {
	const session = await requireUser();

	await prisma.invoice.update({
		where: {
			id: invoiceId,
			userId: session.user?.id,
		},
		data: {
			status: 'PAID',
		},
	});

	return redirect('/dashboard/invoices');
}

// New function to get the next available invoice number
export async function getNextInvoiceNumber(): Promise<number> {
	const session = await requireUser();

	const lastInvoice = await prisma.invoice.findFirst({
		where: {
			userId: session.user?.id,
		},
		orderBy: {
			invoiceNumber: 'desc',
		},
		select: {
			invoiceNumber: true,
		},
	});

	return (lastInvoice?.invoiceNumber ?? 0) + 1;
}
