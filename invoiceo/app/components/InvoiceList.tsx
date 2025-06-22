import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { InvoiceActions } from './InvoiceActions';
import prisma from '../utils/db';
import { requireUser } from '../utils/hooks';
import { formatCurrency } from '../utils/formatCurrency';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from './EmptyState';

async function getData(userId: string) {
	const data = await prisma.invoice.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			clientName: true,
			total: true,
			createdAt: true,
			status: true,
			invoiceNumber: true,
			currency: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return data;
}

export async function InvoiceList() {
	const session = await requireUser();
	const data = await getData(session.user?.id as string);

	return (
		<>
			{data.length === 0 ? (
				<EmptyState
					title="No invoices found"
					description="Create an invoice to get started"
					buttonText="Create Invoice"
					href="/dashboard/invoices/create"
				/>
			) : (
				<div className="rounded-lg border border-primary/20 bg-gradient-to-br from-card to-accent/5 shadow-lg overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20">
								<TableHead className="font-semibold text-primary">
									Invoice ID
								</TableHead>
								<TableHead className="font-semibold text-primary">
									Customer
								</TableHead>
								<TableHead className="font-semibold text-primary">
									Amount
								</TableHead>
								<TableHead className="font-semibold text-primary">
									Status
								</TableHead>
								<TableHead className="font-semibold text-primary">
									Date
								</TableHead>
								<TableHead className="text-right font-semibold text-primary">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((invoice, index) => (
								<TableRow
									key={invoice.id}
									className={`hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-200 ${
										index % 2 === 0
											? 'bg-white/50'
											: 'bg-accent/5'
									}`}
								>
									<TableCell className="font-medium text-primary">
										#{invoice.invoiceNumber}
									</TableCell>
									<TableCell className="font-medium">
										{invoice.clientName}
									</TableCell>
									<TableCell className="font-semibold text-emerald-600">
										{formatCurrency({
											amount: invoice.total,
											currency: invoice.currency as
												| 'NOK'
												| 'USD'
												| 'EUR',
										})}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												invoice.status === 'PAID'
													? 'default'
													: 'secondary'
											}
											className={`
												font-medium shadow-sm
												${
													invoice.status === 'PAID'
														? 'bg-gradient-to-r from-success to-success/80 text-white hover:from-success/90 hover:to-success/70'
														: 'bg-gradient-to-r from-warning to-warning/80 text-white hover:from-warning/90 hover:to-warning/70'
												}
											`}
										>
											{invoice.status}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{new Intl.DateTimeFormat('en-GB', {
											dateStyle: 'medium',
										}).format(new Date(invoice.createdAt))}
									</TableCell>
									<TableCell className="text-right">
										<InvoiceActions
											id={invoice.id}
											status={invoice.status}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</>
	);
}
