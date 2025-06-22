import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo_nobg_resize_2.png';

import { RainbowButton } from '@/components/magicui/rainbow-button';

export default function Navbar() {
	return (
		<div className="flex items-center justify-between px-2 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/10 rounded-xl border border-primary/10 backdrop-blur-sm">
			<Link
				href="/"
				className="hover:scale-105 transition-transform duration-200"
			>
				<Image
					src={Logo}
					alt="Logo"
					className="h-18 w-auto drop-shadow-lg"
				/>
			</Link>

			<Link href="/login">
				<RainbowButton>Get Started</RainbowButton>
			</Link>
		</div>
	);
}
