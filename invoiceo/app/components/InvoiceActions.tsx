'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	CheckCircle,
	DownloadCloud,
	Mail,
	MoreHorizontal,
	Pencil,
	Trash,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface InvoiceActionsProps {
	id: string;
}

export function InvoiceActions({ id }: InvoiceActionsProps) {
	const handleSendReminder = async () => {
		try {
			const response = await fetch(`/api/email/${id}`, {
				method: 'POST',
			});
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to send reminder');
			}

			toast.success('Reminder email sent successfully!');
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An unknown error occurred';
			toast.error(`Failed to send reminder: ${errorMessage}`);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="sm"
					variant="ghost"
					className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
				>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="gradient-border">
				<DropdownMenuItem asChild>
					<Link
						href={`/dashboard/invoices/${id}`}
						className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5"
					>
						<Pencil className="size-4 mr-2 text-primary" />
						Edit Invoice
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href={`/api/invoice/${id}`}
						target="_blank"
						className="hover:bg-gradient-to-r hover:from-success/5 hover:to-success/10"
					>
						<DownloadCloud className="size-4 mr-2 text-success" />
						Download Invoice
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={handleSendReminder}
					className="cursor-pointer hover:bg-gradient-to-r hover:from-info/5 hover:to-info/10"
				>
					<Mail className="size-4 mr-2 text-info" />
					Reminder Email
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href={`/dashboard/invoices/${id}/paid`}
						className="hover:bg-gradient-to-r hover:from-accent/5 hover:to-accent/10"
					>
						<CheckCircle className="size-4 mr-2 text-accent" />
						Mark as Paid
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href={`/dashboard/invoices/${id}/delete`}
						className="hover:bg-gradient-to-r hover:from-destructive/5 hover:to-destructive/10"
					>
						<Trash className="size-4 mr-2 text-destructive" />
						Delete Invoice
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
