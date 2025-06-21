import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import prisma from '../utils/db';
import { requireUser } from '../utils/hooks';
import { formatCurrency } from '../utils/formatCurrency';

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
			<Card className="flex flex-col gap-y-0 gradient-card bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200 dark:from-emerald-950 dark:to-green-900 dark:border-emerald-800 hover:shadow-lg transition-all duration-300">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
						Total Revenue
					</CardTitle>
					<div className="p-2 bg-emerald-500 rounded-full">
						<DollarSign className="size-4 text-white" />
					</div>
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
						{formatCurrency({
							amount: data.reduce(
								(acc: number, invoice: { total: number }) =>
									acc + invoice.total,
								0,
							),
							currency: 'USD',
						})}
					</h2>
					<p className="text-xs text-emerald-600 dark:text-emerald-400">
						Based on total volume
					</p>
				</CardContent>
			</Card>

			<Card className="flex flex-col gap-y-0 gradient-card bg-gradient-to-br from-blue-50 to-sky-100 border-sky-200 dark:from-blue-950 dark:to-sky-900 dark:border-sky-800 hover:shadow-lg transition-all duration-300">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium text-sky-800 dark:text-sky-200">
						Total Invoices Issued
					</CardTitle>
					<div className="p-2 bg-sky-500 rounded-full">
						<Users className="size-4 text-white" />
					</div>
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold text-sky-900 dark:text-sky-100">
						+ {data.length}
					</h2>
					<p className="text-xs text-sky-600 dark:text-sky-400">
						Total invoices issued
					</p>
				</CardContent>
			</Card>

			<Card className="flex flex-col gap-y-0 gradient-card bg-gradient-to-br from-purple-50 to-violet-100 border-violet-200 dark:from-purple-950 dark:to-violet-900 dark:border-violet-800 hover:shadow-lg transition-all duration-300">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium text-violet-800 dark:text-violet-200">
						Paid Invoices
					</CardTitle>
					<div className="p-2 bg-violet-500 rounded-full">
						<CreditCard className="size-4 text-white" />
					</div>
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100">
						+ {paidInvoices.length}
					</h2>
					<p className="text-xs text-violet-600 dark:text-violet-400">
						Total invoices paid
					</p>
				</CardContent>
			</Card>

			<Card className="flex flex-col gap-y-0 gradient-card bg-gradient-to-br from-orange-50 to-amber-100 border-amber-200 dark:from-orange-950 dark:to-amber-900 dark:border-amber-800 hover:shadow-lg transition-all duration-300">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-200">
						Pending Invoices
					</CardTitle>
					<div className="p-2 bg-amber-500 rounded-full">
						<Activity className="size-4 text-white" />
					</div>
				</CardHeader>

				<CardContent className="pt-0">
					<h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
						+ {openInvoices.length}
					</h2>
					<p className="text-xs text-amber-600 dark:text-amber-400">
						Total pending invoices
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
