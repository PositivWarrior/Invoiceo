'use server';

import { requireUser } from './utils/hooks';
import { parseWithZod } from '@conform-to/zod';
import { onboardingSchema } from './utils/zodSchemas';
import prisma from './utils/db';

export async function onboardUser(formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: onboardingSchema,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const data = await prisma.user.update({
		where: {
			id: session.user?.id,
		},
		data: {},
	});
}
