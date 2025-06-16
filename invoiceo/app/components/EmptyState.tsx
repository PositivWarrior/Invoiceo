import { Ban } from 'lucide-react';

export function EmptyState() {
	return (
		<div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
			<div>
				<Ban className="size-10 text-primary" />
			</div>
		</div>
	);
}
