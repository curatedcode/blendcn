import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

const projectTitles = [
	"Website Redesign",
	"Mobile App",
	"Client Onboarding",
	"Data Migration",
	"Marketing Campaign",
	"User Research",
	"Internal Process",
	"Feature Rollout",
	"Cross-Team Plan",
	"Quarterly Review",
	"Customer Feedback",
	"New Hire Training",
	"API Integration",
	"ARIA Improvements",
	"Security Review",
	"Sales Package",
	"Content Strategy",
	"Operational Study",
	"Infra Modernization",
	"Customer Success",
	"Dashboard Reporting",
	"Quality Assurance",
	"Vendor Selection",
	"Knowledge Base",
	"Workflow Setup",
	"Product Alignment",
	"Brand Guidelines",
	"Service Improvement",
	"Release Cycle",
	"Locale Expansion",
];

export type Project = {
	id: string;
	title: string;
	color: string;
	tasks: {
		id: string;
		title: string;
		stage: "in-progress" | "to-do" | "upcoming";
		dueDate: Date;
		priority: "low" | "medium" | "high";
	}[];
	teammates: {
		id: string;
		name: { firstName: string; lastName: string };
		email: string;
		avatarUrl: string;
		role: string;
	}[];
	goals: { id: string; title: string; tasks: number; completion: number }[];
};

/**
 * Generates a set of projects with titles from a pre-defined list.
 * @param count - Number of projects to create (max=30)
 */
export function generateProjects(count = 3, arr: Project[] = []): Project[] {
	if (count > projectTitles.length)
		throw new Error(
			`Attempted to generate too many (${count}). Max is (${apiKeys.length}).`,
		);
	if (arr.length === count) return arr;

	const getRandomTitle = () => faker.helpers.arrayElement(projectTitles);
	let title = getRandomTitle();

	while (arr.find((task) => task.title === title)) {
		title = getRandomTitle();
	}

	arr.push({
		id: faker.string.uuid(),
		title,
		color: faker.color.rgb(),
		tasks: generateTasks(faker.number.int({ min: 3, max: 8 })),
		// do not increase max beyond 40 unless you add more sex specific avatar images
		teammates: generateTeammates(faker.number.int({ min: 3, max: 10 })),
		goals: generateGoals(faker.number.int({ min: 1, max: 3 })),
	});

	return generateProjects(count, arr);
}

const goalTitles = [
	"Finalize sprint planning outline",
	"Draft project kickoff summary",
	"Refine feature requirements list",
	"Prepare resource allocation plan",
	"Outline risks for upcoming milestone",
	"Summarize feedback from stakeholders",
	"Compile weekly project highlights",
	"Draft onboarding guide for new contributors",
	"Update roadmap for next quarter",
	"Review open action items",
	"Prepare change-request notes",
	"Create backlog prioritization list",
	"Organize project reference materials",
	"Draft test plan for new release",
	"Check progress against current milestone",
	"Prepare timeline adjustment proposal",
	"Review dependencies across teams",
	"Outline communication plan for launch",
	"Prepare cost estimate update",
	"Draft acceptance criteria for tasks",
	"Review vendor deliverables summary",
	"Organize documentation for handoff",
	"Outline quality assurance checklist",
	"Summarize decisions from last workshop",
	"Prepare rollout steps for pilot phase",
	"Draft lessons-learned notes",
	"Review compliance requirements",
	"Outline success metrics for project phase",
	"Prepare risk mitigation update",
	"Draft integration plan for new component",
];

/**
 * Generates a set of goals with titles from a pre-defined list.
 * @param count - Number of goals to create (max=30)
 */
function generateGoals(
	count: number,
	arr: Project["goals"] = [],
): Project["goals"] {
	if (count > goalTitles.length)
		throw new Error(
			`Attempted to generate too many (${count}). Max is (${apiKeys.length}).`,
		);
	if (arr.length === count) return arr;

	const getRandomTitle = () => faker.helpers.arrayElement(goalTitles);
	let title = getRandomTitle();

	while (arr.find((v) => v.title === title)) {
		title = getRandomTitle();
	}

	arr.push({
		id: faker.string.uuid(),
		title,
		tasks: faker.number.int({ min: 2, max: 32 }),
		completion: faker.number.int(100),
	});

	return generateGoals(count, arr);
}

