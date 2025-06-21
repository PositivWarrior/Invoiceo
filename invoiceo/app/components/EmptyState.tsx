import { buttonVariants } from '@/components/ui/button';
import { Ban, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
	title: string;
	description: string;
	buttonText: string;
	href: string;
}

export function EmptyState({
	title,
	description,
	buttonText,
	href,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col flex-1 h-full items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/10 p-8 text-center animate-in fade-in-50 shadow-lg">
			<div className="flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-inner">
				<Ban className="size-10 text-primary" />
			</div>

			<h2 className="mt-6 text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
				{title}
			</h2>
			<p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xm mx-auto text-center">
				{description}
			</p>

			<Link
				href={href}
				className={`${buttonVariants()} bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
			>
				<PlusCircle className="size-4 mr-2" /> {buttonText}
			</Link>
		</div>
	);
}
