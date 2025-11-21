import dayjs from "dayjs";
import * as React from "react";
import { demoProjects } from "~/components/demo-app/demo-data";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

const AppSidebar = React.lazy(() =>
	import("~/components/demo-app/app-sidebar").then((module) => ({
		default: module.AppSidebar,
	})),
);
const TasksSection = React.lazy(() =>
	import("~/components/demo-app/tasks-section").then((module) => ({
		default: module.TasksSection,
	})),
);
const GoalsSection = React.lazy(() =>
	import("~/components/demo-app/goals-section").then((module) => ({
		default: module.GoalsSection,
	})),
);
const RemindersSection = React.lazy(() =>
	import("~/components/demo-app/reminders-section").then((module) => ({
		default: module.RemindersSection,
	})),
);
const EmptySection = React.lazy(() =>
	import("~/components/demo-app/empty-section").then((module) => ({
		default: module.EmptySection,
	})),
);
const ProjectsSection = React.lazy(() =>
	import("~/components/demo-app/projects-section").then((module) => ({
		default: module.ProjectsSection,
	})),
);
const CalendarSection = React.lazy(() =>
	import("~/components/demo-app/calendar-section").then((module) => ({
		default: module.CalendarSection,
	})),
);
const ChartSection = React.lazy(() =>
	import("~/components/demo-app/chart-section").then((module) => ({
		default: module.ChartSection,
	})),
);
const WorkspaceSettingsSection = React.lazy(() =>
	import("~/components/demo-app/workspace-settings-section").then((module) => ({
		default: module.WorkspaceSettingsSection,
	})),
);

export function DemoApp() {
	return (
		<SidebarProvider>
			<React.Suspense>
				<AppSidebar className="absolute" projects={demoProjects} />
			</React.Suspense>
			<div
				className={cn(
					"relative flex w-full flex-1 flex-col bg-sidebar",
					"md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl",
				)}
			>
				<div className="flex h-16 shrink-0 flex-col justify-center gap-2 px-2.5 md:px-4">
					<div className="flex items-center gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">Home</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Dashboard</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</div>
				<div className="mb-4 pl-3 md:pl-5">
					<span className="font-medium text-sm">
						{dayjs().format("dddd, MMM D")}
					</span>
				</div>
				<div className="mx-auto w-full max-w-desktop">
					<div className="flex flex-col gap-8 p-2 pt-0 lg:flex-row lg:p-4 lg:*:basis-1/2">
						<div className="flex flex-col gap-8">
							<React.Suspense>
								<TasksSection />
							</React.Suspense>
							<React.Suspense>
								<GoalsSection />
							</React.Suspense>
							<React.Suspense>
								<RemindersSection />
							</React.Suspense>
							<React.Suspense>
								<EmptySection />
							</React.Suspense>
						</div>
						<div className="flex flex-col gap-8">
							<React.Suspense>
								<ProjectsSection />
							</React.Suspense>
							<React.Suspense>
								<CalendarSection />
							</React.Suspense>
							<React.Suspense>
								<ChartSection />
							</React.Suspense>
							<React.Suspense>
								<WorkspaceSettingsSection />
							</React.Suspense>
						</div>
					</div>
				</div>
			</div>
		</SidebarProvider>
	);
}
