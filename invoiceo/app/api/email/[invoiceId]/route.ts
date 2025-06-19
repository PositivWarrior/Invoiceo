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

		// Fetch the current user's data for dynamic email footer
		const userData = await prisma.user.findUnique({
			where: {
				id: session.user?.id,
			},
			select: {
				firstName: true,
				lastName: true,
				email: true,
				address: true,
			},
		});

		if (!userData) {
			return NextResponse.json(
				{ error: 'User data not found' },
				{ status: 404 },
			);
		}

		// Create dynamic sender information based on current user
		const userFullName =
			userData.firstName && userData.lastName
				? `${userData.firstName} ${userData.lastName}`
				: userData.firstName || userData.lastName || 'User';

		const sender = {
			email: 'contact@kacpermargol.eu', // Keep verified sender email for Mailtrap
			name: userFullName, // Use dynamic user name
		};

		// Parse user address for dynamic company info
		const addressParts = userData.address
			? userData.address.split(',').map((part) => part.trim())
			: [];
		const [street, city, zipCode, country] = addressParts;

		emailClient.send({
			from: sender,
			to: [{ email: invoiceData.clientEmail }],

			template_uuid: '708d9a25-9c60-42c6-9b05-d62eb77dcf36',
			template_variables: {
				first_name: invoiceData.clientName,
				company_info_name: userFullName,
				company_info_address: street || 'Address not provided',
				company_info_city: city || 'City not provided',
				company_info_zip_code: zipCode || 'Zip not provided',
				company_info_country: country || 'Country not provided',
			},
		});

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json(
			{ error: 'Failed to send email reminder' },
			{ status: 500 },
		);
	}
}
