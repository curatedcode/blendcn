import { IconPlus } from "@tabler/icons-react";
import {
	AlertTriangleIcon,
	ArchiveIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	AudioLinesIcon,
	BotIcon,
	CalendarPlusIcon,
	CheckIcon,
	ChevronDownIcon,
	ClockIcon,
	CopyIcon,
	ListFilterPlusIcon,
	MailCheckIcon,
	MinusIcon,
	MoreHorizontalIcon,
	PlusIcon,
	SearchIcon,
	ShareIcon,
	TagIcon,
	Trash2Icon,
	TrashIcon,
	UserRoundXIcon,
	VolumeOffIcon,
} from "lucide-react";
import * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Button } from "~/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "~/components/ui/button-group";
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
import { Input } from "~/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "~/components/ui/input-group";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

export function ButtonGroupPreview() {
	return (
		<ComponentAccordionGroup title="Button Group">
			<ComponentAccordionSubGroup title="Default">
				<ButtonGroupDefault />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Orientation">
				<ButtonGroupOrientation />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Size">
				<ButtonGroupSize />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Nested">
				<ButtonGroupNested />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Separator">
				<ButtonGroupSeparatorDemo />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Split">
				<ButtonGroupSplit />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Input">
				<ButtonGroupInput />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Input Group">
				<ButtonGroupInputGroup />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Dropdown">
				<ButtonGroupDropdown />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Select">
				<ButtonGroupSelect />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Popover">
				<ButtonGroupPopover />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function ButtonGroupDefault() {
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

function ButtonGroupOrientation() {
	return (
		<ButtonGroup
			orientation="vertical"
			aria-label="Media controls"
			className="mx-auto h-fit"
		>
			<Button variant="outline" size="icon">
				<PlusIcon />
			</Button>
			<Button variant="outline" size="icon">
				<MinusIcon />
			</Button>
		</ButtonGroup>
	);
}

function ButtonGroupSize() {
	return (
		<div className="flex flex-col items-start gap-8">
			<ButtonGroup>
				<Button variant="outline" size="sm">
					Small
				</Button>
				<Button variant="outline" size="sm">
					Button
				</Button>
				<Button variant="outline" size="sm">
					Group
				</Button>
				<Button variant="outline" size="icon-sm">
					<PlusIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Button</Button>
				<Button variant="outline">Group</Button>
				<Button variant="outline" size="icon">
					<PlusIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline" size="lg">
					Large
				</Button>
				<Button variant="outline" size="lg">
					Button
				</Button>
				<Button variant="outline" size="lg">
					Group
				</Button>
				<Button variant="outline" size="icon-lg">
					<PlusIcon />
				</Button>
			</ButtonGroup>
		</div>
	);
}

function ButtonGroupNested() {
	return (
		<ButtonGroup>
			<ButtonGroup>
				<Button variant="outline" size="sm">
					1
				</Button>
				<Button variant="outline" size="sm">
					2
				</Button>
				<Button variant="outline" size="sm">
					3
				</Button>
				<Button variant="outline" size="sm">
					4
				</Button>
				<Button variant="outline" size="sm">
					5
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline" size="icon-sm" aria-label="Previous">
					<ArrowLeftIcon />
				</Button>
				<Button variant="outline" size="icon-sm" aria-label="Next">
					<ArrowRightIcon />
				</Button>
			</ButtonGroup>
		</ButtonGroup>
	);
}

function ButtonGroupSeparatorDemo() {
	return (
		<ButtonGroup>
			<Button variant="secondary" size="sm">
				Copy
			</Button>
			<ButtonGroupSeparator />
			<Button variant="secondary" size="sm">
				Paste
			</Button>
		</ButtonGroup>
	);
}

function ButtonGroupSplit() {
	return (
		<ButtonGroup>
			<Button variant="secondary">Button</Button>
			<ButtonGroupSeparator />
			<Button size="icon" variant="secondary">
				<IconPlus />
			</Button>
		</ButtonGroup>
	);
}

function ButtonGroupInput() {
	return (
		<ButtonGroup>
			<Input placeholder="Search..." />
			<Button variant="outline" aria-label="Search">
				<SearchIcon />
			</Button>
		</ButtonGroup>
	);
}

function ButtonGroupInputGroup() {
	const [voiceEnabled, setVoiceEnabled] = React.useState(false);
	return (
		<ButtonGroup className="[--radius:9999rem]">
			<ButtonGroup>
				<Button variant="outline" size="icon">
					<PlusIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<InputGroup>
					<InputGroupInput
						placeholder={
							voiceEnabled ? "Record and send audio..." : "Send a message..."
						}
						disabled={voiceEnabled}
					/>
					<InputGroupAddon align="inline-end">
						<Tooltip>
							<TooltipTrigger asChild>
								<InputGroupButton
									onClick={() => setVoiceEnabled(!voiceEnabled)}
									size="icon-xs"
									data-active={voiceEnabled}
									className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
									aria-pressed={voiceEnabled}
								>
									<AudioLinesIcon />
								</InputGroupButton>
							</TooltipTrigger>
							<TooltipContent>Voice Mode</TooltipContent>
						</Tooltip>
					</InputGroupAddon>
				</InputGroup>
			</ButtonGroup>
		</ButtonGroup>
	);
}

function ButtonGroupDropdown() {
	return (
		<ButtonGroup>
			<Button variant="outline">Follow</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="!pl-2">
						<ChevronDownIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="[--radius:1rem]">
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<VolumeOffIcon />
							Mute Conversation
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CheckIcon />
							Mark as Read
						</DropdownMenuItem>
						<DropdownMenuItem>
							<AlertTriangleIcon />
							Report Conversation
						</DropdownMenuItem>
						<DropdownMenuItem>
							<UserRoundXIcon />
							Block User
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ShareIcon />
							Share Conversation
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CopyIcon />
							Copy Conversation
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem variant="destructive">
							<TrashIcon />
							Delete Conversation
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</ButtonGroup>
	);
}

const CURRENCIES = [
	{
		value: "$",
		label: "US Dollar",
	},
	{
		value: "€",
		label: "Euro",
	},
	{
		value: "£",
		label: "British Pound",
	},
];

function ButtonGroupSelect() {
	const [currency, setCurrency] = React.useState("$");
	return (
		<ButtonGroup>
			<ButtonGroup>
				<Select value={currency} onValueChange={setCurrency}>
					<SelectTrigger className="font-mono">{currency}</SelectTrigger>
					<SelectContent className="min-w-24">
						{CURRENCIES.map((currency) => (
							<SelectItem key={currency.value} value={currency.value}>
								{currency.value}{" "}
								<span className="text-muted-foreground">{currency.label}</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Input placeholder="10.00" pattern="[0-9]*" />
			</ButtonGroup>
			<ButtonGroup>
				<Button aria-label="Send" size="icon" variant="outline">
					<ArrowRightIcon />
				</Button>
			</ButtonGroup>
		</ButtonGroup>
	);
}

function ButtonGroupPopover() {
	return (
		<ButtonGroup>
			<Button variant="outline">
				<BotIcon /> Copilot
			</Button>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="icon" aria-label="Open Popover">
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="end" className="rounded-xl p-0 text-sm">
					<div className="px-4 py-3">
						<div className="font-medium text-sm">Agent Tasks</div>
					</div>
					<Separator />
					<div className="p-4 text-sm *:[p:not(:last-child)]:mb-2">
						<Textarea
							placeholder="Describe your task in natural language."
							className="mb-4 resize-none"
						/>
						<p className="font-medium">Start a new task with Copilot</p>
						<p className="text-muted-foreground">
							Describe your task in natural language. Copilot will work in the
							background and open a pull request for your review.
						</p>
					</div>
				</PopoverContent>
			</Popover>
		</ButtonGroup>
	);
}
