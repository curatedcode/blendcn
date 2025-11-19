import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
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

dayjs.extend(advancedFormat);

export function DatePickerPreview() {
	return (
		<ComponentGroup title="Date Picker" id="date-picker-component">
			<ComponentGroupPreview>
				<Calendar22 />
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Picker with Input">
					<Calendar28 />
				</ComponentGroupExample>
				<ComponentGroupExample title="Date and Time Picker">
					<Calendar24 />
				</ComponentGroupExample>
				<ComponentGroupExample title="Natural Language Picker">
					<Calendar29 />
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
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

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false;
	}
	return !Number.isNaN(date.getTime());
}

function Calendar28() {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(
		new Date("2025-06-01"),
	);
	const [month, setMonth] = React.useState<Date | undefined>(date);
	const [value, setValue] = React.useState(formatDate(date));
	return (
		<div className="flex flex-col gap-3 sm:max-w-[250px]">
			<Label htmlFor="date" className="px-1">
				Subscription Date
			</Label>
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={value}
					placeholder="June 01, 2025"
					className="bg-background pr-10"
					onChange={(e) => {
						const date = new Date(e.target.value);
						setValue(e.target.value);
						if (isValidDate(date)) {
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
					<PopoverContent
						className="w-auto overflow-hidden p-0"
						align="end"
						alignOffset={-8}
						sideOffset={10}
					>
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

function Calendar29() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("In 2 days");
	const [date, setDate] = React.useState<Date | undefined>(
		parseDate(value) || undefined,
	);
	const [month, setMonth] = React.useState<Date | undefined>(date);
	return (
		<div className="flex flex-col gap-3 sm:max-w-sm">
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
