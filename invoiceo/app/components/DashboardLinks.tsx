'use client';

import { cn } from '@/lib/utils';
import { HomeIcon, Users2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const dashboardLinks = [
	{
		id: 0,
		name: 'Dashboard',
		href: '/dashboard',
		icon: HomeIcon,
	},
	{
		id: 1,
		name: 'Invoices',
		href: '/dashboard/invoices',
		icon: Users2,
	},
];

export default function DashboardLinks() {
	const pathname = usePathname();

	return (
		<>
			{dashboardLinks.map((link) => (
				<Link
					className={cn(
						pathname === link.href
							? 'text-white bg-gradient-to-r from-primary to-accent shadow-lg border border-primary/20'
							: 'text-muted-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10',
						'flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95',
					)}
					href={link.href}
					key={link.id}
				>
					<link.icon
						className={cn(
							'size-4',
							pathname === link.href ? 'text-white' : '',
						)}
					/>
					<span className="font-medium">{link.name}</span>
				</Link>
			))}
		</>
	);
}
