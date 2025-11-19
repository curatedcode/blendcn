import dayjs from "dayjs";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { ChartVisitorsData } from "~/components/demo-app/demo-data";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "~/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

export function ChartSection({
	data,
	className,
}: {
	data: ChartVisitorsData;
	className?: string;
}) {
	const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

	const timeRangeTitle = React.useMemo(() => {
		switch (timeRange) {
			case "90d":
				return "90 days";
			case "30d":
				return "30 days";
			case "7d":
				return "7 days";
		}
	}, [timeRange]);

	const filteredData = React.useMemo(
		() =>
			data.filter((item) => {
				const date = new Date(item.date);
				const referenceDate = new Date("2024-06-30");
				let daysToSubtract = 90;
				if (timeRange === "30d") {
					daysToSubtract = 30;
				} else if (timeRange === "7d") {
					daysToSubtract = 7;
				}
				const startDate = new Date(referenceDate);
				startDate.setDate(startDate.getDate() - daysToSubtract);
				return date >= startDate;
			}),
		[data, timeRange],
	);

	return (
		<Card className={cn("pt-0", className)}>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Visitors</CardTitle>
					<CardDescription>
						Total visitors for the last {timeRangeTitle}
					</CardDescription>
				</div>
				<Select
					value={timeRange}
					onValueChange={(v) => setTimeRange(v as typeof timeRange)}
				>
					<SelectTrigger
						className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={{
						visitors: {
							label: "Visitors",
						},
						desktop: {
							label: "Desktop",
							color: "var(--chart-1)",
						},
						mobile: {
							label: "Mobile",
							color: "var(--chart-2)",
						},
					}}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={(props) => (
								<ChartTooltipContent
									{...props}
									labelFormatter={(label) => dayjs(label).format("MMM D")}
									indicator="dot"
								/>
							)}
						/>
						<Area
							dataKey="mobile"
							type="natural"
							fill="url(#fillMobile)"
							stroke="var(--color-mobile)"
							stackId="a"
						/>
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fillDesktop)"
							stroke="var(--color-desktop)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