const taskTitles = [
	"Prep client report",
	"Email follow-ups",
	"Team sync notes",
	"Update project timeline",
	"Review pull requests",
	"Prep slide deck",
	"Check analytics dashboard",
	"Write feature brief",
	"Clean up Jira board",
	"Schedule user interviews",
	"Test staging build",
	"Process invoices",
	"Draft internal update",
	"Organize shared drive",
	"Prep meeting agenda",
	"Optimize ad campaigns",
	"Document API changes",
	"QA content updates",
	"Sync with design",
	"Update CRM records",
	"Check compliance tasks",
	"Prep data export",
	"Organize training materials",
	"Fix spreadsheet formulas",
	"Review contracts",
	"Set up automation rules",
	"Check server logs",
	"Write bug reproduction steps",
	"Evaluate vendor proposals",
	"Draft social posts",
];

/**
 * Generates a set of tasks with titles from a pre-defined list.
 * @param count - Number of tasks to create (max=30)
 */
function generateTasks(
	count: number,
	arr: Project["tasks"] = [],
): Project["tasks"] {
	if (count > taskTitles.length)
		throw new Error(
			`Attempted to generate too many (${count}). Max is (${apiKeys.length}).`,
		);
	if (arr.length === count) return arr;

	const getRandomTitle = () => faker.helpers.arrayElement(taskTitles);
	let title = getRandomTitle();

	while (arr.find((v) => v.title === title)) {
		title = getRandomTitle();
	}

	arr.push({
		id: faker.string.uuid(),
		title,
		stage: faker.helpers.arrayElement(["in-progress", "to-do", "upcoming"]),
		dueDate: faker.datatype.boolean(0.8)
			? faker.date.soon({ days: 4 })
			: faker.date.recent({ days: 4 }),
		priority: faker.helpers.arrayElement(["low", "medium", "high"]),
	});

	return generateTasks(count, arr);
}

function generateTeammates(
	count: number,
	arr: Project["teammates"] = [],
): Project["teammates"] {
	if (arr.length === count) return arr;

	const sex = faker.helpers.arrayElement(["male", "female"]);

	const getRandomName = () => ({
		firstName: faker.person.firstName(sex),
		lastName: faker.person.lastName(sex),
	});
	let name = getRandomName();

	while (arr.find((v) => v.name === name)) {
		name = getRandomName();
	}

	const getRandomAvatarUrl = () =>
		`/assets/images/avatars/${sex}/${faker.number.int({ min: 1, max: 40 })}.webp`;
	let avatarUrl = getRandomAvatarUrl();

	while (arr.find((v) => v.avatarUrl === avatarUrl)) {
		avatarUrl = getRandomAvatarUrl();
	}

	arr.push({
		id: faker.string.uuid(),
		name,
		email: faker.internet.email({
			firstName: name.firstName,
			lastName: name.lastName,
		}),
		avatarUrl,
		role: faker.person.jobTitle(),
	});

	return generateTeammates(count, arr);
}

const eventTitles = [
	"Team Standup",
	"Client Check-In Call",
	"Project Planning Session",
	"Weekly Sync",
	"Code Review Block",
	"Marketing Brief Review",
	"Design Handoff",
	"Team Lunch",
	"Product Review",
	"Stakeholder Meeting",
	"Data Sync Review",
	"Team Retrospective",
	"Monthly Planning",
	"Budget Review",
	"Vendor Check-In",
	"Development Prioritization",
	"Onboarding Session",
	"Cross-Team Sync",
	"Research Review",
	"Sales Alignment",
	"Content Audit",
	"Quarterly Roadmap Prep",
	"Team Standup",
	"Client Brief Review",
	"Sprint Kickoff",
	"UX Review",
	"Analytics Deep Dive",
	"Team Workshop",
	"Leadership Checkpoint",
	"Product Demos",
	"Tech Debt Review",
	"Team Retrospective",
	"Roadmap Alignment",
	"Creative Review",
	"Performance Check-In",
	"Backend Review",
	"Compliance Review",
	"Team Training",
	"Documentation Update",
	"Vendor Demo",
	"Team Standup",
	"Content Planning",
	"Infrastructure Check",
	"Feature Strategy Workshop",
	"Leadership Sync",
	"QA Testing Block",
	"Customer Success Review",
	"Team Strategy Review",
];

const eventTagTitles = [
	"Internal",
	"Mandatory",
	"Optional",
	"Training",
	"Workshop",
	"Meeting",
	"Review",
	"Planning",
	"Strategy",
	"Onboarding",
	"Compliance",
	"Finance",
	"HR",
	"Engineering",
	"Marketing",
	"Sales",
	"Standup",
	"Deadline",
	"Launch",
	"Quarterly",
	"Annual",
	"Remote",
	"Confidential",
	"Executive",
	"Client",
	"Project",
	"Performance",
];

