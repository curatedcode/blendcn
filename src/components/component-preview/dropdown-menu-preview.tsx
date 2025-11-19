import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import * as React from "react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function DropdownMenuPreview() {
	return (
		<ComponentGroup title="Dropdown Menu" id="dropdown-menu-component">
			<ComponentGroupPreview>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Open</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="start">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								Billing
								<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								Settings
								<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								Keyboard shortcuts
								<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>Team</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem>Email</DropdownMenuItem>
										<DropdownMenuItem>Message</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>More...</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
							<DropdownMenuItem>
								New Team
								<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>GitHub</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuItem disabled>API</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							Log out
							<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Checkboxes">
					<DropdownMenuCheckboxes />
				</ComponentGroupExample>
				<ComponentGroupExample title="Radio Group">
					<DropdownMenuRadioGroupDemo />
				</ComponentGroupExample>
				<ComponentGroupExample title="Dialog">
					<DropdownMenuDialog />
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

function DropdownMenuCheckboxes() {
	const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
	const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
	const [showPanel, setShowPanel] = React.useState<Checked>(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Appearance</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={showStatusBar}
					onCheckedChange={setShowStatusBar}
				>
					Status Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={showActivityBar}
					onCheckedChange={setShowActivityBar}
					disabled
				>
					Activity Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={showPanel}
					onCheckedChange={setShowPanel}
				>
					Panel
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DropdownMenuRadioGroupDemo() {
	const [position, setPosition] = React.useState("bottom");
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DropdownMenuDialog() {
	const [showNewDialog, setShowNewDialog] = React.useState(false);
	const [showShareDialog, setShowShareDialog] = React.useState(false);
	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" aria-label="Open menu" size="icon-sm">
						<MoreHorizontalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40" align="end">
					<DropdownMenuLabel>File Actions</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
							New File...
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
							Share...
						</DropdownMenuItem>
						<DropdownMenuItem disabled>Download</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create New File</DialogTitle>
						<DialogDescription>
							Provide a name for your new file. Click create when you&apos;re
							done.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup className="pb-3">
						<Field>
							<FieldLabel htmlFor="filename">File Name</FieldLabel>
							<Input id="filename" name="filename" placeholder="document.txt" />
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Create</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Share File</DialogTitle>
						<DialogDescription>
							Anyone with the link will be able to view this file.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup className="py-3">
						<Field>
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="shadcn@vercel.com"
								autoComplete="off"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
							<Textarea
								id="message"
								name="message"
								placeholder="Check out this file"
							/>
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Send Invite</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
