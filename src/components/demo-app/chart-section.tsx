import dayjs from "dayjs";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

export function ChartSection({ className }: { className?: string }) {
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

	const filteredData = React.useMemo(() => {
		switch (timeRange) {
			case "90d":
				return data;
			case "30d": {
				const arr = data.slice(60);
				console.log("30 day", arr.length);
				return arr;
			}
			case "7d": {
				const arr = data.slice(83);
				console.log("7 day", arr.length);
				return arr;
			}
		}
	}, [timeRange]);

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
							dataKey="daysToSubtract"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) =>
								dayjs().subtract(value, "day").format("MMM D")
							}
						/>
						<ChartTooltip
							cursor={false}
							content={(props) => (
								<ChartTooltipContent
									{...props}
									labelFormatter={() =>
										dayjs()
											.subtract(props.label as number, "days")
											.format("MMM D")
									}
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

const data = [
	{
		daysToSubtract: 90,
		desktop: 77,
		mobile: 350,
	},
	{
		daysToSubtract: 89,
		desktop: 412,
		mobile: 251,
	},
	{
		daysToSubtract: 88,
		desktop: 301,
		mobile: 383,
	},
	{
		daysToSubtract: 87,
		desktop: 184,
		mobile: 233,
	},
	{
		daysToSubtract: 86,
		desktop: 147,
		mobile: 221,
	},
	{
		daysToSubtract: 85,
		desktop: 367,
		mobile: 114,
	},
	{
		daysToSubtract: 84,
		desktop: 200,
		mobile: 76,
	},
	{
		daysToSubtract: 83,
		desktop: 185,
		mobile: 478,
	},
	{
		daysToSubtract: 82,
		desktop: 110,
		mobile: 287,
	},
	{
		daysToSubtract: 81,
		desktop: 313,
		mobile: 464,
	},
	{
		daysToSubtract: 80,
		desktop: 376,
		mobile: 126,
	},
	{
		daysToSubtract: 79,
		desktop: 89,
		mobile: 432,
	},
	{
		daysToSubtract: 78,
		desktop: 409,
		mobile: 220,
	},
	{
		daysToSubtract: 77,
		desktop: 272,
		mobile: 242,
	},
	{
		daysToSubtract: 76,
		desktop: 84,
		mobile: 400,
	},
	{
		daysToSubtract: 75,
		desktop: 147,
		mobile: 160,
	},
	{
		daysToSubtract: 74,
		desktop: 287,
		mobile: 320,
	},
	{
		daysToSubtract: 73,
		desktop: 302,
		mobile: 337,
	},
	{
		daysToSubtract: 72,
		desktop: 484,
		mobile: 152,
	},
	{
		daysToSubtract: 71,
		desktop: 214,
		mobile: 181,
	},
	{
		daysToSubtract: 70,
		desktop: 478,
		mobile: 109,
	},
	{
		daysToSubtract: 69,
		desktop: 469,
		mobile: 177,
	},
	{
		daysToSubtract: 68,
		desktop: 204,
		mobile: 319,
	},
	{
		daysToSubtract: 67,
		desktop: 197,
		mobile: 152,
	},
	{
		daysToSubtract: 66,
		desktop: 374,
		mobile: 115,
	},
	{
		daysToSubtract: 65,
		desktop: 392,
		mobile: 337,
	},
	{
		daysToSubtract: 64,
		desktop: 466,
		mobile: 368,
	},
	{
		daysToSubtract: 63,
		desktop: 360,
		mobile: 251,
	},
	{
		daysToSubtract: 62,
		desktop: 64,
		mobile: 422,
	},
	{
		daysToSubtract: 61,
		desktop: 60,
		mobile: 311,
	},
	{
		daysToSubtract: 60,
		desktop: 455,
		mobile: 399,
	},
	{
		daysToSubtract: 59,
		desktop: 142,
		mobile: 333,
	},
	{
		daysToSubtract: 58,
		desktop: 278,
		mobile: 262,
	},
	{
		daysToSubtract: 57,
		desktop: 108,
		mobile: 295,
	},
	{
		daysToSubtract: 56,
		desktop: 299,
		mobile: 169,
	},
	{
		daysToSubtract: 55,
		desktop: 174,
		mobile: 189,
	},
	{
		daysToSubtract: 54,
		desktop: 453,
		mobile: 183,
	},
	{
		daysToSubtract: 53,
		desktop: 237,
		mobile: 468,
	},
	{
		daysToSubtract: 52,
		desktop: 315,
		mobile: 285,
	},
	{
		daysToSubtract: 51,
		desktop: 411,
		mobile: 370,
	},
	{
		daysToSubtract: 50,
		desktop: 312,
		mobile: 258,
	},
	{
		daysToSubtract: 49,
		desktop: 490,
		mobile: 432,
	},
	{
		daysToSubtract: 48,
		desktop: 164,
		mobile: 94,
	},
	{
		daysToSubtract: 47,
		desktop: 124,
		mobile: 122,
	},
	{
		daysToSubtract: 46,
		desktop: 78,
		mobile: 360,
	},
	{
		daysToSubtract: 45,
		desktop: 186,
		mobile: 374,
	},
	{
		daysToSubtract: 44,
		desktop: 247,
		mobile: 203,
	},
	{
		daysToSubtract: 43,
		desktop: 298,
		mobile: 294,
	},
	{
		daysToSubtract: 42,
		desktop: 234,
		mobile: 303,
	},
	{
		daysToSubtract: 41,
		desktop: 357,
		mobile: 227,
	},
	{
		daysToSubtract: 40,
		desktop: 376,
		mobile: 450,
	},
	{
		daysToSubtract: 39,
		desktop: 161,
		mobile: 475,
	},
	{
		daysToSubtract: 38,
		desktop: 178,
		mobile: 224,
	},
	{
		daysToSubtract: 37,
		desktop: 294,
		mobile: 201,
	},
	{
		daysToSubtract: 36,
		desktop: 94,
		mobile: 407,
	},
	{
		daysToSubtract: 35,
		desktop: 428,
		mobile: 258,
	},
	{
		daysToSubtract: 34,
		desktop: 80,
		mobile: 430,
	},
	{
		daysToSubtract: 33,
		desktop: 154,
		mobile: 175,
	},
	{
		daysToSubtract: 32,
		desktop: 328,
		mobile: 375,
	},
	{
		daysToSubtract: 31,
		desktop: 409,
		mobile: 325,
	},
	{
		daysToSubtract: 30,
		desktop: 162,
		mobile: 69,
	},
	{
		daysToSubtract: 29,
		desktop: 136,
		mobile: 312,
	},
	{
		daysToSubtract: 28,
		desktop: 92,
		mobile: 197,
	},
	{
		daysToSubtract: 27,
		desktop: 163,
		mobile: 182,
	},
	{
		daysToSubtract: 26,
		desktop: 164,
		mobile: 173,
	},
	{
		daysToSubtract: 25,
		desktop: 67,
		mobile: 229,
	},
	{
		daysToSubtract: 24,
		desktop: 428,
		mobile: 437,
	},
	{
		daysToSubtract: 23,
		desktop: 490,
		mobile: 151,
	},
	{
		daysToSubtract: 22,
		desktop: 185,
		mobile: 467,
	},
	{
		daysToSubtract: 21,
		desktop: 404,
		mobile: 113,
	},
	{
		daysToSubtract: 20,
		desktop: 178,
		mobile: 235,
	},
	{
		daysToSubtract: 19,
		desktop: 207,
		mobile: 118,
	},
	{
		daysToSubtract: 18,
		desktop: 170,
		mobile: 71,
	},
	{
		daysToSubtract: 17,
		desktop: 460,
		mobile: 439,
	},
	{
		daysToSubtract: 16,
		desktop: 127,
		mobile: 230,
	},
	{
		daysToSubtract: 15,
		desktop: 437,
		mobile: 195,
	},
	{
		daysToSubtract: 14,
		desktop: 207,
		mobile: 313,
	},
	{
		daysToSubtract: 13,
		desktop: 354,
		mobile: 184,
	},
	{
		daysToSubtract: 12,
		desktop: 356,
		mobile: 309,
	},
	{
		daysToSubtract: 11,
		desktop: 485,
		mobile: 460,
	},
	{
		daysToSubtract: 10,
		desktop: 259,
		mobile: 242,
	},
	{
		daysToSubtract: 9,
		desktop: 195,
		mobile: 114,
	},
	{
		daysToSubtract: 8,
		desktop: 69,
		mobile: 133,
	},
	{
		daysToSubtract: 7,
		desktop: 418,
		mobile: 98,
	},
	{
		daysToSubtract: 6,
		desktop: 88,
		mobile: 147,
	},
	{
		daysToSubtract: 5,
		desktop: 285,
		mobile: 435,
	},
	{
		daysToSubtract: 4,
		desktop: 348,
		mobile: 299,
	},
	{
		daysToSubtract: 3,
		desktop: 390,
		mobile: 223,
	},
	{
		daysToSubtract: 2,
		desktop: 222,
		mobile: 184,
	},
	{
		daysToSubtract: 1,
		desktop: 123,
		mobile: 318,
	},
];
