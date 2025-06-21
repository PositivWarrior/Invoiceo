'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { useActionState, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from './SubmitButtons';
import { createInvoice } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema } from '../utils/zodSchemas';
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
	const [lastResult, action] = useActionState(createInvoice, undefined);
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: invoiceSchema,
			});
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	});

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [rate, setRate] = useState('');
	const [quantity, setQuantity] = useState('');
	const [currency, setCurrency] = useState('NOK');
	const [taxRate, setTaxRate] = useState(25); // Default MVA for Norway
	const [invoiceNumber, setInvoiceNumber] = useState(nextInvoiceNumber);

	const calculateSubtotal = (Number(quantity) || 0) * (Number(rate) || 0);
	const calculateTaxAmount = (calculateSubtotal * taxRate) / 100;
	const calculateTotal = calculateSubtotal + calculateTaxAmount;

	// Get default tax rate based on currency
	useEffect(() => {
		if (currency === 'NOK') {
			setTaxRate(25); // Norwegian MVA
		} else {
			setTaxRate(0); // No default tax for other currencies
		}
	}, [currency]);

	return (
		<Card className="w-full max-w-4xl mx-auto gradient-card">
			<CardContent className="p-6">
				<form
					action={action}
					id={form.id}
					onSubmit={form.onSubmit}
					noValidate
				>
					<input
						type="hidden"
						name={fields.date.name}
						value={selectedDate.toISOString()}
					/>

					<input
						type="hidden"
						name={fields.total.name}
						value={Math.round(calculateTotal)}
					/>

					<input
						type="hidden"
						name={fields.subtotal.name}
						value={Math.round(calculateSubtotal)}
					/>

					<input
						type="hidden"
						name={fields.taxAmount.name}
						value={Math.round(calculateTaxAmount)}
					/>

					<input
						type="hidden"
						name={fields.taxRate.name}
						value={taxRate}
					/>

					<div className="flex flex-col gap-1 w-fit mb-6">
						<div className="flex items-center gap-4">
							<Badge
								variant="secondary"
								className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
							>
								Draft
							</Badge>
							<Input
								placeholder="Invoice Name"
								name={fields.invoiceName.name}
								key={fields.invoiceName.key}
								defaultValue={fields.invoiceName.value}
								className="border-primary/20 focus:border-primary"
							/>
						</div>
						<p className="text-red-500 text-sm">
							{fields.invoiceName.errors}
						</p>
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
									value={invoiceNumber}
									onChange={(e) =>
										setInvoiceNumber(Number(e.target.value))
									}
									name={fields.invoiceNumber.name}
									key={fields.invoiceNumber.key}
									type="number"
								/>
							</div>
							<p className="text-red-500 text-sm">
								{fields.invoiceNumber.errors}
							</p>
						</div>

						<div>
							<Label className="text-primary font-medium">
								Currency
							</Label>
							<Select
								defaultValue="nok"
								name={fields.currency.name}
								key={fields.currency.key}
								onValueChange={(value) => setCurrency(value)}
							>
								<SelectTrigger className="border-primary/20 focus:border-primary">
									<SelectValue placeholder="Select a currency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="nok">🇳🇴 NOK</SelectItem>
									<SelectItem value="eur">🇪🇺 EUR</SelectItem>
									<SelectItem value="usd">🇺🇸 USD</SelectItem>
								</SelectContent>
							</Select>
							<p className="text-red-500 text-sm">
								{fields.currency.errors}
							</p>
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
									name={fields.fromName.name}
									key={fields.fromName.key}
									defaultValue={`${firstName} ${lastName}`}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.fromName.errors}
								</p>
								<Input
									placeholder="Your Email"
									name={fields.fromEmail.name}
									key={fields.fromEmail.key}
									defaultValue={email}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.fromEmail.errors}
								</p>
								<Input
									placeholder="Your Address"
									name={fields.fromAddress.name}
									key={fields.fromAddress.key}
									defaultValue={address}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.fromAddress.errors}
								</p>
							</div>
						</div>

						<div>
							<Label className="text-primary font-medium">
								To
							</Label>
							<div className="space-y-2">
								<Input
									placeholder="Client Name"
									name={fields.clientName.name}
									key={fields.clientName.key}
									defaultValue={
										fields.clientName.initialValue
									}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.clientName.errors}
								</p>
								<Input
									placeholder="Client Email"
									name={fields.clientEmail.name}
									key={fields.clientEmail.key}
									defaultValue={
										fields.clientEmail.initialValue
									}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.clientEmail.errors}
								</p>
								<Input
									placeholder="Client Address"
									name={fields.clientAddress.name}
									key={fields.clientAddress.key}
									defaultValue={
										fields.clientAddress.initialValue
									}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.clientAddress.errors}
								</p>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div>
							<div>
								<Label className="text-primary font-medium">
									Invoice Date
								</Label>
							</div>
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
							<p className="text-red-500 text-sm">
								{fields.date.errors}
							</p>
						</div>

						<div>
							<Label className="text-primary font-medium">
								Due Date
							</Label>
							<Select
								name={fields.dueDate.name}
								key={fields.dueDate.key}
								defaultValue={fields.dueDate.initialValue}
							>
								<SelectTrigger className="w-full border-primary/20 focus:border-primary">
									<SelectValue placeholder="Select a due date" />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="0">
										Due on Receipt
									</SelectItem>
									<SelectItem value="14">2 weeks</SelectItem>
									<SelectItem value="30">
										One month
									</SelectItem>
								</SelectContent>
							</Select>
							<p className="text-red-500 text-sm">
								{fields.dueDate.errors}
							</p>
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
									name={fields.invoiceItemDescription.name}
									key={fields.invoiceItemDescription.key}
									defaultValue={
										fields.invoiceItemDescription
											.initialValue
									}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.invoiceItemDescription.errors}
								</p>
							</div>
							<div className="col-span-2">
								<Input
									type="number"
									placeholder="0"
									name={fields.invoiceItemQuantity.name}
									key={fields.invoiceItemQuantity.key}
									value={quantity}
									onChange={(e) =>
										setQuantity(e.target.value)
									}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.invoiceItemQuantity.errors}
								</p>
							</div>
							<div className="col-span-2">
								<Input
									type="number"
									placeholder="0"
									name={fields.invoiceItemRate.name}
									key={fields.invoiceItemRate.key}
									value={rate}
									onChange={(e) => setRate(e.target.value)}
									className="border-primary/20 focus:border-primary"
								/>
								<p className="text-red-500 text-sm">
									{fields.invoiceItemRate.errors}
								</p>
							</div>
							<div className="col-span-2">
								<Input
									disabled
									value={formatCurrency({
										amount: calculateSubtotal,
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
										amount: calculateSubtotal,
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
											amount: calculateTaxAmount,
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
										amount: calculateTotal,
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
							name={fields.note.name}
							key={fields.note.key}
							defaultValue={fields.note.initialValue}
							className="border-primary/20 focus:border-primary"
						/>
						<p className="text-red-500 text-sm">
							{fields.note.errors}
						</p>
					</div>

					<div className="flex items-center justify-end mt-6">
						<div>
							<SubmitButton text="📧 Send Invoice to Client" />
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