export type CalendarEvent = {
	id: string;
	title: string;
	start: Date;
	end: Date;
	allDay?: boolean;
	participants: Project["teammates"];
	tag?: string;
};

type GenerateCalendarEventsParams = {
	count: number;
	events: CalendarEvent[];
	startDate: Date;
	teammates: Project["teammates"];
};

/**
 * Generates a set of calendar events with titles from a pre-defined list.
 * @param count - Number of calendar events to create (max=30)
 */
export function generateCalendarEvents({
	count,
	events,
	startDate,
	teammates,
}: GenerateCalendarEventsParams): CalendarEvent[] {
	if (count > eventTitles.length)
		throw new Error(
			`Attempted to generate too many (${count}). Max is (${apiKeys.length}).`,
		);
	if (events.length === count) return events;

	const getRandomTitle = () => faker.helpers.arrayElement(eventTitles);
	let title = getRandomTitle();

	while (events.find((v) => v.title === title)) {
		title = getRandomTitle();
	}

	// want more hourly events than all day ones
	const isAllDay = faker.datatype.boolean(0.1);
	const duration = faker.number.int({ min: 15, max: 180, multipleOf: 15 });

	let eventStart = dayjs(startDate);

	if (isAllDay) {
		eventStart = eventStart.startOf("day");
	} else {
		// only want 9am-5pm (may go slight over from duration length)
		const randomHour = faker.number.int({ min: 9, max: 17 });
		eventStart = eventStart.set("hour", randomHour).set("minute", 0);
	}

	const participants: Project["teammates"] = [];

	const getRandomPerson = () => faker.helpers.arrayElement(teammates);

	let i = 0;
	while (i < faker.number.int({ min: 2, max: 8 })) {
		const person = getRandomPerson();
		if (participants.find((v) => v === person)) continue;
		participants.push(person);
		i++;
	}

	events.push({
		id: faker.string.uuid(),
		title,
		start: eventStart.toDate(),
		end: eventStart.add(duration, "minutes").toDate(),
		allDay: isAllDay,
		participants,
		tag: faker.datatype.boolean(30)
			? faker.helpers.arrayElement(eventTagTitles)
			: undefined,
	});

	// one event per day
	return generateCalendarEvents({
		count,
		events,
		startDate: eventStart.add(1, "day").toDate(),
		teammates,
	});
}

const reminderTitles = [
	"Review updates shared during the morning sync",
	"Prepare talking points for the afternoon check-in",
	"Confirm deadlines for this week’s deliverables",
	"Revisit open action items from yesterday",
	"Check progress on pending approvals",
	"Outline questions for the client call",
	"Verify data accuracy before generating reports",
	"Draft summary notes for the project team",
	"Reassess sprint priorities after feedback",
	"Follow up with stakeholders on requirements",
	"Log new tasks discussed in today’s meeting",
	"Check for blockers reported by the engineering team",
	"Review design revisions before sign-off",
	"Prepare agenda items for tomorrow’s planning session",
	"Confirm meeting slots with cross-functional teams",
	"Evaluate workload distribution for the week",
	"Check status of outstanding support tickets",
	"Organize documentation updates flagged today",
	"List key decisions made during the workshop",
	"Revalidate metrics pulled from the analytics dashboard",
	"Prepare summary for weekly leadership update",
	"Ensure all project trackers are up to date",
	"Review feedback collected from user tests",
	"Verify milestone progress ahead of Friday review",
	"Set reminders for upcoming renewal deadlines",
	"Note follow-ups needed after the vendor demo",
	"Outline discussion points for the next retro",
	"Reconfirm resource availability for next sprint",
	"Identify any new blockers raised today",
	"Check calendar for overlapping meetings tomorrow",
];

export type Reminder = {
	id: string;
	title: string;
	dueDate: Date;
};

/**
 * Generates a set of reminders with titles from a pre-defined list.
 * @param count - Number of reminders to create (default=4-10; max=30)
 */
