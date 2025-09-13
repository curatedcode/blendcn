"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckIcon,
	ChevronsUpDownIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
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
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";

export function ComboboxPreview() {
	return (
		<ComponentAccordionGroup title="Combobox">
			<ComponentAccordionSubGroup title="Default">
				<Combobox />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Popover">
				<ComboboxPopover />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Dropdown Menu">
				<ComboboxDropdownMenu />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Responsive">
				<ComboboxResponsive />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Form">
				<ComboboxForm />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function Combobox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

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

function ComboboxPopover() {
	const statuses: {
		value: string;
		label: string;
	}[] = [
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

	const [open, setOpen] = React.useState(false);
	const [selectedStatus, setSelectedStatus] = React.useState<
		(typeof statuses)[number] | null
	>(null);
	return (
		<div className="flex items-center space-x-4">
			<p className="text-muted-foreground text-sm">Status</p>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline">
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

function ComboboxDropdownMenu() {
	const labels = [
		"feature",
		"bug",
		"enhancement",
		"documentation",
		"design",
		"question",
		"maintenance",
	];

	const [label, setLabel] = React.useState("feature");
	const [open, setOpen] = React.useState(false);

	return (
		<div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
			<p className="font-medium text-sm leading-none">
				<span className="mr-2 rounded-lg bg-primary px-2 py-1 text-primary-foreground text-xs">
					{label}
				</span>
				<span className="text-muted-foreground">Create a new project</span>
			</p>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm">
						<span className="sr-only">Open options</span>
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

function ComboboxResponsive() {
	const statuses: { value: string; label: string }[] = [
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

	const [open, setOpen] = React.useState(false);
	const isMobile = useIsMobile();
	const [selectedStatus, setSelectedStatus] = React.useState<
		(typeof statuses)[number] | null
	>(null);

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button variant="outline">
						{selectedStatus ? selectedStatus.label : "+ Set status"}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mt-4 border-t">
						<StatusList
							statuses={statuses}
							setOpen={setOpen}
							setSelectedStatus={setSelectedStatus}
						/>
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-[200px]">
					{selectedStatus ? selectedStatus.label : "+ Set status"}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<StatusList
					statuses={statuses}
					setOpen={setOpen}
					setSelectedStatus={setSelectedStatus}
				/>
			</PopoverContent>
		</Popover>
	);
}

function StatusList({
	setOpen,
	setSelectedStatus,
	statuses,
}: {
	setOpen: (open: boolean) => void;
	setSelectedStatus: (status: { value: string; label: string } | null) => void;
	statuses: { value: string; label: string }[];
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

function ComboboxForm() {
	const languages = [
		{ label: "English", value: "en" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Spanish", value: "es" },
		{ label: "Portuguese", value: "pt" },
		{ label: "Russian", value: "ru" },
		{ label: "Japanese", value: "ja" },
		{ label: "Korean", value: "ko" },
		{ label: "Chinese", value: "zh" },
	] as const;

	const schema = z.object({
		language: z.string({
			error: "Please select a language.",
		}),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});
	function onSubmit(data: z.infer<typeof schema>) {
		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Language</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[200px] justify-between",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value
												? languages.find(
														(language) => language.value === field.value,
													)?.label
												: "Select language"}
											<ChevronsUpDownIcon className="opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput
											placeholder="Search framework..."
											className="h-9"
										/>
										<CommandList>
											<CommandEmpty>No framework found.</CommandEmpty>
											<CommandGroup>
												{languages.map((language) => (
													<CommandItem
														value={language.label}
														key={language.value}
														onSelect={() => {
															form.setValue("language", language.value);
														}}
													>
														{language.label}
														<CheckIcon
															className={cn(
																"ml-auto",
																language.value === field.value
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormDescription>
								This is the language that will be used in the dashboard.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
