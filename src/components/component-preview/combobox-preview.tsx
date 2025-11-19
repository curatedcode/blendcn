import {
	CheckIcon,
	ChevronsUpDownIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { useMediaQuery } from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";

export function ComboboxPreview() {
	return (
		<ComponentGroup title="Combobox" id="combobox-component">
			<ComponentGroupPreview>
				<ComboboxDemo />
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Popover">
					<ComboboxPopover />
				</ComponentGroupExample>
				<ComponentGroupExample title="Dropdown Menu">
					<ComboboxDropdownMenu />
				</ComponentGroupExample>
				<ComponentGroupExample title="Responsive">
					<ComboBoxResponsive />
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}

const frameworks = [
	{
		value: "next.js",
		label: "Next.js",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
];

function ComboboxDemo() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? frameworks.find((framework) => framework.value === value)?.label
						: "Select framework..."}
					<ChevronsUpDownIcon className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search framework..." className="h-9" />
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup>
							{frameworks.map((framework) => (
								<CommandItem
									key={framework.value}
									value={framework.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{framework.label}
									<CheckIcon
										className={cn(
											"ml-auto",
											value === framework.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

type Status = {
	value: string;
	label: string;
};

const statuses: Status[] = [
	{
		value: "backlog",
		label: "Backlog",
	},
	{
		value: "todo",
		label: "Todo",
	},
	{
		value: "in progress",
		label: "In Progress",
	},
	{
		value: "done",
		label: "Done",
	},
	{
		value: "canceled",
		label: "Canceled",
	},
];

function ComboboxPopover() {
	const [open, setOpen] = React.useState(false);
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
		null,
	);
	return (
		<div className="flex items-center space-x-4">
			<p className="text-muted-foreground text-sm">Status</p>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-fit">
						{selectedStatus ? selectedStatus.label : "+ Set status"}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0" side="right" align="start">
					<Command>
						<CommandInput placeholder="Change status..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{statuses.map((status) => (
									<CommandItem
										key={status.value}
										value={status.value}
										onSelect={(value) => {
											setSelectedStatus(
												statuses.find((priority) => priority.value === value) ||
													null,
											);
											setOpen(false);
										}}
									>
										{status.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

const labels = [
	"feature",
	"bug",
	"enhancement",
	"documentation",
	"design",
	"question",
	"maintenance",
];

function ComboboxDropdownMenu() {
	const [label, setLabel] = React.useState("feature");
	const [open, setOpen] = React.useState(false);
	return (
		<div className="flex w-full items-center justify-between rounded-md border px-4 py-3 sm:max-w-xs">
			<p className="font-medium text-sm leading-none">
				<span className="mr-2 rounded-lg bg-primary px-2 py-1 text-primary-foreground text-xs">
					{label}
				</span>
				<span className="text-muted-foreground">New project</span>
			</p>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm">
						<MoreHorizontalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[200px]">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem>Assign to...</DropdownMenuItem>
						<DropdownMenuItem>Set due date...</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Apply label</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className="p-0">
								<Command>
									<CommandInput
										placeholder="Filter label..."
										autoFocus={true}
										className="h-9"
									/>
									<CommandList>
										<CommandEmpty>No label found.</CommandEmpty>
										<CommandGroup>
											{labels.map((label) => (
												<CommandItem
													key={label}
													value={label}
													onSelect={(value) => {
														setLabel(value);
														setOpen(false);
													}}
												>
													{label}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-red-600">
							Delete
							<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function ComboBoxResponsive() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
		null,
	);
	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-fit">
						{selectedStatus ? selectedStatus.label : "+ Set status"}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="start">
					<StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
				</PopoverContent>
			</Popover>
		);
	}
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="w-fit">
					{selectedStatus ? selectedStatus.label : "+ Set status"}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function StatusList({
	setOpen,
	setSelectedStatus,
}: {
	setOpen: (open: boolean) => void;
	setSelectedStatus: (status: Status | null) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{statuses.map((status) => (
						<CommandItem
							key={status.value}
							value={status.value}
							onSelect={(value) => {
								setSelectedStatus(
									statuses.find((priority) => priority.value === value) || null,
								);
								setOpen(false);
							}}
						>
							{status.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
