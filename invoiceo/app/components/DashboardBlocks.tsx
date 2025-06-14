import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import prisma from '../utils/db';
import { requireUser } from '../utils/hooks';

async function getData(userId: string) {
	const [data, openInvoices, paidInvoices] = await Promise.all([
		prisma.invoice.findMany({
			where: {
				userId: userId,
			},
			select: {
				total: true,
			},
		}),

		prisma.invoice.findMany({
			where: {
				userId: userId,
				status: 'PENDING',
			},
			select: {
				id: true,
			},
		}),

		prisma.invoice.findMany({
			where: {
				userId: userId,
				status: 'PAID',
			},
			select: {
				id: true,
			},
		}),
	]);

	return { data, openInvoices, paidInvoices };
}

export async function DashboardBlocks() {
	const session = await requireUser();
	const { data, openInvoices, paidInvoices } = await getData(
		session.user?.id as string,
	);

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
			<Card className="flex flex-col gap-y-0">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium">
						Total Revenue
					</CardTitle>
					<DollarSign className="size-4 text-muted-foreground" />
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold">
						${' '}
						{data.reduce((acc, invoice) => acc + invoice.total, 0)}
					</h2>
					<p className="text-xs text-muted-foreground">
						Based on the last 30 days
					</p>
				</CardContent>
			</Card>

			<Card className="flex flex-col gap-y-0">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium">
						Total Invoices Issued
					</CardTitle>
					<Users className="size-4 text-muted-foreground" />
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold">+ {data.length}</h2>
					<p className="text-xs text-muted-foreground">
						Total invoices issued
					</p>
				</CardContent>
			</Card>

			<Card className="flex flex-col gap-y-0">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium">
						Paid Invoices
					</CardTitle>
					<CreditCard className="size-4 text-muted-foreground" />
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold">
						+ {paidInvoices.length}
					</h2>
					<p className="text-xs text-muted-foreground">
						Total invoices paid
					</p>
				</CardContent>
			</Card>

			<Card className="flex flex-col gap-y-0">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium">
						Open Invoices
					</CardTitle>
					<Activity className="size-4 text-muted-foreground" />
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold">
						+ {openInvoices.length}
					</h2>
					<p className="text-xs text-muted-foreground">
						Total open invoices
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
