import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '../components/SubmitButtons';

export default function Onboarding() {
	return (
		<div className="min-h-screen w-screen flex items-center justify-center">
			<Card className="mx-auto w-[380px] px-5">
				<CardHeader>
					<CardTitle className="text-xl">
						You are almost finished
					</CardTitle>
					<CardDescription>
						Enter your information to finish creating your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<Label>First Name</Label>
								<Input placeholder="Johnny" />
							</div>
							<div className="flex flex-col gap-2">
								<Label>Last Name</Label>
								<Input placeholder="Doeson" />
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Label>Adress</Label>
							<Input placeholder="Johnnyville 123" />
						</div>

						<SubmitButton text="Finish Onboarding" />
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
