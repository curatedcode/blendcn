/** biome-ignore-all lint/correctness/noChildrenProp: tanstack form */

import dayjs from "dayjs";
import { TimerIcon } from "lucide-react";
import type { Reminder } from "~/components/demo-app/demo-data";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export function RemindersSection({
	reminders,
	className,
}: {
	reminders: Reminder[];
	className?: string;
}) {
	const todayReminders: Reminder[] = [];
	const laterReminders: Reminder[] = [];

	for (const reminder of reminders) {
		const isSameDate = dayjs().isSame(reminder.dueDate, "date");
		if (isSameDate) {
			todayReminders.push(reminder);
		} else {
			laterReminders.push(reminder);
		}
	}

	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<TimerIcon className="size-5 text-primary" />
					<span>Reminders</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Accordion type="single" defaultValue={"today"}>
					<ReminderAccordionItem
						title="Today"
						value="today"
						reminders={todayReminders}
						isToday={true}
					/>
					<ReminderAccordionItem
						title="Later"
						value="later"
						reminders={laterReminders}
					/>
				</Accordion>
			</CardContent>
		</Card>
	);
}

function ReminderAccordionItem({
	title,
	value,
	reminders,
	isToday,
}: {
	title: string;
	value: string;
	reminders: Reminder[];
	isToday?: boolean;
}) {
	const isPlural = (num: number) => num === 0 || num > 1;

	return (
		<AccordionItem value={value}>
			<AccordionTrigger className="flex items-center gap-1.5 text-sm hover:[text-decoration-line:none]!">
				<div className="flex items-center gap-1.5">
					<span
						className={cn(
							"rounded-md bg-secondary px-3 py-0.5 text-secondary-foreground uppercase shadow-sm",
							isToday && "bg-accent text-accent-foreground",
						)}
					>
						{title}
					</span>
					<div className="flex items-center gap-1.5 text-muted-foreground text-xs">
						<span>&bull;</span>
						<span>
							{reminders.length}{" "}
							{isPlural(reminders.length) ? "reminders" : "reminder"}
						</span>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				{reminders.length ? (
					<ul className="list-disc space-y-3 pl-6">
						{reminders.map((reminder) => (
							<li key={reminder.id}>{reminder.title}</li>
						))}
					</ul>
				) : (
					<span className="block py-1 text-center text-muted-foreground text-sm">
						No reminders to show...
					</span>
				)}
			</AccordionContent>
		</AccordionItem>
	);
}
