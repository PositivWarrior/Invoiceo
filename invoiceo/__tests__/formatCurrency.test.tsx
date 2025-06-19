import { formatCurrency } from '../app/utils/formatCurrency';

describe('formatCurrency', () => {
	describe('USD Currency', () => {
		it('formats whole numbers correctly', () => {
			expect(formatCurrency({ amount: 1000, currency: 'USD' })).toBe(
				'$1,000.00',
			);
		});

		it('formats decimal numbers correctly', () => {
			expect(formatCurrency({ amount: 1234.56, currency: 'USD' })).toBe(
				'$1,234.56',
			);
		});

		it('handles zero correctly', () => {
			expect(formatCurrency({ amount: 0, currency: 'USD' })).toBe(
				'$0.00',
			);
		});

		it('handles negative numbers correctly', () => {
			expect(formatCurrency({ amount: -500.75, currency: 'USD' })).toBe(
				'-$500.75',
			);
		});

		it('handles large numbers with commas', () => {
			expect(
				formatCurrency({ amount: 1234567.89, currency: 'USD' }),
			).toBe('$1,234,567.89');
		});
	});

	describe('EUR Currency', () => {
		it('formats EUR currency correctly', () => {
			expect(formatCurrency({ amount: 1000, currency: 'EUR' })).toBe(
				'€1,000.00',
			);
		});

		it('handles decimals in EUR', () => {
			expect(formatCurrency({ amount: 999.99, currency: 'EUR' })).toBe(
				'€999.99',
			);
		});
	});

	describe('NOK Currency', () => {
		it('formats NOK currency correctly', () => {
			const result = formatCurrency({ amount: 1500, currency: 'NOK' });
			expect(result).toMatch(/NOK\s*1,500\.00/);
		});

		it('handles small amounts in NOK', () => {
			const result = formatCurrency({ amount: 50.25, currency: 'NOK' });
			expect(result).toMatch(/NOK\s*50\.25/);
		});
	});

	describe('Edge Cases', () => {
		it('handles very small positive numbers', () => {
			expect(formatCurrency({ amount: 0.01, currency: 'USD' })).toBe(
				'$0.01',
			);
		});

		it('handles very small negative numbers', () => {
			expect(formatCurrency({ amount: -0.01, currency: 'USD' })).toBe(
				'-$0.01',
			);
		});

		it('handles numbers with many decimal places (should round)', () => {
			expect(
				formatCurrency({ amount: 123.456789, currency: 'USD' }),
			).toBe('$123.46');
		});
	});
});
