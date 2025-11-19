import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import { CalendarDaysIcon } from "lucide-react";
import * as React from "react";
import type { CalendarEvent } from "~/components/demo-app/demo-data";
import { GoogleMeetIcon } from "~/components/icons/GoogleMeetIcon";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";
import { cn } from "~/lib/utils";

dayjs.extend(relativeTimePlugin);

function getRelativeDate(date: Date) {
	const dateObj = dayjs(date);

	const isToday = dateObj.isSame(undefined, "date");
	if (isToday) return "Today";

	const fromNow = dateObj.fromNow();

	const formatted = `${fromNow.charAt(0).toUpperCase()}${fromNow.slice(1)}`;

	return formatted;
}

export function CalendarSection({
	events,
	className,
}: {
	events: CalendarEvent[];
	className?: string;
}) {
	const now = dayjs().set("hour", 12);
	const [selectedDate, setSelectedDate] = React.useState(new Date());

	const eventsToShow = React.useMemo(() => {
		const eventsOnDate: CalendarEvent[] = [];

		for (const event of events) {
			const isSameDate = dayjs(selectedDate).isSame(event.start, "date");
			if (isSameDate) {
				eventsOnDate.push(event);
			}
		}

		return eventsOnDate;
	}, [events, selectedDate]);

	const week = [
		now.subtract(3, "day"),
		now.subtract(2, "day"),
		now.subtract(1, "day"),
		now,
		now.add(1, "day"),
		now.add(2, "day"),
		now.add(3, "day"),
	];

	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<CalendarDaysIcon className="size-5 text-primary" />
					<span>Calendar</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex justify-center gap-3 overflow-hidden">
					{week.map((date) => (
						<button
							type="button"
							key={date.toISOString()}
							className="group basis-1/5 md:basis-1/7"
							onClick={() => setSelectedDate(date.toDate())}
						>
							<div
								className={cn(
									"group relative flex flex-col gap-1.5 rounded-lg px-3 pt-3 pb-2 transition-colors",
									"data-selected:bg-primary data-selected:text-primary-foreground",
									"group-hover:bg-muted group-hover:data-selected:bg-primary",
								)}
								data-selected={
									date.isSame(selectedDate, "date") ? true : undefined
								}
								data-today={date.isSame(now, "date") ? true : undefined}
							>
								<span className="-translate-1/2 absolute top-2 left-1/2 hidden text-primary group-data-today:inline group-data-selected:text-primary-foreground">
									&bull;
								</span>
								<span className="text-sm">{date.format("ddd")}</span>
								<span className="">{date.format("DD")}</span>
							</div>
						</button>
					))}
				</div>
				<div className="flex flex-col gap-3">
					{eventsToShow.length ? (
						eventsToShow.map((event) => (
							<div
								key={event.id}
								className="h-34 space-y-3 rounded-lg bg-secondary p-4 text-secondary-foreground"
							>
								<div className="flex items-center gap-1.5">
									<span className="font-semibold text-sm md:text-base">
										{event.title}
									</span>
									{event.tag && (
										<Badge className="-mb-[3px] bg-accent text-accent-foreground">
											{event.tag}
										</Badge>
									)}
								</div>
								<div className="flex items-center gap-1.5 text-muted-foreground text-xs md:text-sm">
									<span>{getRelativeDate(event.start)}</span>
									<span>&bull;</span>
									{event.allDay ? (
										<span>All day</span>
									) : (
										<>
											<span>{dayjs(event.start).format("h:mma")}</span>
											<span>-</span>
											<span>{dayjs(event.end).format("h:mma")}</span>
										</>
									)}
								</div>
								<div className="flex justify-between gap-3">
									<Button variant={"outline"} asChild>
										{/** biome-ignore lint/a11y/useValidAnchor: demo link */}
										<a href="#">
											<GoogleMeetIcon className="size-4" />
											<span>Google Meet</span>
										</a>
									</Button>
									<div className="-space-x-2 flex">
										{event.participants.slice(0, 4).map((person) => (
											<HoverCard key={person.id}>
												<HoverCardTrigger asChild>
													<Avatar className="border-2 border-background">
														<AvatarImage
															src={person.avatarUrl}
															alt={`${person.name.firstName} ${person.name.lastName}`}
														/>
														<AvatarFallback>
															{person.name.firstName.charAt(0)}
															{person.name.lastName.charAt(0)}
														</AvatarFallback>
													</Avatar>
												</HoverCardTrigger>
												<HoverCardContent className="flex items-start gap-3">
													<Avatar
														key={person.id}
														className="size-14 rounded-md"
													>
														<AvatarImage
															src={person.avatarUrl}
															alt={`${person.name.firstName} ${person.name.lastName}`}
														/>
														<AvatarFallback>
															{person.name.firstName.charAt(0)}
															{person.name.lastName.charAt(0)}
														</AvatarFallback>
													</Avatar>
													<div className="-mt-px flex flex-col">
														<span className="font-semibold">{`${person.name.firstName} ${person.name.lastName}`}</span>
														<span className="block text-sm leading-4">
															{person.role}
														</span>
													</div>
												</HoverCardContent>
											</HoverCard>
										))}
										{event.participants.length > 4 && (
											<div className="z-1 flex size-8 cursor-default select-none items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground text-xs">
												+{event.participants.length - 4}
											</div>
										)}
									</div>
								</div>
							</div>
						))
					) : (
						<div className="flex h-34 items-center justify-center p-4 text-lg text-muted-foreground">
							<span>No events...</span>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
