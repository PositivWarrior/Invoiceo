import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/hooks';
import { emailClient } from '@/app/utils/mailtrap';
import { NextResponse } from 'next/server';

export async function POST(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ invoiceId: string }>;
	},
) {
	try {
		const session = await requireUser();

		const { invoiceId } = await params;

		const invoiceData = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
				userId: session.user?.id,
			},
		});

		if (!invoiceData) {
			return NextResponse.json(
				{ error: 'Invoice not found' },
				{ status: 404 },
			);
		}

		const sender = {
			email: 'contact@kacpermargol.eu',
			name: 'Kacper Margol',
		};

		emailClient.send({
			from: sender,
			to: [{ email: invoiceData.clientEmail }],

			template_uuid: '708d9a25-9c60-42c6-9b05-d62eb77dcf36',
			template_variables: {
				first_name: invoiceData.clientName,
				company_info_name: 'MNova',
				company_info_address: 'Nesveien 58',
				company_info_city: 'Moss',
				company_info_zip_code: '1513',
				company_info_country: 'Norway',
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to send email reminder' },
			{ status: 500 },
		);
	}
}
