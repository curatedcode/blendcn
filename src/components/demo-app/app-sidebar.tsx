/** biome-ignore-all lint/a11y/useValidAnchor: Demo links */

import { faker } from "@faker-js/faker";
import {
	CalendarDaysIcon,
	ClipboardListIcon,
	CommandIcon,
	HomeIcon,
	InboxIcon,
	LifeBuoyIcon,
	SendIcon,
} from "lucide-react";
import type * as React from "react";
import type { Project } from "~/components/demo-app/demo-data";
import { NavMain } from "~/components/demo-app/nav-main";
import { NavProjects } from "~/components/demo-app/nav-projects";
import { NavSecondary } from "~/components/demo-app/nav-secondary";
import { NavUser } from "~/components/demo-app/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "~/components/ui/sidebar";

export function AppSidebar({
	projects,
	...props
}: React.ComponentProps<typeof Sidebar> & {
	projects: Project[];
}) {
	const { state } = useSidebar();

	const userSex = faker.helpers.arrayElement(["male", "female"]);
	const user = {
		firstName: faker.person.firstName(userSex),
		lastName: faker.person.lastName(userSex),
	};

	const data = {
		user: {
			name: `${user.firstName} ${user.lastName}`,
			email: faker.internet.email({
				firstName: user.firstName,
				lastName: user.lastName,
			}),
			avatarUrl: `/assets/images/avatars/${userSex}/${faker.number.int({ min: 1, max: 40 })}.webp`,
		},
		navMain: [
			{
				title: "Home",
				icon: HomeIcon,
				isActive: true,
			},
			{
				title: "My Tasks",
				icon: ClipboardListIcon,
			},
			{
				title: "Inbox",
				icon: InboxIcon,
			},
			{
				title: "Calendar",
				icon: CalendarDaysIcon,
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoyIcon,
			},
			{
				title: "Feedback",
				url: "#",
				icon: SendIcon,
			},
		],
	};

	return (
		<div
			className="peer sticky top-0 max-h-svh"
			data-variant="inset"
			data-state={state}
			data-collapsible={state === "collapsed" ? "offcanvas" : undefined}
		>
			<div className="relative h-full">
				<Sidebar className="absolute inset-0" variant="inset" {...props}>
					<SidebarHeader>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton size="lg" asChild>
									<a href="#">
										<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
											<CommandIcon className="size-4" />
										</div>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">Acme Inc</span>
											<span className="truncate text-xs">Enterprise</span>
										</div>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarHeader>
					<SidebarContent>
						<NavMain items={data.navMain} />
						<NavProjects projects={projects} />
						<NavSecondary items={data.navSecondary} className="mt-auto" />
					</SidebarContent>
					<SidebarFooter>
						<NavUser user={data.user} />
					</SidebarFooter>
				</Sidebar>
			</div>
		</div>
	);
}
