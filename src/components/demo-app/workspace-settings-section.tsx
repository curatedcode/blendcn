import {
	InfoIcon,
	MinusIcon,
	Rows3,
	RowsIcon,
	TargetIcon,
	Trash2Icon,
} from "lucide-react";
import * as React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "~/components/ui/context-menu";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "~/components/ui/input-group";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "~/components/ui/input-otp";
import { Label } from "~/components/ui/label";
import {
	NativeSelect,
	NativeSelectOption,
} from "~/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

const data = {
	apiKeys: [
		"844cmTMjIlkAJEf",
		"gr9M6DQeSL9CnAk",
		"hdaCpXaY42M65R6",
		"nerdPGNz5IsrVOU",
		"vJN8azXhEwudXzf",
	],
	members: [
		{
			id: 1,
			name: {
				firstName: "Nicole",
				lastName: "Aufderhar",
			},
			email: "Nicole_Aufderhar5@gmail.com",
			avatarUrl: "/assets/images/avatars/female/20.webp",
			role: "member",
		},
		{
			id: 2,
			name: {
				firstName: "Steven",
				lastName: "Funk",
			},
			email: "Steven_Funk3@gmail.com",
			avatarUrl: "/assets/images/avatars/male/5.webp",
			role: "admin",
		},
		{
			id: 3,
			name: {
				firstName: "Patty",
				lastName: "Windler",
			},
			email: "Patty_Windler@yahoo.com",
			avatarUrl: "/assets/images/avatars/female/2.webp",
			role: "admin",
		},
		{
			id: 4,
			name: {
				firstName: "Roland",
				lastName: "O'Hara",
			},
			email: "Roland_OHara13@gmail.com",
			avatarUrl: "/assets/images/avatars/male/22.webp",
			role: "member",
		},
		{
			id: 5,
			name: {
				firstName: "Rolando",
				lastName: "Larson",
			},
			email: "Rolando_Larson@gmail.com",
			avatarUrl: "/assets/images/avatars/male/17.webp",
			role: "member",
		},
	],
};

