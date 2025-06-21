import Hero from './components/Hero';
import Navbar from './components/Navbar';

export default function Home() {
	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
			<Navbar />
			<Hero />
		</main>
	);
}
