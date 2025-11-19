import { IconGitBranch } from "@tabler/icons-react";
import {
	ArchiveIcon,
	ArrowLeftIcon,
	ArrowUpIcon,
	ArrowUpRightIcon,
	CalendarPlusIcon,
	CircleFadingArrowUpIcon,
	ClockIcon,
	ListFilterPlusIcon,
	MailCheckIcon,
	MoreHorizontalIcon,
	TagIcon,
	Trash2Icon,
} from "lucide-react";
import * as React from "react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Spinner } from "~/components/ui/spinner";

export function ButtonPreview() {
	return (
		<ComponentGroup title="Button" id="button-component">
			<ComponentGroupPreview>
				<div className="flex flex-wrap items-center gap-2 md:flex-row">
					<Button variant="outline">Button</Button>
					<Button variant="outline" size="icon" aria-label="Submit">
						<ArrowUpIcon />
					</Button>
				</div>
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Size">
					<div className="flex flex-col items-start gap-8">
						<div className="flex items-start gap-2">
							<Button size="sm" variant="outline">
								Small
							</Button>
							<Button size="icon-sm" aria-label="Submit" variant="outline">
								<ArrowUpRightIcon />
							</Button>
						</div>
						<div className="flex items-start gap-2">
							<Button variant="outline">Default</Button>
							<Button size="icon" aria-label="Submit" variant="outline">
								<ArrowUpRightIcon />
							</Button>
						</div>
						<div className="flex items-start gap-2">
							<Button variant="outline" size="lg">
								Large
							</Button>
							<Button size="icon-lg" aria-label="Submit" variant="outline">
								<ArrowUpRightIcon />
							</Button>
						</div>
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="Default">
					<Button>Button</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Outline">
					<Button variant="outline">Outline</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Secondary">
					<Button variant="secondary">Secondary</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Ghost">
					<Button variant="ghost">Ghost</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Destructive">
					<Button variant="destructive">Destructive</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Link">
					<Button variant="link">Link</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Icon">
					<Button variant="outline" size="icon">
						<CircleFadingArrowUpIcon />
					</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="With Icon">
					<Button variant="outline" size="sm">
						<IconGitBranch /> New Branch
					</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Rounded">
					<Button variant="outline" size="icon" className="rounded-full">
						<ArrowUpIcon />
					</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Spinner">
					<Button size="sm" variant="outline" disabled>
						<Spinner />
						Submit
					</Button>
				</ComponentGroupExample>
				<ComponentGroupExample title="Button Group">
					<ButtonGroupDemo />
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}

function ButtonGroupDemo() {
	const [label, setLabel] = React.useState("personal");
	return (
		<ButtonGroup>
			<ButtonGroup className="hidden sm:flex">
				<Button variant="outline" size="icon" aria-label="Go Back">
					<ArrowLeftIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">Archive</Button>
				<Button variant="outline">Report</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">Snooze</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" aria-label="More Options">
							<MoreHorizontalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-52">
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<MailCheckIcon />
								Mark as Read
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ArchiveIcon />
								Archive
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<ClockIcon />
								Snooze
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CalendarPlusIcon />
								Add to Calendar
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ListFilterPlusIcon />
								Add to List
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<TagIcon />
									Label As...
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									<DropdownMenuRadioGroup
										value={label}
										onValueChange={setLabel}
									>
										<DropdownMenuRadioItem value="personal">
											Personal
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="work">
											Work
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="other">
											Other
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem variant="destructive">
								<Trash2Icon />
								Trash
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</ButtonGroup>
		</ButtonGroup>
	);
}
