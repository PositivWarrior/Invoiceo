import { formatCurrency } from '../app/utils/formatCurrency';

describe('formatCurrency', () => {
	it('formats USD currency correctly', () => {
		expect(formatCurrency({ amount: 1000, currency: 'USD' })).toBe(
			'$1,000.00',
		);
	});

	it('formats EUR currency correctly', () => {
		expect(formatCurrency({ amount: 1000, currency: 'EUR' })).toBe(
			'€1,000.00',
		);
	});

	it('handles zero correctly', () => {
		expect(formatCurrency({ amount: 0, currency: 'USD' })).toBe('$0.00');
	});

	it('handles negative numbers correctly', () => {
		expect(formatCurrency({ amount: -500, currency: 'USD' })).toBe(
			'-$500.00',
		);
	});
});
