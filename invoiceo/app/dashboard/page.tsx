import { DashboardBlocks } from '../components/DashboardBlocks';
import { EmptyState } from '../components/EmptyState';
import { InvoiceGraph } from '../components/InvoiceGraph';
import { RecentInvoices } from '../components/RecentInvoices';
import { signOut } from '../utils/auth';
import prisma from '../utils/db';
import { requireUser } from '../utils/hooks';

async function getData(userId: string) {
	const data = await prisma.invoice.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
		},
	});

	return data;
}

export default async function DashboardRoute() {
	const session = await requireUser();
	const data = await getData(session.user?.id as string);

	return (
		<>
			{data.length < 1 ? (
				<EmptyState
					title="No invoice found"
					description="Hey, you haven't created any invoices yet. Click the button below to get started."
					buttonText="Create Invoice"
					href="/dashboard/invoices/create"
				/>
			) : (
				<>
					<DashboardBlocks />
					<div className="grid gap-4 lg:grid-cols-3 md:gap-8">
						<InvoiceGraph />
						<RecentInvoices />
					</div>
				</>
			)}
		</>
	);
}
