import { parseDate } from "chrono-node";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

export function CalendarPreview() {
	return (
		<ComponentGroup title="Calendar" id="calendar-component">
			<ComponentGroupPreview>
				<CalendarDemo />
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Range Calendar">
					<Calendar05 />
				</ComponentGroupExample>
				<ComponentGroupExample title="Month and Year Selector">
					<Calendar13 />
				</ComponentGroupExample>
				<ComponentGroupExample title="Date of Birth Picker">
					<Calendar22 />
				</ComponentGroupExample>
				<ComponentGroupExample title="Date and Time Picker">
					<Calendar24 />
				</ComponentGroupExample>
				<ComponentGroupExample title="Natural Language Picker">
					<Calendar29 />
				</ComponentGroupExample>
				<ComponentGroupExample title="Custom Cell Size">
					<Calendar18 />
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}

function CalendarDemo() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			className="rounded-md border shadow-sm"
			captionLayout="dropdown"
		/>
	);
}

function Calendar05() {
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
		from: new Date(2025, 5, 12),
		to: new Date(2025, 6, 15),
	});
	return (
		<Calendar
			mode="range"
			defaultMonth={dateRange?.from}
			selected={dateRange}
			onSelect={setDateRange}
			numberOfMonths={2}
			className="rounded-lg border shadow-sm"
		/>
	);
}

function Calendar13() {
	const [dropdown, setDropdown] =
		React.useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
			"dropdown",
		);
	const [date, setDate] = React.useState<Date | undefined>(
		new Date(2025, 5, 12),
	);
	return (
		<div className="flex flex-col gap-4">
			<Calendar
				mode="single"
				defaultMonth={date}
				selected={date}
				onSelect={setDate}
				captionLayout={dropdown}
				className="rounded-lg border shadow-sm"
			/>
			<div className="flex flex-col gap-3">
				<Label htmlFor="dropdown" className="px-1">
					Dropdown
				</Label>
				<Select
					value={dropdown}
					onValueChange={(value) =>
						setDropdown(
							value as React.ComponentProps<typeof Calendar>["captionLayout"],
						)
					}
				>
					<SelectTrigger
						id="dropdown"
						size="sm"
						className="w-full bg-background sm:max-w-xs"
					>
						<SelectValue placeholder="Dropdown" />
					</SelectTrigger>
					<SelectContent align="center">
						<SelectItem value="dropdown">Month and Year</SelectItem>
						<SelectItem value="dropdown-months">Month Only</SelectItem>
						<SelectItem value="dropdown-years">Year Only</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}

function Calendar22() {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(undefined);
	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				Date of birth
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-48 justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							setDate(date);
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

function Calendar24() {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(undefined);
	return (
		<div className="flex gap-4">
			<div className="flex flex-col gap-3">
				<Label htmlFor="date-picker" className="px-1">
					Date
				</Label>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							id="date-picker"
							className="w-32 justify-between font-normal"
						>
							{date ? date.toLocaleDateString() : "Select date"}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							onSelect={(date) => {
								setDate(date);
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col gap-3">
				<Label htmlFor="time-picker" className="px-1">
					Time
				</Label>
				<Input
					type="time"
					id="time-picker"
					step="1"
					defaultValue="10:30:00"
					className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
		</div>
	);
}

function formatDate(date: Date | undefined) {
	if (!date) {
		return "";
	}
	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}
function Calendar29() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("In 2 days");
	const [date, setDate] = React.useState<Date | undefined>(
		parseDate(value) || undefined,
	);
	const [month, setMonth] = React.useState<Date | undefined>(date);
	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				Schedule Date
			</Label>
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={value}
					placeholder="Tomorrow or next week"
					className="bg-background pr-10"
					onChange={(e) => {
						setValue(e.target.value);
						const date = parseDate(e.target.value);
						if (date) {
							setDate(date);
							setMonth(date);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setOpen(true);
						}
					}}
				/>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date-picker"
							variant="ghost"
							className="-translate-y-1/2 absolute top-1/2 right-2 size-6"
						>
							<CalendarIcon className="size-3.5" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="end">
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							month={month}
							onMonthChange={setMonth}
							onSelect={(date) => {
								setDate(date);
								setValue(formatDate(date));
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="px-1 text-muted-foreground text-sm">
				Your post will be published on{" "}
				<span className="font-medium">{formatDate(date)}</span>.
			</div>
		</div>
	);
}

function Calendar18() {
	const [date, setDate] = React.useState<Date | undefined>(
		new Date(2025, 5, 12),
	);
	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
			buttonVariant="ghost"
		/>
	);
}
