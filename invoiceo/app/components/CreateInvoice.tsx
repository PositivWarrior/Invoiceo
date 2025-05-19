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
import { useState } from 'react';

export function CreateInvoice() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardContent className="p-6">
				<div className="flex flex-col gap-1 w-fit mb-6">
					<div className="flex items-center gap-4">
						<Badge variant="secondary">Draft</Badge>
						<Input placeholder="Invoice Number" />
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-6 mb-6">
					<div>
						<Label>Invoice No.</Label>
						<div className="flex">
							<span className="px-3 border border-r-0 rounded-l-md items-center bg-muted ">
								#
							</span>
							<Input className="rounded-l-none" placeholder="5" />
						</div>
					</div>

					<div>
						<Label>Currency</Label>
						<Select defaultValue="nok">
							<SelectTrigger>
								<SelectValue placeholder="Select a currency" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="nok">NOK</SelectItem>
								<SelectItem value="eur">EUR</SelectItem>
								<SelectItem value="usd">USD</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6 mb-6">
					<div>
						<Label>From</Label>
						<div className="space-y-2">
							<Input placeholder="Your Name" />
							<Input placeholder="Your Email" />
							<Input placeholder="Your Address" />
						</div>
					</div>

					<div>
						<Label>To</Label>
						<div className="space-y-2">
							<Input placeholder="Client Name" />
							<Input placeholder="Client Email" />
							<Input placeholder="Client Address" />
						</div>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<div>
							<Label>Invoice Date</Label>
						</div>
						<Popover>
							<PopoverTrigger asChild>
								<Button variant="outline" className="w-full">
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
						<Label>Due Date</Label>
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a due date" />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="0">
									Due on Receipt
								</SelectItem>
								<SelectItem value="14">2 weeks</SelectItem>
								<SelectItem value="30">One month</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
