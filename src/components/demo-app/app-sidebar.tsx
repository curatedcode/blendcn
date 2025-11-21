/** biome-ignore-all lint/a11y/useValidAnchor: Demo links */
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

const navData = {
	main: [
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
	secondary: [
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

const userData = {
	name: {
		firstName: "Denise",
		lastName: "Grimes",
	},
	email: "Denise.Grimes@yahoo.com",
	avatarUrl: "/assets/images/avatars/female/14.webp",
};

export function AppSidebar({
	projects,
	...props
}: React.ComponentProps<typeof Sidebar> & {
	projects: { id: number; title: string; color: string }[];
}) {
	const { state } = useSidebar();

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
						<NavMain items={navData.main} />
						<NavProjects projects={projects} />
						<NavSecondary items={navData.secondary} className="mt-auto" />
					</SidebarContent>
					<SidebarFooter>
						<NavUser user={userData} />
					</SidebarFooter>
				</Sidebar>
			</div>
		</div>
	);
}
