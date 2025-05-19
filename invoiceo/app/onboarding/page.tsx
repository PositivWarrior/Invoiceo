'use client';

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
import { useActionState } from 'react';
import { onboardUser } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { onboardingSchema } from '../utils/zodSchemas';

export default function Onboarding() {
	const [lastResult, action] = useActionState(onboardUser, undefined);
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: onboardingSchema,
			});
		},

		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	});

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
					<form
						className="grid gap-4"
						action={action}
						id={form.id}
						onSubmit={form.onSubmit}
						noValidate
					>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<Label>First Name</Label>
								<Input
									placeholder="Johnny"
									name={fields.firstName.name}
									key={fields.firstName.key}
									defaultValue={fields.firstName.value}
								/>
								<p className="text-red-500 text-sm">
									{fields.firstName.errors}
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Last Name</Label>
								<Input
									placeholder="Doeson"
									name={fields.lastName.name}
									key={fields.lastName.key}
									defaultValue={fields.lastName.value}
								/>
								<p className="text-red-500 text-sm">
									{fields.lastName.errors}
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Label>Adress</Label>
							<Input
								placeholder="Johnnyville 123"
								name={fields.address.name}
								key={fields.address.key}
								defaultValue={fields.address.value}
							/>
							<p className="text-red-500 text-sm">
								{fields.address.errors}
							</p>
						</div>

						<SubmitButton text="Finish Onboarding" />
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
