import { ReactNode } from 'react';
import { requireUser } from '../utils/hooks';
import Link from 'next/link';
import Logo from '@/public/logo_nobg.png';
import Image from 'next/image';
import DashboardLinks from '../components/DashboardLinks';
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, User2 } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '../utils/auth';
import prisma from '../utils/db';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

async function getUser(userId: string) {
	const data = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			firstName: true,
			lastName: true,
			address: true,
		},
	});

	if (!data?.firstName || !data.lastName || !data.address) {
		redirect('/onboarding');
	}

	return data;
}

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await requireUser();
	await getUser(session.user?.id as string);

	return (
		<>
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-gradient-to-br from-background via-background to-accent/5">
				<div className="hidden border-r border-primary/20 bg-gradient-to-b from-primary/5 to-accent/10 backdrop-blur-sm md:block shadow-lg">
					<div className="flex flex-col max-h-screen h-full">
						<div className="h-14 flex items-center border-b border-primary/20 px-4 lg:h-[60px] lg:px-6 bg-gradient-to-r from-primary/10 to-accent/10 mb-6">
							<Link
								href="/"
								className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
							>
								<Image
									src={Logo}
									alt="Logo"
									className="size-40 drop-shadow-lg"
								/>
							</Link>
						</div>

						<div className="flex-1 px-4 lg:px-6">
							<nav className="grid items-start text-sm font-medium">
								<DashboardLinks />
							</nav>
						</div>
					</div>
				</div>

				<div className="flex flex-col">
					<header className="flex h-14 items-center gap-4 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-accent/10 px-4 lg:h-[60px] lg:px-6 backdrop-blur-sm shadow-sm">
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="md:hidden"
								>
									<Menu />
								</Button>
							</SheetTrigger>

							<SheetContent
								side="left"
								className="bg-gradient-to-b from-primary/5 to-accent/10"
							>
								<SheetTitle className="hidden">
									Navigation
								</SheetTitle>
								<div className="mt-8 mb-6">
									<Image
										src={Logo}
										alt="Logo"
										className="size-32 mx-auto drop-shadow-lg"
									/>
								</div>
								<nav className="grid gap-2">
									<DashboardLinks />
								</nav>
							</SheetContent>
						</Sheet>

						<div className="flex items-center ml-auto">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-lg"
										variant="outline"
										size="icon"
									>
										<User2 className="text-white" />
									</Button>
								</DropdownMenuTrigger>

								<DropdownMenuContent
									align="end"
									className="bg-gradient-to-b from-card to-accent/5 border border-primary/20"
								>
									<DropdownMenuLabel className="text-primary">
										My Account
									</DropdownMenuLabel>
									<DropdownMenuSeparator className="bg-primary/20" />

									<DropdownMenuItem
										asChild
										className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
									>
										<Link href="/dashboard">Dashboard</Link>
									</DropdownMenuItem>

									<DropdownMenuItem
										asChild
										className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
									>
										<Link href="/dashboard/invoices">
											Invoices
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator className="bg-primary/20" />

									<DropdownMenuItem
										asChild
										className="hover:bg-gradient-to-r hover:from-destructive/10 hover:to-destructive/5"
									>
										<form
											className="w-full"
											action={async () => {
												'use server';
												await signOut();
											}}
										>
											<button className="w-full text-left">
												Logout
											</button>
										</form>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</header>

					<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gradient-to-br from-background to-accent/5">
						{children}
					</main>
				</div>
			</div>

			<Toaster richColors closeButton theme="light" />
		</>
	);
}
