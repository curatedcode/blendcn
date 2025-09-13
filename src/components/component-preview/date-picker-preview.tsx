"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

dayjs.extend(advancedFormat);

export function DatePickerPreview() {
	return (
		<ComponentAccordionGroup title="Date Picker">
			<ComponentAccordionSubGroup title="Default">
				<DatePicker />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Input">
				<DatePickerWithInput />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Time">
				<DatePickerWithTime />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Natural Language">
				<DatePickerNaturalLanguage />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Form">
				<DatePickerForm />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function DatePicker() {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(undefined);

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="sr-only px-1">
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

function DatePickerWithInput() {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(
		new Date("2025-06-01"),
	);
	const [month, setMonth] = React.useState<Date | undefined>(date);
	const [value, setValue] = React.useState(formatDate(date));
	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				Subscription Date
			</Label>
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={value}
					placeholder="June 01, 2025"
					className="pr-10"
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

function DatePickerWithTime() {
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
					className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
		</div>
	);
}

function DatePickerNaturalLanguage() {
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
					className="pr-10"
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

const FormSchema = z.object({
	dob: z.date({
		error: "A date of birth is required.",
	}),
});

function DatePickerForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="dob"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date of birth</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												dayjs(field.value).format("MMMM Do, YYYY")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										captionLayout="dropdown"
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Your date of birth is used to calculate your age.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
