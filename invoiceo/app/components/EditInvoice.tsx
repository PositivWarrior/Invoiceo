'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { SubmitButton } from './SubmitButtons';
import { useActionState, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema } from '../utils/zodSchemas';
import { createInvoice, editInvoice } from '../actions';
import { formatCurrency } from '../utils/formatCurrency';
import { Prisma } from '@prisma/client';

interface EditInvoiceProps {
	data: Prisma.InvoiceGetPayload<{}>;
}

export function EditInvoice({ data }: EditInvoiceProps) {
	const [lastResult, action] = useActionState(editInvoice, undefined);
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

	const [selectedDate, setSelectedDate] = useState(data.date);
	const [rate, setRate] = useState(data.invoiceItemRate.toString());
	const [quantity, setQuantity] = useState(
		data.invoiceItemQuantity.toString(),
	);
	const [currency, setCurrency] = useState(data.currency);

	const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardContent className="p-6">
				<form
					action={action}
					id={form.id}
					onSubmit={form.onSubmit}
					noValidate
				>
					<input type="hidden" name="id" value={data.id} />

					<input
						type="hidden"
						name={fields.date.name}
						value={selectedDate.toISOString()}
					/>

					<input
						type="hidden"
						name={fields.total.name}
						value={calculateTotal}
					/>

					<div className="flex flex-col gap-1 w-fit mb-6">
						<div className="flex items-center gap-4">
							<Badge variant="secondary">Draft</Badge>
							<Input
								placeholder="Invoice Name"
								name={fields.invoiceName.name}
								key={fields.invoiceName.key}
								defaultValue={data.invoiceName}
							/>
						</div>
						<p className="text-red-500 text-sm">
							{fields.invoiceName.errors}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6 mb-6">
						<div>
							<Label>Invoice No.</Label>
							<div className="flex">
								<span className="px-3 border border-r-0 rounded-l-md flex items-center bg-muted ">
									#
								</span>
								<Input
									className="rounded-l-none"
									placeholder="5"
									name={fields.invoiceNumber.name}
									key={fields.invoiceNumber.key}
									defaultValue={data.invoiceNumber}
								/>
							</div>
							<p className="text-red-500 text-sm">
								{fields.invoiceNumber.errors}
							</p>
						</div>

						<div>
							<Label>Currency</Label>
							<Select
								defaultValue="nok"
								name={fields.currency.name}
								key={fields.currency.key}
								onValueChange={(value) => setCurrency(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a currency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="nok">NOK</SelectItem>
									<SelectItem value="eur">EUR</SelectItem>
									<SelectItem value="usd">USD</SelectItem>
								</SelectContent>
							</Select>
							<p className="text-red-500 text-sm">
								{fields.currency.errors}
							</p>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<div>
							<Label>From</Label>
							<div className="space-y-2">
								<Input
									placeholder="Your Name"
									name={fields.fromName.name}
									key={fields.fromName.key}
									defaultValue={data.fromName}
								/>
								<p className="text-red-500 text-sm">
									{fields.fromName.errors}
								</p>
								<Input
									placeholder="Your Email"
									name={fields.fromEmail.name}
									key={fields.fromEmail.key}
									defaultValue={data.fromEmail}
								/>
								<p className="text-red-500 text-sm">
									{fields.fromEmail.errors}
								</p>
								<Input
									placeholder="Your Address"
									name={fields.fromAddress.name}
									key={fields.fromAddress.key}
									defaultValue={data.fromAddress}
								/>
								<p className="text-red-500 text-sm">
									{fields.fromAddress.errors}
								</p>
							</div>
						</div>

						<div>
							<Label>To</Label>
							<div className="space-y-2">
								<Input
									placeholder="Client Name"
									name={fields.clientName.name}
									key={fields.clientName.key}
									defaultValue={data.clientName}
								/>
								<p className="text-red-500 text-sm">
									{fields.clientName.errors}
								</p>
								<Input
									placeholder="Client Email"
									name={fields.clientEmail.name}
									key={fields.clientEmail.key}
									defaultValue={data.clientEmail}
								/>
								<p className="text-red-500 text-sm">
									{fields.clientEmail.errors}
								</p>
								<Input
									placeholder="Client Address"
									name={fields.clientAddress.name}
									key={fields.clientAddress.key}
									defaultValue={data.clientAddress}
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
								<Label>Invoice Date</Label>
							</div>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full"
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
							<Label>Due Date</Label>
							<Select
								name={fields.dueDate.name}
								key={fields.dueDate.key}
								defaultValue={data.dueDate.toString()}
							>
								<SelectTrigger className="w-full">
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
						<div className="grid grid-cols-12 gap-4 mb-2 font-medium">
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
									defaultValue={data.invoiceItemDescription}
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
								/>
								<p className="text-red-500 text-sm">
									{fields.invoiceItemRate.errors}
								</p>
							</div>
							<div className="col-span-2">
								<Input
									disabled
									value={formatCurrency({
										amount: calculateTotal,
										currency: currency as any,
									})}
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<div className="w-1/3">
							<div className="flex justify-between py-2">
								<span>Subtotal</span>
								<span>
									{formatCurrency({
										amount: calculateTotal,
										currency: currency as any,
									})}
								</span>
							</div>
							<div className="flex justify-between py-2 border-t">
								<span>Total ({currency.toUpperCase()})</span>
								<span className="font-medium underline underline-offset-2">
									{formatCurrency({
										amount: calculateTotal,
										currency: currency as any,
									})}
								</span>
							</div>
						</div>
					</div>

					<div>
						<Label>Notes</Label>
						<Textarea
							placeholder="Add your note's right here..."
							name={fields.note.name}
							key={fields.note.key}
							defaultValue={data.note ?? undefined}
						/>
						<p className="text-red-500 text-sm">
							{fields.note.errors}
						</p>
					</div>

					<div className="flex items-center justify-end mt-6">
						<div>
							<SubmitButton text="Update Invoice" />
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
