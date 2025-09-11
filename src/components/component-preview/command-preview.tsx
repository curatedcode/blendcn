"use client";

import {
	Calculator,
	CalculatorIcon,
	Calendar,
	CalendarIcon,
	CreditCard,
	CreditCardIcon,
	Settings,
	SettingsIcon,
	Smile,
	SmileIcon,
	User,
	UserIcon,
} from "lucide-react";
import * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "~/components/ui/command";

export function CommandPreview() {
	return (
		<ComponentAccordionGroup title="Command">
			<ComponentAccordionSubGroup title="Example">
				<Command className="rounded-lg border shadow-md md:min-w-[450px]">
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Suggestions">
							<CommandItem>
								<CalendarIcon />
								<span>Calendar</span>
							</CommandItem>
							<CommandItem>
								<SmileIcon />
								<span>Search Emoji</span>
							</CommandItem>
							<CommandItem disabled>
								<CalculatorIcon />
								<span>Calculator</span>
							</CommandItem>
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup heading="Settings">
							<CommandItem>
								<UserIcon />
								<span>Profile</span>
								<CommandShortcut>⌘P</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<CreditCardIcon />
								<span>Billing</span>
								<CommandShortcut>⌘B</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<SettingsIcon />
								<span>Settings</span>
								<CommandShortcut>⌘S</CommandShortcut>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Dialog">
				<CommandDialogDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function isElementInViewport(el: HTMLParagraphElement) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function CommandDialogDemo() {
	const [open, setOpen] = React.useState(false);
	const commandElRef = React.useRef<HTMLParagraphElement | null>(null);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (!commandElRef.current) return;
			const isInViewport = isElementInViewport(commandElRef.current);
			if (!isInViewport) return;

			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<div
				className="flex items-center gap-1.5 text-muted-foreground text-sm"
				ref={commandElRef}
			>
				<span>Press</span>{" "}
				<kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-base text-muted-foreground opacity-100">
					<span className="pt-1">⌘</span>
					<span className="pt-px">J</span>
				</kbd>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<Calendar />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<Smile />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<Calculator />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<User />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
