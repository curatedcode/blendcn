/** biome-ignore-all lint/a11y/useValidAnchor: demo links */
import type { LucideIcon } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		icon: LucideIcon;
		isActive?: boolean;
	}[];
}) {
	return (
		<SidebarMenu>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild isActive={item.isActive}>
						<a href="#">
							<item.icon />
							<span>{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