export function generateReminders(
	count = faker.number.int({ min: 4, max: 10 }),
	arr: Reminder[] = [],
): Reminder[] {
	if (count > reminderTitles.length)
		throw new Error(
			`Attempted to generate too many (${count}). Max is (${apiKeys.length}).`,
		);
	if (arr.length === count) return arr;

	const getRandomTitle = () => faker.helpers.arrayElement(reminderTitles);
	let title = getRandomTitle();

	while (arr.find((v) => v.title === title)) {
		title = getRandomTitle();
	}

	// 2 reminders for the current day
	const dueDate =
		arr.length < 2 ? dayjs().toDate() : faker.date.soon({ days: 5 });

	arr.push({
		id: faker.string.uuid(),
		title,
		dueDate,
	});

	return generateReminders(count, arr);
}

export type ChartVisitorsData = {
	date: string;
	desktop: number;
	mobile: number;
}[];

export function generateChartData(startDate: Date, endDate: Date) {
	const start = dayjs(startDate);
	const end = dayjs(endDate);
	const difference = end.diff(start, "day");

	const data: ChartVisitorsData = [];

	for (let i = 0; i < difference; i++) {
		data.push({
			date: start.add(i, "day").format("YYYY-MM-DD"),
			desktop: faker.number.int({ min: 59, max: 497 }),
			mobile: faker.number.int({ min: 59, max: 497 }),
		});
	}

	return data;
}

const apiKeys = [
	"nerdPGNz5IsrVOU",
	"2rcVob1cGhsb94b",
	"844cmTMjIlkAJEf",
	"WmlAQ3oO8DHR4eV",
	"FECqLi7BFMCjetk",
	"YqVpyQRN4FEQy6i",
	"mG68H0RsBOPxJKv",
	"gr9M6DQeSL9CnAk",
	"C2v1LZuSLw9LeEM",
	"CWoqrWzrTjAT5Mf",
	"8KuZfqK9yCzduWz",
	"pi5IvGhDdjiA2UM",
	"h0xAulvOR9Od9lA",
	"o5bEcCYBGhcGRG0",
	"hdaCpXaY42M65R6",
	"ybBXsycQoovgihv",
	"Rfs0wsC8VkCqmLg",
	"UTlmBUtlHWTWiJL",
	"yrWh2dadIvbpXEh",
	"yzXf2R9mr2ZcD9Y",
	"YnxrgEHwOJ1ynZp",
	"h64NQNXw9dLzEVN",
	"85jUOpuRRGGc4qN",
	"wpprGAcvvLdmJCY",
	"w3qlu2hFHmhgIfj",
	"HGFf6aQV7SB0ffZ",
	"RSQV4UNCQRCOgBN",
	"gR9yXKA95kphymx",
	"BUR0qUi4krtpHXx",
	"vJN8azXhEwudXzf",
];

/**
 * Generates a set of api keys from a pre-defined list.
 * @param count - Number of api keys to create (default=4-6; max=30)
 */
export function generateApiKeys(
	count = faker.number.int({ min: 4, max: 6 }),
	arr: string[] = [],
) {
	if (count > apiKeys.length)
		throw new Error(
			`Attempted to generate too many (${count}). Max is (${apiKeys.length}).`,
		);
	if (arr.length === count) return arr;

	const getRandomKey = () => faker.helpers.arrayElement(apiKeys);
	let key = getRandomKey();

	while (arr.includes(key)) {
		key = getRandomKey();
	}

	arr.push(key);

	return generateApiKeys(count, arr);
}

export type Member = {
	id: string;
	name: {
		firstName: string;
		lastName: string;
	};
	email: string;
	avatarUrl: string;
	role: "admin" | "manager" | "member";
};

export function generateWorkspaceMembers(
	count: number,
	arr: Member[] = [],
): Member[] {
	if (arr.length === count) return arr;

	const sex = faker.helpers.arrayElement(["male", "female"]);

	const getRandomName = () => ({
		firstName: faker.person.firstName(sex),
		lastName: faker.person.lastName(sex),
	});
	let name = getRandomName();

	while (arr.find((v) => v.name === name)) {
		name = getRandomName();
	}

	const getRandomAvatarUrl = () =>
		`/assets/images/avatars/${sex}/${faker.number.int({ min: 1, max: 40 })}.webp`;
	let avatarUrl = getRandomAvatarUrl();

	while (arr.find((v) => v.avatarUrl === avatarUrl)) {
		avatarUrl = getRandomAvatarUrl();
	}

	arr.push({
		id: faker.string.uuid(),
		name,
		email: faker.internet.email({
			firstName: name.firstName,
			lastName: name.lastName,
		}),
		avatarUrl,
		role: faker.helpers.arrayElement(["admin", "manager", "member"]),
	});

	return generateWorkspaceMembers(count, arr);
}
