import { getRouteApi } from "@tanstack/react-router";
import dayjs from "dayjs";
import advancedFormatPlugin from "dayjs/plugin/advancedFormat";
import { AppSidebar } from "~/components/demo-app/app-sidebar";
import { CalendarSection } from "~/components/demo-app/calendar-section";
import { ChartSection } from "~/components/demo-app/chart-section";
import { EmptySection } from "~/components/demo-app/empty-section";
import { GoalsSection } from "~/components/demo-app/goals-section";
import { ProjectsSection } from "~/components/demo-app/projects-section";
import { RemindersSection } from "~/components/demo-app/reminders-section";
import { TasksSection } from "~/components/demo-app/tasks-section";
import { WorkspaceSettingsSection } from "~/components/demo-app/workspace-settings-section";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";

dayjs.extend(advancedFormatPlugin);

export function DemoApp() {
	const routeApi = getRouteApi("/");
	const {
		userData,
		projects,
		tasks,
		goals,
		reminders,
		events,
		chartData,
		workspaceApiKeys,
		workspaceMembers,
	} = routeApi.useLoaderData();

	return (
		<SidebarProvider>
			<AppSidebar className="absolute" user={userData} projects={projects} />
			<SidebarInset className="bg-sidebar md:peer-data-[variant=inset]:shadow-none">
				<header className="flex h-16 shrink-0 flex-col justify-center gap-2 px-2.5 md:px-4">
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
				</header>
				<div className="mb-4 pl-3 md:pl-5">
					<span className="font-medium text-sm">
						{dayjs().format("ddd, MMMM Do")}
					</span>
				</div>
				<div className="mx-auto w-full max-w-desktop">
					<div className="flex flex-col gap-8 p-2 pt-0 lg:flex-row lg:p-4 lg:*:basis-1/2">
						<div className="flex flex-col gap-8">
							<TasksSection tasks={tasks} />
							<GoalsSection goals={goals} />
							<RemindersSection reminders={reminders} />
							<EmptySection />
						</div>
						<div className="flex flex-col gap-8">
							<ProjectsSection projects={projects} />
							<CalendarSection events={events} />
							<ChartSection data={chartData} />
							<WorkspaceSettingsSection
								apiKeys={workspaceApiKeys}
								members={workspaceMembers}
							/>
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
