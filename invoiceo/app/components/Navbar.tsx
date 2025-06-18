import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo_nobg.png';

import { RainbowButton } from '@/components/magicui/rainbow-button';

export default function Navbar() {
	return (
		<div className="flex items-center justify-between">
			<Link href="/">
				<Image src={Logo} alt="Logo" className="size-50" />
			</Link>

			<Link href="/login">
				<RainbowButton>Get Started</RainbowButton>
			</Link>
		</div>
	);
}
