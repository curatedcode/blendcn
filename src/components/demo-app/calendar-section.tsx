import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import { CalendarDaysIcon } from "lucide-react";
import * as React from "react";
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

export function CalendarSection({ className }: { className?: string }) {
	const now = dayjs().set("hour", 12);
	const [selectedIndex, setSelectedIndex] = React.useState(3);

	const eventToShow = React.useMemo(() => {
		const eventAtIndex = events[selectedIndex];

		if (!eventAtIndex) return;
		return eventAtIndex;
	}, [selectedIndex]);

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
		<Card className={className}>
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<CalendarDaysIcon className="size-5 text-primary" />
					<span>Calendar</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex justify-center gap-3 overflow-hidden">
					{week.map((date, index) => (
						<button
							type="button"
							key={date.toISOString()}
							className="group basis-1/5 md:basis-1/7"
							onClick={() => setSelectedIndex(index)}
						>
							<div
								className={cn(
									"group relative flex flex-col gap-1.5 rounded-lg px-3 pt-3 pb-2 transition-colors",
									"data-selected:bg-primary data-selected:text-primary-foreground",
									"group-hover:bg-muted group-hover:data-selected:bg-primary",
								)}
								data-selected={selectedIndex === index ? true : undefined}
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
					{eventToShow ? (
						<div className="h-34 space-y-3 rounded-lg bg-secondary p-4 text-secondary-foreground">
							<div className="flex items-center gap-1.5">
								<span className="font-semibold text-sm md:text-base">
									{eventToShow.title}
								</span>
								{eventToShow.tag && (
									<Badge className="-mb-[3px] bg-accent text-accent-foreground">
										{eventToShow.tag}
									</Badge>
								)}
							</div>
							<div className="flex items-center gap-1.5 text-muted-foreground text-xs md:text-sm">
								<span>
									{getRelativeDate(now.subtract(selectedIndex, "day").toDate())}
								</span>
								<span>&bull;</span>
								{eventToShow.allDay ? (
									<span>All day</span>
								) : (
									<>
										<span>
											{dayjs(now)
												.set("hour", eventToShow.start.hour)
												.set("minute", eventToShow.start.minute)
												.format("h:mma")}
										</span>
										<span>-</span>
										<span>
											{dayjs(now)
												.set("hour", eventToShow.end.hour)
												.set("minute", eventToShow.end.minute)
												.format("h:mma")}
										</span>
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
									{eventToShow.participants.slice(0, 4).map((person) => (
										<HoverCard key={person.id}>
											<HoverCardTrigger asChild>
												<Avatar className="xs:flex hidden border-2 border-background">
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
												<Avatar key={person.id} className="size-14 rounded-md">
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
									<div className="z-1 flex xs:hidden size-8 cursor-default select-none items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground text-xs">
										+{eventToShow.participants.length}
									</div>
									{eventToShow.participants.length > 4 && (
										<div className="z-1 xs:flex hidden size-8 cursor-default select-none items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground text-xs">
											+{eventToShow.participants.length - 4}
										</div>
									)}
								</div>
							</div>
						</div>
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

type CalendarEvent = {
	id: number;
	title: string;
	start: {
		hour: number;
		minute: number;
	};
	end: {
		hour: number;
		minute: number;
	};
	allDay?: boolean;
	participants: {
		id: number;
		name: {
			firstName: string;
			lastName: string;
		};
		email: string;
		avatarUrl: string;
		role: string;
	}[];
	tag?: string;
};

const events: CalendarEvent[] = [
	{
		id: 1,
		title: "Team Retrospective",
		start: { hour: 8, minute: 30 },
		end: { hour: 9, minute: 15 },
		allDay: false,
		participants: [
			{
				id: 1,
				name: {
					firstName: "Becky",
					lastName: "Kunde",
				},
				email: "Becky_Kunde@hotmail.com",
				avatarUrl: "/assets/images/avatars/female/39.webp",
				role: "Human Division Engineer",
			},
			{
				id: 2,
				name: {
					firstName: "Kevin",
					lastName: "Nicolas",
				},
				email: "Kevin_Nicolas21@hotmail.com",
				avatarUrl: "/assets/images/avatars/male/28.webp",
				role: "District Metrics Developer",
			},
			{
				id: 3,
				name: {
					firstName: "Lena",
					lastName: "Koepp",
				},
				email: "Lena_Koepp@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/25.webp",
				role: "Investor Division Consultant",
			},
		],
		tag: "Marketing",
	},
	{
		id: 2,
		title: "Content Planning",
		start: { hour: 9, minute: 45 },
		end: { hour: 10, minute: 30 },
		allDay: false,
		participants: [
			{
				id: 1,
				name: {
					firstName: "Janis",
					lastName: "Powlowski-Fadel",
				},
				email: "Janis_Powlowski-Fadel@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/19.webp",
				role: "Direct Brand Officer",
			},
			{
				id: 2,
				name: {
					firstName: "Sandy",
					lastName: "Waters",
				},
				email: "Sandy_Waters96@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/36.webp",
				role: "Investor Infrastructure Planner",
			},
			{
				id: 3,
				name: {
					firstName: "Fredrick",
					lastName: "Ward",
				},
				email: "Fredrick.Ward@yahoo.com",
				avatarUrl: "/assets/images/avatars/male/39.webp",
				role: "Future Intranet Engineer",
			},
			{
				id: 4,
				name: {
					firstName: "Lucille",
					lastName: "Olson",
				},
				email: "Lucille_Olson12@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/31.webp",
				role: "Customer Tactics Strategist",
			},
			{
				id: 5,
				name: {
					firstName: "Gregg",
					lastName: "Zboncak",
				},
				email: "Gregg_Zboncak@gmail.com",
				avatarUrl: "/assets/images/avatars/male/29.webp",
				role: "Regional Web Consultant",
			},
		],
		tag: "Standup",
	},
	{
		id: 3,
		title: "Infrastructure Check",
		start: { hour: 11, minute: 0 },
		end: { hour: 12, minute: 0 },
		allDay: true,
		participants: [
			{
				id: 1,
				name: {
					firstName: "Brandon",
					lastName: "Deckow",
				},
				email: "Brandon.Deckow94@hotmail.com",
				avatarUrl: "/assets/images/avatars/male/33.webp",
				role: "Regional Response Associate",
			},
			{
				id: 2,
				name: {
					firstName: "Gregg",
					lastName: "Zboncak",
				},
				email: "Gregg_Zboncak@gmail.com",
				avatarUrl: "/assets/images/avatars/male/29.webp",
				role: "Regional Web Consultant",
			},
			{
				id: 3,
				name: {
					firstName: "Willie",
					lastName: "Kihn",
				},
				email: "Willie_Kihn@yahoo.com",
				avatarUrl: "/assets/images/avatars/male/1.webp",
				role: "National Solutions Engineer",
			},
		],
		tag: "Compliance",
	},
	{
		id: 4,
		title: "Product Review",
		start: { hour: 13, minute: 30 },
		end: { hour: 14, minute: 45 },
		allDay: false,
		participants: [
			{
				id: 1,
				name: {
					firstName: "Samuel",
					lastName: "Watsica",
				},
				email: "Samuel_Watsica1@gmail.com",
				avatarUrl: "/assets/images/avatars/male/17.webp",
				role: "Principal Quality Technician",
			},
			{
				id: 2,
				name: {
					firstName: "Lena",
					lastName: "Koepp",
				},
				email: "Lena_Koepp@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/25.webp",
				role: "Investor Division Consultant",
			},
			{
				id: 3,
				name: {
					firstName: "Gregg",
					lastName: "Zboncak",
				},
				email: "Gregg_Zboncak@gmail.com",
				avatarUrl: "/assets/images/avatars/male/29.webp",
				role: "Regional Web Consultant",
			},
			{
				id: 4,
				name: {
					firstName: "Duane",
					lastName: "Gerlach",
				},
				email: "Duane.Gerlach86@yahoo.com",
				avatarUrl: "/assets/images/avatars/male/36.webp",
				role: "Central Implementation Producer",
			},
			{
				id: 5,
				name: {
					firstName: "Becky",
					lastName: "Kunde",
				},
				email: "Becky_Kunde@hotmail.com",
				avatarUrl: "/assets/images/avatars/female/39.webp",
				role: "Human Division Engineer",
			},
			{
				id: 6,
				name: {
					firstName: "Wanda",
					lastName: "Ankunding",
				},
				email: "Wanda_Ankunding93@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/39.webp",
				role: "Legacy Optimization Agent",
			},
			{
				id: 7,
				name: {
					firstName: "Sandy",
					lastName: "Waters",
				},
				email: "Sandy_Waters96@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/36.webp",
				role: "Investor Infrastructure Planner",
			},
		],
		tag: "Workshop",
	},
	{
		id: 5,
		title: "Sprint Kickoff",
		start: { hour: 15, minute: 0 },
		end: { hour: 16, minute: 0 },
		allDay: true,
		participants: [
			{
				id: 1,
				name: {
					firstName: "Kevin",
					lastName: "Nicolas",
				},
				email: "Kevin_Nicolas21@hotmail.com",
				avatarUrl: "/assets/images/avatars/male/28.webp",
				role: "District Metrics Developer",
			},
			{
				id: 2,
				name: {
					firstName: "Becky",
					lastName: "Kunde",
				},
				email: "Becky_Kunde@hotmail.com",
				avatarUrl: "/assets/images/avatars/female/39.webp",
				role: "Human Division Engineer",
			},
			{
				id: 3,
				name: {
					firstName: "Fredrick",
					lastName: "Ward",
				},
				email: "Fredrick.Ward@yahoo.com",
				avatarUrl: "/assets/images/avatars/male/39.webp",
				role: "Future Intranet Engineer",
			},
			{
				id: 4,
				name: {
					firstName: "Wanda",
					lastName: "Ankunding",
				},
				email: "Wanda_Ankunding93@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/39.webp",
				role: "Legacy Optimization Agent",
			},
		],
		tag: "Engineering",
	},
	{
		id: 6,
		title: "Feature Strategy Workshop",
		start: { hour: 16, minute: 15 },
		end: { hour: 17, minute: 0 },
		allDay: false,
		participants: [
			{
				id: 1,
				name: {
					firstName: "Kevin",
					lastName: "Nicolas",
				},
				email: "Kevin_Nicolas21@hotmail.com",
				avatarUrl: "/assets/images/avatars/male/28.webp",
				role: "District Metrics Developer",
			},
			{
				id: 2,
				name: {
					firstName: "Lena",
					lastName: "Koepp",
				},
				email: "Lena_Koepp@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/25.webp",
				role: "Investor Division Consultant",
			},
			{
				id: 3,
				name: {
					firstName: "Wanda",
					lastName: "Ankunding",
				},
				email: "Wanda_Ankunding93@yahoo.com",
				avatarUrl: "/assets/images/avatars/female/39.webp",
				role: "Legacy Optimization Agent",
			},
		],
		tag: "Quarterly",
	},
	{
		id: 7,
		title: "Leadership Checkpoint",
		start: { hour: 17, minute: 30 },
		end: { hour: 18, minute: 15 },
		allDay: false,
		participants: [
			{
				id: 1,
				name: {
					firstName: "Kevin",
					lastName: "Nicolas",
				},
				email: "Kevin_Nicolas21@hotmail.com",
				avatarUrl: "/assets/images/avatars/male/28.webp",
				role: "District Metrics Developer",
			},
			{
				id: 2,
				name: {
					firstName: "Randal",
					lastName: "Runte-Dibbert",
				},
				email: "Randal_Runte-Dibbert51@gmail.com",
				avatarUrl: "/assets/images/avatars/male/9.webp",
				role: "Forward Research Analyst",
			},
			{
				id: 3,
				name: {
					firstName: "Willie",
					lastName: "Kihn",
				},
				email: "Willie_Kihn@yahoo.com",
				avatarUrl: "/assets/images/avatars/male/1.webp",
				role: "National Solutions Engineer",
			},
			{
				id: 4,
				name: {
					firstName: "Brandon",
					lastName: "Deckow",
				},
				email: "Brandon.Deckow94@hotmail.com",
				avatarUrl: "/assets/images/avatars/male/33.webp",
				role: "Regional Response Associate",
			},
			{
				id: 5,
				name: {
					firstName: "Becky",
					lastName: "Kunde",
				},
				email: "Becky_Kunde@hotmail.com",
				avatarUrl: "/assets/images/avatars/female/39.webp",
				role: "Human Division Engineer",
			},
		],
		tag: "Review",
	},
];
