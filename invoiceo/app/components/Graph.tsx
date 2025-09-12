'use client';

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface GraphProps {
	data: {
		date: string;
		amount: number;
	}[];
}

export function Graph({ data }: GraphProps) {
	// If no data, show a message
	if (!data || data.length === 0) {
		return (
			<div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
				No paid invoices in the last 30 days
			</div>
		);
	}

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
				<XAxis
					dataKey="date"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value}`}
				/>
				<ChartTooltip
					content={<ChartTooltipContent indicator="line" />}
				/>
				<Line
					dataKey="amount"
					type="monotone"
					stroke="var(--color-amount)"
					strokeWidth={2}
					dot={{ fill: 'var(--color-amount)', strokeWidth: 2, r: 4 }}
					activeDot={{
						r: 6,
						stroke: 'var(--color-amount)',
						strokeWidth: 2,
					}}
				/>
			</LineChart>
		</ChartContainer>
	);
}
