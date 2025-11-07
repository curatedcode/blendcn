import { IconBell, IconCloud, IconFolderCode } from "@tabler/icons-react";
import {
	ArrowUpRightIcon,
	PlusIcon,
	RefreshCcwIcon,
	SearchIcon,
} from "lucide-react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "~/components/ui/empty";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "~/components/ui/input-group";
import { Kbd } from "~/components/ui/kbd";

export function EmptyPreview() {
	return (
		<ComponentAccordionGroup title="Empty">
			<ComponentAccordionSubGroup title="Default">
				<EmptyDefault />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Outline">
				<EmptyOutline />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Background">
				<EmptyBackground />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Avatar">
				<EmptyAvatar />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Avatar Group">
				<EmptyAvatarGroup />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Input Group">
				<EmptyInputGroup />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function EmptyDefault() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconFolderCode />
				</EmptyMedia>
				<EmptyTitle>No Projects Yet</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any projects yet. Get started by creating
					your first project.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="flex gap-2">
					<Button>Create Project</Button>
					<Button variant="outline">Import Project</Button>
				</div>
			</EmptyContent>
			<Button
				variant="link"
				asChild
				className="text-muted-foreground"
				size="sm"
			>
				{/** biome-ignore lint/a11y/useValidAnchor: Just for demo. not an actual link */}
				<a href="#">
					Learn More <ArrowUpRightIcon />
				</a>
			</Button>
		</Empty>
	);
}

function EmptyOutline() {
	return (
		<Empty className="border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconCloud />
				</EmptyMedia>
				<EmptyTitle>Cloud Storage Empty</EmptyTitle>
				<EmptyDescription>
					Upload files to your cloud storage to access them anywhere.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="outline" size="sm">
					Upload Files
				</Button>
			</EmptyContent>
		</Empty>
	);
}

function EmptyBackground() {
	return (
		<Empty className="h-full bg-gradient-to-b from-30% from-muted/50 to-background">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconBell />
				</EmptyMedia>
				<EmptyTitle>No Notifications</EmptyTitle>
				<EmptyDescription>
					You&apos;re all caught up. New notifications will appear here.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="outline" size="sm">
					<RefreshCcwIcon />
					Refresh
				</Button>
			</EmptyContent>
		</Empty>
	);
}

function EmptyAvatar() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="default">
					<Avatar className="size-12">
						<AvatarImage
							src="https://github.com/shadcn.png"
							className="grayscale"
						/>
						<AvatarFallback>LR</AvatarFallback>
					</Avatar>
				</EmptyMedia>
				<EmptyTitle>User Offline</EmptyTitle>
				<EmptyDescription>
					This user is currently offline. You can leave a message to notify them
					or try again later.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button size="sm">Leave Message</Button>
			</EmptyContent>
		</Empty>
	);
}

function EmptyAvatarGroup() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia>
					<div className="-space-x-2 flex *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage
								src="https://github.com/maxleiter.png"
								alt="@maxleiter"
							/>
							<AvatarFallback>LR</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage
								src="https://github.com/evilrabbit.png"
								alt="@evilrabbit"
							/>
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
					</div>
				</EmptyMedia>
				<EmptyTitle>No Team Members</EmptyTitle>
				<EmptyDescription>
					Invite your team to collaborate on this project.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button size="sm">
					<PlusIcon />
					Invite Members
				</Button>
			</EmptyContent>
		</Empty>
	);
}

function EmptyInputGroup() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>404 - Not Found</EmptyTitle>
				<EmptyDescription>
					The page you&apos;re looking for doesn&apos;t exist. Try searching for
					what you need below.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<InputGroup className="sm:w-3/4">
					<InputGroupInput placeholder="Try searching for pages..." />
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupAddon align="inline-end">
						<Kbd>/</Kbd>
					</InputGroupAddon>
				</InputGroup>
				<EmptyDescription>
					Need help? {/** biome-ignore lint/a11y/useValidAnchor: Demo link. */}
					<a href="#">Contact support</a>
				</EmptyDescription>
			</EmptyContent>
		</Empty>
	);
}
