import { DashboardBlocks } from '../components/DashboardBlocks';
import { signOut } from '../utils/auth';
import { requireUser } from '../utils/hooks';

export default async function DashboardRoute() {
	const session = await requireUser();

	return (
		<>
			<DashboardBlocks />

			<div className="grid gap-4 lg:grid-cols-3 md:gap-8">
				<h1 className="bg-red-500 col-span-2">YO! This is about 70%</h1>
				<h1 className="bg-green-500 col-span-1">
					YO! This is about 30%
				</h1>
			</div>
		</>
	);
}
