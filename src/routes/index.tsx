import { faker } from "@faker-js/faker";
import { createFileRoute } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import * as React from "react";
import { ColorContextProvider } from "~/components/color-context";
import { ColorMappingSection } from "~/components/color-mapping-section";
import { ColorPickerSection } from "~/components/color-picker-section";
import { ColorSwatchSection } from "~/components/color-swatch-section";
import {
	generateApiKeys,
	generateCalendarEvents,
	generateChartData,
	generateProjects,
	generateReminders,
	generateWorkspaceMembers,
	type Project,
} from "~/components/demo-app/demo-data";
import type { GoalsSection } from "~/components/demo-app/goals-section";
import { Logo } from "~/components/logo";
import { NoiseBackdrop } from "~/components/noise-backdrop";
import { ThemeExportDialog } from "~/components/theme-export-dialog";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Skeleton } from "~/components/ui/skeleton";

const DemoApp = React.lazy(() => import("~/components/demo-app"));

const getDemoAppData = createServerOnlyFn(() => {
	const projects = generateProjects();
	const reminders = generateReminders();
	const chartData = generateChartData(
		dayjs().subtract(3, "months").toDate(),
		new Date(),
	);
	const workspaceApiKeys = generateApiKeys();
	const workspaceMembers = generateWorkspaceMembers(
		faker.number.int({ min: 3, max: 6 }),
	);

	const tasks = projects.flatMap((v) => v.tasks);
	const goals: Parameters<typeof GoalsSection>[0]["goals"] = [];
	const teammates = new Set<Project["teammates"][number]>();

	for (const project of projects) {
		for (const goal of project.goals) {
			goals.push({
				project: {
					id: project.id,
					title: project.title,
					color: project.color,
				},
				...goal,
			});
		}
		for (const teammate of project.teammates) {
			teammates.add(teammate);
		}
	}

	const events = generateCalendarEvents({
		count: 12,
		events: [],
		startDate: dayjs().subtract(3, "days").toDate(),
		teammates: Array.from(teammates),
	});

	const userSex = faker.helpers.arrayElement(["male", "female"]);
	const userName = {
		firstName: faker.person.firstName(userSex),
		lastName: faker.person.lastName(userSex),
	};
	const userData = {
		name: userName,
		email: faker.internet.email({
			firstName: userName.firstName,
			lastName: userName.lastName,
		}),
		avatarUrl: `/assets/images/avatars/${userSex}/${faker.number.int({ min: 1, max: 40 })}.webp`,
	};

	return {
		userData,
		projects,
		reminders,
		chartData,
		workspaceApiKeys,
		workspaceMembers,
		tasks,
		goals,
		events,
	};
});

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: getDemoAppData,
});

function RouteComponent() {
	return (
		<ColorContextProvider>
			<div className="relative">
				<NoiseBackdrop />
				<div className="mx-auto min-h-screen max-w-desktop px-2 pt-20">
					<div className="flex flex-col items-center gap-6">
						<div className="mx-auto flex w-fit items-center gap-3.5">
							<Logo variant="transparent" className="size-22 md:size-24" />
							<div>
								<span className="font-semibold text-2xl md:text-3xl">
									BlendCN
								</span>
								<p className="text-muted-foreground text-sm md:text-base">
									Radix-based theme builder <br /> with live shadcn/ui previews.
								</p>
							</div>
						</div>
						<div className="mb-6 grid w-fit gap-2">
							<ThemeSwitcher />
							<ThemeExportDialog />
						</div>
						<ColorPickerSection />
						<ColorSwatchSection />
						<ColorMappingSection />
					</div>
				</div>
			</div>
			<React.Suspense
				fallback={<Skeleton className="h-screen w-full bg-muted" />}
			>
				<DemoApp />
			</React.Suspense>
		</ColorContextProvider>
	);
}
