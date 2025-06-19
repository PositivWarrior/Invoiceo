import { onboardingSchema, invoiceSchema } from '../app/utils/zodSchemas';

describe('onboardingSchema', () => {
	it('validates correct onboarding data', () => {
		const validData = {
			firstName: 'John',
			lastName: 'Doe',
			address: '123 Main Street',
		};

		const result = onboardingSchema.safeParse(validData);
		expect(result.success).toBe(true);
	});

	it('rejects invalid firstName', () => {
		const invalidData = {
			firstName: 'J', // Too short
			lastName: 'Doe',
			address: '123 Main Street',
		};

		const result = onboardingSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.errors[0].message).toBe(
				'First name is required',
			);
		}
	});

	it('rejects missing lastName', () => {
		const invalidData = {
			firstName: 'John',
			// lastName missing
			address: '123 Main Street',
		};

		const result = onboardingSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
	});
});

describe('invoiceSchema', () => {
	const validInvoiceData = {
		invoiceName: 'Test Invoice',
		total: 100,
		status: 'PENDING' as const,
		date: '2024-01-01',
		dueDate: 30,
		fromName: 'John Doe',
		fromEmail: 'john@example.com',
		fromAddress: '123 Sender St',
		clientName: 'Jane Client',
		clientEmail: 'jane@client.com',
		clientAddress: '456 Client Ave',
		currency: 'USD',
		invoiceNumber: 1,
		note: 'Test note',
		invoiceItemDescription: 'Test item',
		invoiceItemQuantity: 1,
		invoiceItemRate: 100,
	};

	it('validates correct invoice data', () => {
		const result = invoiceSchema.safeParse(validInvoiceData);
		expect(result.success).toBe(true);
	});

	it('rejects invalid email addresses', () => {
		const invalidData = {
			...validInvoiceData,
			fromEmail: 'invalid-email',
		};

		const result = invoiceSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.errors[0].message).toBe(
				'Invalid email address',
			);
		}
	});

	it('rejects negative total', () => {
		const invalidData = {
			...validInvoiceData,
			total: 0, // Below minimum
		};

		const result = invoiceSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.errors[0].message).toBe('$1 is minimum');
		}
	});

	it('validates optional note field', () => {
		const { note, ...dataWithoutNote } = validInvoiceData;

		const result = invoiceSchema.safeParse(dataWithoutNote);
		expect(result.success).toBe(true);
	});

	it('defaults status to PENDING', () => {
		const { status, ...dataWithoutStatus } = validInvoiceData;

		const result = invoiceSchema.safeParse(dataWithoutStatus);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.status).toBe('PENDING');
		}
	});
});
