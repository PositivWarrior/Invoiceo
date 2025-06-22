'use client';

import { createInvoice } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Send } from 'lucide-react';
import { useActionState, useState, useEffect, useCallback } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

interface CreateInvoiceProps {
	firstName: string;
	lastName: string;
	address: string;
	email: string;
	nextInvoiceNumber: number;
}

export function CreateInvoice({
	firstName,
	lastName,
	address,
	email,
	nextInvoiceNumber,
}: CreateInvoiceProps) {
	const [state, action] = useActionState(createInvoice, undefined);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [rate, setRate] = useState('');
	const [quantity, setQuantity] = useState('');
	const [currency, setCurrency] = useState('NOK');
	const [taxRate, setTaxRate] = useState(25); // Default MVA for Norway

	const calculateSubtotal = useCallback(() => {
		return (Number(quantity) || 0) * (Number(rate) || 0);
	}, [quantity, rate]);

	const calculateTaxAmount = useCallback(() => {
		return (calculateSubtotal() * taxRate) / 100;
	}, [calculateSubtotal, taxRate]);

	const calculateTotal = useCallback(() => {
		return calculateSubtotal() + calculateTaxAmount();
	}, [calculateSubtotal, calculateTaxAmount]);

	// Get default tax rate based on currency
	useEffect(() => {
		if (currency === 'NOK') {
			setTaxRate(25); // Norwegian MVA
		} else {
			setTaxRate(0); // No default tax for other currencies
		}
	}, [currency]);

	const subtotal = calculateSubtotal();
	const taxAmount = calculateTaxAmount();
	const total = calculateTotal();

	return (
		<Card className="w-full max-w-4xl mx-auto gradient-card">
			<CardContent className="p-6">
				<form action={action}>
					<input
						type="hidden"
						name="date"
						value={selectedDate.toISOString()}
					/>
					<input
						type="hidden"
						name="total"
						value={Math.round(total)}
					/>
					<input
						type="hidden"
						name="subtotal"
						value={Math.round(subtotal)}
					/>
					<input
						type="hidden"
						name="taxAmount"
						value={Math.round(taxAmount)}
					/>
					<input type="hidden" name="taxRate" value={taxRate} />
					<input
						type="hidden"
						name="invoiceNumber"
						value={nextInvoiceNumber}
					/>

					<div className="flex flex-col gap-1 w-fit mb-6">
						<div className="flex items-center gap-4">
							<Badge
								variant="secondary"
								className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
							>
								New Invoice
							</Badge>
							<Input
								placeholder="Invoice Name"
								name="invoiceName"
								className="text-2xl font-semibold border-primary/20 focus:border-primary"
							/>
						</div>
						<span className="text-sm text-muted-foreground">
							Invoice #{nextInvoiceNumber}
						</span>
						{state?.errors?.invoiceName && (
							<p className="text-red-500 text-sm">
								{state.errors.invoiceName}
							</p>
						)}
					</div>

					<div className="grid md:grid-cols-3 gap-6 mb-6">
						<div>
							<Label className="text-primary font-medium">
								Invoice No.
							</Label>
							<div className="flex">
								<span className="px-3 border border-r-0 rounded-l-md flex items-center bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 font-semibold text-primary">
									#
								</span>
								<Input
									className="rounded-l-none border-primary/20 focus:border-primary"
									value={nextInvoiceNumber}
									disabled
									type="number"
								/>
							</div>
						</div>

						<div>
							<Label className="text-primary font-medium">
								Currency
							</Label>
							<Select
								defaultValue="NOK"
								name="currency"
								onValueChange={(value) => setCurrency(value)}
							>
								<SelectTrigger className="border-primary/20 focus:border-primary">
									<SelectValue placeholder="Select a currency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="NOK">🇳🇴 NOK</SelectItem>
									<SelectItem value="EUR">🇪🇺 EUR</SelectItem>
									<SelectItem value="USD">🇺🇸 USD</SelectItem>
								</SelectContent>
							</Select>
							{state?.errors?.currency && (
								<p className="text-red-500 text-sm">
									{state.errors.currency}
								</p>
							)}
						</div>

						<div>
							<Label className="text-primary font-medium">
								Tax Rate {currency === 'NOK' ? '(MVA)' : ''}
							</Label>
							<div className="flex">
								<Input
									type="number"
									placeholder="25"
									value={taxRate}
									onChange={(e) =>
										setTaxRate(Number(e.target.value))
									}
									className="border-primary/20 focus:border-primary"
									min="0"
									max="100"
									step="0.1"
								/>
								<span className="px-3 border border-l-0 rounded-r-md flex items-center bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 font-semibold text-primary">
									%
								</span>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div>
							<Label className="text-primary font-medium">
								From
							</Label>
							<div className="space-y-2">
								<Input
									placeholder="Your Name"
									name="fromName"
									defaultValue={`${firstName} ${lastName}`}
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.fromName && (
									<p className="text-red-500 text-sm">
										{state.errors.fromName}
									</p>
								)}
								<Input
									placeholder="Your Email"
									name="fromEmail"
									defaultValue={email}
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.fromEmail && (
									<p className="text-red-500 text-sm">
										{state.errors.fromEmail}
									</p>
								)}
								<Input
									placeholder="Your Address"
									name="fromAddress"
									defaultValue={address}
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.fromAddress && (
									<p className="text-red-500 text-sm">
										{state.errors.fromAddress}
									</p>
								)}
							</div>
						</div>

						<div>
							<Label className="text-primary font-medium">
								To
							</Label>
							<div className="space-y-2">
								<Input
									placeholder="Client Name"
									name="clientName"
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.clientName && (
									<p className="text-red-500 text-sm">
										{state.errors.clientName}
									</p>
								)}
								<Input
									placeholder="Client Email"
									name="clientEmail"
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.clientEmail && (
									<p className="text-red-500 text-sm">
										{state.errors.clientEmail}
									</p>
								)}
								<Input
									placeholder="Client Address"
									name="clientAddress"
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.clientAddress && (
									<p className="text-red-500 text-sm">
										{state.errors.clientAddress}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div>
							<Label className="text-primary font-medium">
								Invoice Date
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full border-primary/20 hover:border-primary"
									>
										<CalendarIcon />
										{selectedDate ? (
											new Intl.DateTimeFormat('en-US', {
												dateStyle: 'long',
											}).format(selectedDate)
										) : (
											<p>Select date</p>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<Calendar
										mode="single"
										selected={selectedDate}
										onSelect={(date) =>
											setSelectedDate(date || new Date())
										}
										fromDate={new Date()}
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div>
							<Label className="text-primary font-medium">
								Due Date
							</Label>
							<Select name="dueDate">
								<SelectTrigger className="w-full border-primary/20 focus:border-primary">
									<SelectValue placeholder="Select a due date" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="0">
										Due on Receipt
									</SelectItem>
									<SelectItem value="15">2 weeks</SelectItem>
									<SelectItem value="30">
										One month
									</SelectItem>
								</SelectContent>
							</Select>
							{state?.errors?.dueDate && (
								<p className="text-red-500 text-sm">
									{state.errors.dueDate}
								</p>
							)}
						</div>
					</div>

					<div>
						<div className="grid grid-cols-12 gap-4 mb-2 font-medium text-primary">
							<p className="col-span-6">Description</p>
							<p className="col-span-2">Quantity</p>
							<p className="col-span-2">Rate</p>
							<p className="col-span-2">Amount</p>
						</div>

						<div className="grid grid-cols-12 gap-4 mb-4">
							<div className="col-span-6">
								<Textarea
									placeholder="Item name & description"
									name="invoiceItemDescription"
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.invoiceItemDescription && (
									<p className="text-red-500 text-sm mt-1">
										{state.errors.invoiceItemDescription}
									</p>
								)}
							</div>
							<div className="col-span-2">
								<Input
									type="number"
									placeholder="0"
									name="invoiceItemQuantity"
									value={quantity}
									onChange={(e) =>
										setQuantity(e.target.value)
									}
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.invoiceItemQuantity && (
									<p className="text-red-500 text-sm mt-1">
										{state.errors.invoiceItemQuantity}
									</p>
								)}
							</div>
							<div className="col-span-2">
								<Input
									type="number"
									placeholder="0"
									name="invoiceItemRate"
									value={rate}
									onChange={(e) => setRate(e.target.value)}
									className="border-primary/20 focus:border-primary"
								/>
								{state?.errors?.invoiceItemRate && (
									<p className="text-red-500 text-sm mt-1">
										{state.errors.invoiceItemRate}
									</p>
								)}
							</div>
							<div className="col-span-2">
								<Input
									disabled
									value={formatCurrency({
										amount: subtotal,
										currency: currency as
											| 'NOK'
											| 'USD'
											| 'EUR',
									})}
									className="bg-gradient-to-r from-primary/5 to-accent/5 font-semibold"
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<div className="w-1/3 space-y-2">
							<div className="flex justify-between py-2 text-muted-foreground">
								<span>Subtotal</span>
								<span>
									{formatCurrency({
										amount: subtotal,
										currency: currency as
											| 'NOK'
											| 'USD'
											| 'EUR',
									})}
								</span>
							</div>
							{taxRate > 0 && (
								<div className="flex justify-between py-2 text-muted-foreground">
									<span>
										{currency === 'NOK' ? 'MVA' : 'Tax'} (
										{taxRate}%)
									</span>
									<span>
										{formatCurrency({
											amount: taxAmount,
											currency: currency as
												| 'NOK'
												| 'USD'
												| 'EUR',
										})}
									</span>
								</div>
							)}
							<div className="flex justify-between py-2 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 px-2 rounded">
								<span className="font-semibold text-primary">
									Total ({currency.toUpperCase()})
								</span>
								<span className="font-bold text-primary underline underline-offset-2">
									{formatCurrency({
										amount: total,
										currency: currency as
											| 'NOK'
											| 'USD'
											| 'EUR',
									})}
								</span>
							</div>
						</div>
					</div>

					<div className="mt-6">
						<Label className="text-primary font-medium">
							Notes
						</Label>
						<Textarea
							placeholder="Add your note's right here..."
							name="note"
							className="border-primary/20 focus:border-primary"
						/>
						{state?.errors?.note && (
							<p className="text-red-500 text-sm">
								{state.errors.note}
							</p>
						)}
					</div>

					<div className="flex items-center justify-end gap-4 mt-6">
						<Button
							type="submit"
							className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
						>
							<Send className="mr-2 size-4" />
							Send Invoice
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
