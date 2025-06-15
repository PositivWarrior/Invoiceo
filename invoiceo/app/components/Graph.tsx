'use client';

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface GraphProps {
	data: {
		date: string;
		amount: number;
	}[];
}

export function Graph({ data }: GraphProps) {
	return (
		<ChartContainer
			config={{
				amount: {
					label: 'Amount',
					color: 'var(--primary)',
				},
			}}
			className="min-h-[300px]"
		>
			<LineChart data={data}>
				<XAxis dataKey="date" />
				<YAxis />
				<ChartTooltip
					content={<ChartTooltipContent indicator="line" />}
				/>
				<Line
					dataKey="amount"
					type="monotone"
					stroke="var(--color-amount)"
					strokeWidth={2}
				/>
			</LineChart>
		</ChartContainer>
	);
}
