"use client";

import * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Calendar } from "~/components/ui/calendar";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

export function CalendarPreview() {
	return (
		<ComponentAccordionGroup title="Calendar">
			<ComponentAccordionSubGroup title="Default">
				<CalendarDemo />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Range">
				<CalendarRange />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Month and Year Selector">
				<CalendarMonthYearSelector />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
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
		/>
	);
}

function CalendarRange() {
	const [date, setDate] = React.useState<Date | undefined>(
		new Date(2025, 5, 12),
	);
	return (
		<Calendar
			mode="single"
			defaultMonth={date}
			numberOfMonths={2}
			selected={date}
			onSelect={setDate}
			className="rounded-md border shadow-sm"
		/>
	);
}

function CalendarMonthYearSelector() {
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
						className="w-full bg-background"
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