export function WorkspaceSettingsSection({
	className,
}: {
	className?: string;
}) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<TargetIcon className="size-5 text-primary" />
					<span className="whitespace-normal">Workspace Settings</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<form>
					<FieldGroup>
						<FieldSet>
							<FieldLegend>General Information</FieldLegend>
							<FieldDescription>
								Details about the workspace’s identity, description, and default
								settings.
							</FieldDescription>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="workspace-settings-input-name">
										Workspace Name
									</FieldLabel>
									<Input
										id="workspace-settings-input-name"
										placeholder="Acme Team"
										className="max-w-[350px]! placeholder:text-sm"
									/>
								</Field>
								<Field className="max-w-[350px]!">
									<FieldLabel htmlFor="workspace-settings-input-url">
										Workspace URL
									</FieldLabel>
									<InputGroup>
										<InputGroupAddon>
											<InputGroupText>https://example.com/</InputGroupText>
										</InputGroupAddon>
										<InputGroupInput
											id="workspace-settings-input-url"
											placeholder="acme"
											className="pl-0.5!"
										/>
									</InputGroup>
								</Field>
								<DescriptionTextareaField />
								<Field className="max-w-[350px]!">
									<FieldLabel htmlFor="workspace-settings-input-locale">
										Locale
									</FieldLabel>
									<NativeSelect id="workspace-settings-input-locale">
										<NativeSelectOption value="english-us">
											English (US)
										</NativeSelectOption>
										<NativeSelectOption value="english-uk">
											English (UK)
										</NativeSelectOption>
										<NativeSelectOption value="spanish">
											Spanish
										</NativeSelectOption>
										<NativeSelectOption value="german">
											German
										</NativeSelectOption>
										<NativeSelectOption value="french">
											French
										</NativeSelectOption>
									</NativeSelect>
								</Field>
								<Field>
									<FieldLabel htmlFor="workspace-settings-input-density">
										Layout Density
									</FieldLabel>
									<ToggleGroup
										type="single"
										id="workspace-settings-input-density"
										variant={"outline"}
										defaultValue="comfortable"
									>
										<ToggleGroupItem
											value="comfortable"
											aria-label="Toggle comfortable layout"
										>
											<RowsIcon className="size-4" />
											<span className="sr-only md:not-sr-only">
												Comfortable
											</span>
										</ToggleGroupItem>
										<ToggleGroupItem
											value="compact"
											aria-label="Toggle compact layout"
										>
											<Rows3 className="size-4" />
											<span className="sr-only md:not-sr-only">Compact</span>
										</ToggleGroupItem>
										<ToggleGroupItem
											value="Minimal"
											aria-label="Toggle minimal layout"
										>
											<MinusIcon className="size-4" />
											<span className="sr-only md:not-sr-only">Minimal</span>
										</ToggleGroupItem>
									</ToggleGroup>
								</Field>
							</FieldGroup>
						</FieldSet>
						<FieldSet>
							<FieldLegend>Features & Preferences</FieldLegend>
							<FieldDescription>
								Controls for workspace behavior, appearance, and optional
								feature sets.
							</FieldDescription>
							<FieldGroup>
								<Field className="w-fit" orientation={"horizontal"}>
									<FieldLabel
										htmlFor="workspace-settings-input-backups"
										className="w-32.5"
									>
										Automatic Backups
									</FieldLabel>
									<Switch
										defaultChecked
										id="workspace-settings-input-backups"
									/>
								</Field>
								<Field className="w-fit" orientation={"horizontal"}>
									<FieldLabel
										htmlFor="workspace-settings-input-beta-features"
										className="w-32.5"
									>
										Beta Features
									</FieldLabel>
									<Checkbox
										id="workspace-settings-input-beta-features"
										className="ml-2"
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor="workspace-settings-input-theme">
										Theme Mode
									</FieldLabel>
									<RadioGroup
										defaultValue="comfortable"
										id="workspace-settings-input-theme"
									>
										<div className="flex items-center gap-3">
											<RadioGroupItem
												value="default"
												id="workspace-settings-input-theme-r1"
											/>
											<Label htmlFor="workspace-settings-input-theme-r1">
												System
											</Label>
										</div>
										<div className="flex items-center gap-3">
											<RadioGroupItem
												value="comfortable"
												id="workspace-settings-input-theme-r2"
											/>
											<Label htmlFor="workspace-settings-input-theme-r2">
												Light
											</Label>
										</div>
										<div className="flex items-center gap-3">
											<RadioGroupItem
												value="compact"
												id="workspace-settings-input-theme-r3"
											/>
											<Label htmlFor="workspace-settings-input-theme-r3">
												Dark
											</Label>
										</div>
									</RadioGroup>
								</Field>
							</FieldGroup>
						</FieldSet>
						<FieldSet>
							<FieldLegend>Notifications</FieldLegend>
							<FieldDescription>
								Settings for alerts, reminders, and communication preferences.
							</FieldDescription>
							<FieldGroup>
								<Field className="w-fit" orientation={"horizontal"}>
									<FieldLabel
										htmlFor="workspace-settings-input-email-notifications"
										className="w-32.5"
									>
										Email Notifications
									</FieldLabel>
									<Switch id="workspace-settings-input-email-notifications" />
								</Field>
								<ReminderNudgesField />
							</FieldGroup>
						</FieldSet>
						<FieldSet>
							<FieldLegend>Members & Roles</FieldLegend>
							<FieldDescription>
								Tools for managing workspace members, invitations, and access
								levels.
							</FieldDescription>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="workspace-settings-input-invite-via-email">
										Invite via Email
									</FieldLabel>
									<InputGroup className="max-w-[350px]!">
										<InputGroupInput
											placeholder="name@example.com"
											id="workspace-settings-input-invite-via-email"
										/>
										<InputGroupAddon align="inline-end">
											<InputGroupButton variant={"default"}>
												Send
											</InputGroupButton>
										</InputGroupAddon>
									</InputGroup>
								</Field>
								<Field>
									<div className="flex gap-1.5">
										<FieldLabel htmlFor="workspace-settings-input-member-roles">
											Member Roles
										</FieldLabel>
										<Tooltip>
											<TooltipTrigger>
												<span className="sr-only">Info</span>
												<InfoIcon className="size-3.5" />
											</TooltipTrigger>
											<TooltipContent>
												Right click a member to perform actions
											</TooltipContent>
										</Tooltip>
									</div>
									<div
										id="workspace-settings-input-member-roles"
										className="flex flex-col gap-1.5 text-sm"
									>
										{data.members.map((member) => (
											<MemberContextMenu key={member.id} {...member} />
										))}
									</div>
								</Field>
							</FieldGroup>
						</FieldSet>
						<FieldSet>
							<FieldLegend>Security</FieldLegend>
							<FieldDescription>
								Authentication, verification, and sensitive workspace actions.
							</FieldDescription>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="workspace-settings-input-2fa">
										Two-Factor Authentication
									</FieldLabel>
									<InputOTP maxLength={6} id="workspace-settings-input-2fa">
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</Field>
								<Field>
									<FieldLabel htmlFor="workspace-settings-input-api-access">
										API Access
									</FieldLabel>
									{data.apiKeys.length ? (
										<ol
											className="flex flex-col gap-3"
											id="workspace-settings-input-api-access"
										>
											{data.apiKeys.map((key) => (
												<li key={key}>
													<ButtonGroup>
														<span className="inline-flex h-9 w-42 items-center justify-center overflow-hidden rounded-md border bg-background px-4 py-2 font-medium text-sm outline-none dark:border-input dark:bg-input/30">
															{key}
														</span>
														<Button
															variant="outline"
															aria-label="Delete"
															onClick={(e) => e.preventDefault()}
														>
															<Trash2Icon />
														</Button>
													</ButtonGroup>
												</li>
											))}
										</ol>
									) : (
										<span className="text-muted-foreground text-sm">
											No API keys...
										</span>
									)}
								</Field>
								<Field>
									<FieldLabel htmlFor="workspace-api-access">
										Dangerous Actions
									</FieldLabel>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant={"destructive"}
												className="w-fit!"
												size={"sm"}
											>
												Delete workspace
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you absolutely sure?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone. This will permanently
													delete your workspace and remove your data from our
													servers.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction variant={"destructive"}>
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</Field>
							</FieldGroup>
						</FieldSet>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}

