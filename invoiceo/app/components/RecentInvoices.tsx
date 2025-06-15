import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '../utils/db';
import { requireUser } from '../utils/hooks';

async function getData(userId: string) {
	const data = await prisma.invoice.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			clientName: true,
			clientEmail: true,
			total: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 8,
	});

	return data;
}

export async function RecentInvoices() {
	const session = await requireUser();
	const data = await getData(session.user?.id as string);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Invoices</CardTitle>
			</CardHeader>

			<CardContent>
				{data.map((item) => (
					<div className="flex items-center gap-4">
						<Avatar className="hidden sm:flex size-9">
							<AvatarFallback>KM</AvatarFallback>
						</Avatar>

						<div className="flex flex-col gap-1">
							<p className="text-sm font-medium leading-none">
								Robert Gomola
							</p>
							<p className="text-sm text-muted-foreground">
								robert@gomola.com
							</p>
						</div>

						<div className="text-sm font-medium text-muted-foreground ml-auto">
							+$ 500,00
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
