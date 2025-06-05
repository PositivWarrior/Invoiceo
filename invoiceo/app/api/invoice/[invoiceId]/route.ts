import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { formatCurrency } from '@/app/utils/formatCurrency';

export async function GET(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ invoiceId: string }>;
	},
) {
	const { invoiceId } = await params;

	const data = await prisma.invoice.findUnique({
		where: {
			id: invoiceId,
		},
		select: {
			invoiceName: true,
			invoiceNumber: true,
			currency: true,
			fromName: true,
			fromEmail: true,
			fromAddress: true,
			clientName: true,
			clientEmail: true,
			clientAddress: true,
			date: true,
			dueDate: true,
			invoiceItemDescription: true,
			invoiceItemQuantity: true,
			invoiceItemRate: true,
			total: true,
			note: true,
		},
	});

	if (!data) {
		return NextResponse.json(
			{
				error: 'Invoice not found',
			},
			{ status: 404 },
		);
	}

	const pdf = new jsPDF({
		orientation: 'portrait',
		unit: 'mm',
		format: 'a4',
	});

	// Font
	pdf.setFont('helvetica');

	// Header
	pdf.setFontSize(24);
	pdf.text(data.invoiceName, 20, 20);

	// From Section
	pdf.setFontSize(12);
	pdf.text('From', 20, 40);
	pdf.setFontSize(10);
	pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);

	// Client Section
	pdf.setFontSize(12);
	pdf.text('Bill to', 20, 70);
	pdf.setFontSize(10);
	pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75);

	// Invoice details
	pdf.setFontSize(10);
	pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40);
	pdf.text(
		`Date: ${new Intl.DateTimeFormat('en-GB', {
			dateStyle: 'long',
		}).format(data.date)}`,
		120,
		45,
	);
	pdf.text(`Due Date: ${data.dueDate} days`, 120, 50);

	// Item table header
	pdf.setFontSize(10);
	pdf.setFont('helvetica', 'bold');
	pdf.text('Description', 20, 100);
	pdf.text('Quantity', 100, 100);
	pdf.text('Rate', 130, 100);
	pdf.text('Total', 160, 100);

	// Draw line
	pdf.line(20, 102, 190, 102);

	// Item details
	pdf.setFont('helvetica', 'normal');
	pdf.text(data.invoiceItemDescription, 20, 110);
	pdf.text(data.invoiceItemQuantity.toString(), 100, 110);
	pdf.text(
		formatCurrency({
			amount: data.invoiceItemRate,
			currency: data.currency as any,
		}),
		130,
		110,
	);
	pdf.text(
		formatCurrency({ amount: data.total, currency: data.currency as any }),
		160,
		110,
	);

	// Total section
	pdf.line(20, 115, 190, 115);
	pdf.setFont('helvetica', 'bold');
	pdf.text(
		`Total: ${formatCurrency({
			amount: data.total,
			currency: data.currency as any,
		})}`,
		160,
		130,
	);

	// Additional notes
	if (data.note) {
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(10);
		pdf.text('Notes:', 20, 150);
		pdf.text(data.note, 20, 160);
	}

	// Footer
	const pageHeight = pdf.internal.pageSize.getHeight();
	const footerYPosition = pageHeight - 17; // Approx 17mm from bottom
	pdf.setFont('helvetica', 'normal');
	pdf.setFontSize(10);
	pdf.text(
		`${data.fromName} | Invoice #${data.invoiceNumber} | Thank you for your business!`,
		20,
		footerYPosition,
	);

	// Save the PDF

	// Generate PDF as buffer
	const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

	// Return PDS as download
	return new Response(pdfBuffer, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline',
		},
	});
}