function ReminderNudgesField() {
	const [value, setValue] = React.useState([30]);

	return (
		<Field>
			<FieldLabel htmlFor="workspace-settings-input-reminders">
				Reminder Nudges (minutes)
			</FieldLabel>
			<div className="flex max-w-68 items-center gap-3">
				<Slider
					id="workspace-settings-input-reminders"
					aria-label="Reminder nudges (in minutes)"
					min={0}
					max={100}
					step={5}
					value={value}
					onValueChange={setValue}
				/>
				<span className="whitespace-nowrap text-sm">{value[0]} min</span>
			</div>
		</Field>
	);
}

function DescriptionTextareaField() {
	const maxLength = 256;
	const [charactersLeft, setCharactersLeft] = React.useState(maxLength);

	return (
		<Field>
			<FieldLabel htmlFor="workspace-settings-input-description">
				Description
			</FieldLabel>
			<InputGroup>
				<InputGroupTextarea
					id="workspace-settings-input-description"
					maxLength={maxLength}
					onChange={(v) =>
						setCharactersLeft(maxLength - v.currentTarget.value.length)
					}
					placeholder="Team collaboration, planning, and task management."
					className="placeholder:text-sm"
				/>
				<InputGroupAddon align="block-end">
					<InputGroupText className="text-muted-foreground text-xs">
						{charactersLeft} characters left
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		</Field>
	);
}

function MemberContextMenu(member: (typeof data.members)[number]) {
	const [role, setRole] = React.useState<(typeof data.members)[number]["role"]>(
		member.role,
	);

	const allRoles: (typeof data.members)[number]["role"][] = [
		"admin",
		"manager",
		"member",
	];

	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex gap-1.5">
				<span>
					{member.name.firstName} {member.name.lastName}
				</span>
				<span className="hidden text-muted-foreground md:inline">&bull;</span>
				<span className="hidden text-muted-foreground md:inline">
					{member.email}
				</span>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuRadioGroup
					value={role}
					onValueChange={(v) =>
						setRole(v as (typeof data.members)[number]["role"])
					}
				>
					{allRoles.map((role) => (
						<ContextMenuRadioItem key={role} value={role}>
							{`${role.charAt(0).toUpperCase()}${role.slice(1)}`}
						</ContextMenuRadioItem>
					))}
				</ContextMenuRadioGroup>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
