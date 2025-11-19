/** biome-ignore-all lint/correctness/noChildrenProp: tanstack form */

import { useForm, uuid } from "@tanstack/react-form";
import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import {
	BellRingIcon,
	CalendarIcon,
	ClipboardListIcon,
	MoreHorizontalIcon,
	PencilIcon,
	PlusIcon,
	Trash2Icon,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import z from "zod";
import type { Project } from "~/components/demo-app/demo-data";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
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
import { Calendar } from "~/components/ui/calendar";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
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
	SelectValue,
} from "~/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";

dayjs.extend(relativeTimePlugin);

function getRelativeDueDate(
	date: Date,
): "Overdue" | "Today" | `${number} ${string}` {
	const dateObj = dayjs(date);

	const isOverdue = dateObj.isBefore();
	if (isOverdue) return "Overdue";

	const isToday = dateObj.isSame(undefined, "date");
	if (isToday) return "Today";

	return dateObj.fromNow() as `${number} ${string}`;
}

function capitalizeTaskPriority(value: string) {
	return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function capitalizeTaskStage(value: string) {
	const words = value.split("-");
	const capital: string[] = [];

	for (const word of words) {
		capital.push(`${word.charAt(0).toUpperCase()}${word.slice(1)}`);
	}

	return capital.join(" ");
}

const formSchema = z.object({
	title: z.string().min(1, { error: "Please enter a title" }),
	dueDate: z.date({ error: "Please enter a valid date" }),
	priority: z.enum(["low", "medium", "high"], {
		error: "Please select a priority",
	}),
	stage: z.enum(["in-progress", "to-do", "upcoming"], {
		error: "Please select a stage",
	}),
});

export function TasksSection({
	tasks,
	className,
}: {
	tasks: Project["tasks"];
	className?: string;
}) {
	const [_tasks, _setTasks] = React.useState<Project["tasks"]>(tasks);
	const [selectedTask, setSelectedTask] =
		React.useState<Project["tasks"][number]>();

	const inProgressTasks = React.useMemo(
		() => _tasks.filter((v) => v.stage === "in-progress"),
		[_tasks],
	);
	const todoTasks = React.useMemo(
		() => _tasks.filter((v) => v.stage === "to-do"),
		[_tasks],
	);
	const upcomingTasks = React.useMemo(
		() => _tasks.filter((v) => v.stage === "upcoming"),
		[_tasks],
	);

	const form = useForm({
		defaultValues: {
			title: "",
			dueDate: dayjs().add(1, "day").toDate(),
			priority: "medium",
			stage: "to-do",
		} as z.infer<typeof formSchema>,
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const newTask: Project["tasks"][number] = {
				id: uuid(),
				...value,
			};
			_setTasks((prev) => [...prev, newTask]);
			toast.success("Successfully created task");
		},
	});

	const deleteTask = (id: string) => {
		_setTasks((prev) => prev.filter((v) => v.id !== id));
	};

	return (
		<Card className={cn("", className)}>
			<CardHeader className="w-fit space-x-2">
				<CardTitle className="flex items-center gap-3">
					<ClipboardListIcon className="size-5 text-primary" />
					<span className="whitespace-nowrap">My Tasks</span>
				</CardTitle>
				<CardAction>
					<Dialog
						onOpenChange={(open) =>
							!open && setTimeout(() => form.reset(), 150)
						}
					>
						<DialogTrigger asChild>
							<Button variant={"ghost"} size={"icon-sm"} className="-mt-1.5">
								<span className="sr-only">Add Task</span>
								<PlusIcon className="size-4" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>New Task</DialogTitle>
								<DialogDescription>
									Add a new task to your list.
								</DialogDescription>
							</DialogHeader>
							<form
								id="task-form"
								onSubmit={(e) => {
									e.preventDefault();
									form.handleSubmit();
								}}
							>
								<FieldGroup>
									<form.Field
										name="title"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Title</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="Verify the flux capacitor is fluxing correctly"
														autoComplete="off"
													/>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
									<form.Field
										name="dueDate"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Due Date</FieldLabel>
													<DatePicker
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(value) => field.handleChange(value)}
														aria-invalid={isInvalid}
														placeholder="June 01, 2025"
													/>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
									<form.Field
										name="priority"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor="task-priority">
														Priority
													</FieldLabel>
													<Select
														name={field.name}
														value={field.state.value}
														onValueChange={(v) =>
															field.handleChange(
																v as z.infer<typeof formSchema>["priority"],
															)
														}
													>
														<SelectTrigger
															id="task-priority"
															className="w-[180px]"
															aria-invalid={isInvalid}
														>
															<SelectValue placeholder="Select a priority" />
														</SelectTrigger>
														<SelectContent>
															{["low", "medium", "high"].map((value) => (
																<SelectItem key={value} value={value}>
																	{capitalizeTaskPriority(value)}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
									<form.Field
										name="stage"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor="task-stage">Stage</FieldLabel>
													<Select
														name={field.name}
														value={field.state.value}
														onValueChange={(v) =>
															field.handleChange(
																v as z.infer<typeof formSchema>["stage"],
															)
														}
													>
														<SelectTrigger
															id="task-stage"
															className="w-[180px]"
															aria-invalid={isInvalid}
														>
															<SelectValue placeholder="Select a stage" />
														</SelectTrigger>
														<SelectContent>
															{["in-progress", "to-do", "upcoming"].map(
																(value) => (
																	<SelectItem key={value} value={value}>
																		{capitalizeTaskStage(value)}
																	</SelectItem>
																),
															)}
														</SelectContent>
													</Select>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
								</FieldGroup>
								<DialogFooter className="mt-4">
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<DialogClose asChild>
										<Button type="submit">Create</Button>
									</DialogClose>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</CardAction>
			</CardHeader>
			<CardContent>
				<AlertDialog>
					<Accordion type="single" defaultValue={"in-progress"}>
						<TaskAccordionItem
							value="in-progress"
							title="In Progress"
							tasks={inProgressTasks}
							color={"#95e4e9"}
							setSelectedTask={setSelectedTask}
						/>
						<TaskAccordionItem
							value="to-do"
							title="To Do"
							tasks={todoTasks}
							color={"color-mix(in oklab, var(--color-muted) 100%, #000 10%)"}
							setSelectedTask={setSelectedTask}
						/>
						<TaskAccordionItem
							value="upcoming"
							title="Upcoming"
							tasks={upcomingTasks}
							color={"#edc291"}
							setSelectedTask={setSelectedTask}
						/>
					</Accordion>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								task.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								variant={"destructive"}
								onClick={() => {
									if (!selectedTask) return;
									deleteTask(selectedTask.id);
									toast.success("Successfully deleted task");
								}}
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	);
}

type TaskAccordionItemProps = {
	value: Project["tasks"][number]["stage"];
	title: string;
	tasks: Project["tasks"];
	color: string;
	setSelectedTask: React.Dispatch<
		React.SetStateAction<Project["tasks"][number] | undefined>
	>;
};

function TaskAccordionItem({
	value,
	title,
	tasks,
	color,
	setSelectedTask,
}: TaskAccordionItemProps) {
	const isPlural = (num: number) => num === 0 || num > 1;

	return (
		<AccordionItem value={value}>
			<AccordionTrigger className="flex items-center gap-1.5 text-sm hover:[text-decoration-line:none]!">
				<div className="flex items-center gap-1.5">
					<span
						className="rounded-md px-3 py-0.5 uppercase shadow-sm"
						style={{ backgroundColor: color }}
					>
						{title}
					</span>
					<div className="flex items-center gap-1.5 text-muted-foreground text-xs">
						<span>&bull;</span>
						<span>
							{tasks.length} {isPlural(tasks.length) ? "tasks" : "task"}
						</span>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<Table data-empty={tasks.length ? undefined : true}>
					<TableHeader>
						<TableHead>Name</TableHead>
						<TableHead>Priority</TableHead>
						<TableHead className="text-right">Due</TableHead>
						<TableHead
							data-empty={tasks.length ? undefined : true}
							className="data-empty:px-0 data-empty:pl-[11px]"
						>
							<span className="sr-only">Actions</span>
						</TableHead>
					</TableHeader>
					<TableBody>
						{tasks.length ? (
							tasks.map((task) => (
								<TaskTableRow
									key={task.id}
									setSelectedTask={setSelectedTask}
									{...task}
								/>
							))
						) : (
							<tr>
								<td
									className="w-full pt-2 pb-1 text-center text-muted-foreground"
									colSpan={4}
								>
									No tasks to show...
								</td>
							</tr>
						)}
					</TableBody>
				</Table>
			</AccordionContent>
		</AccordionItem>
	);
}

type TaskTableRowProps = {
	setSelectedTask: React.Dispatch<
		React.SetStateAction<Project["tasks"][number] | undefined>
	>;
} & Project["tasks"][number];

function TaskTableRow({ setSelectedTask, ...task }: TaskTableRowProps) {
	const relativeDueDate = getRelativeDueDate(task.dueDate);

	return (
		<TableRow>
			<TableCell>{task.title}</TableCell>
			<TableCell>
				<div
					className={cn(
						"w-fit",
						task.priority === "high" && "text-destructive",
						task.priority === "medium" && "text-primary",
					)}
				>
					<span>{capitalizeTaskPriority(task.priority)}</span>
				</div>
			</TableCell>
			<TableCell
				className={cn(
					"text-right",
					relativeDueDate === "Overdue" && "text-red-500",
					relativeDueDate === "Today" && "text-blue-500",
				)}
			>
				{relativeDueDate}
			</TableCell>
			<TableCell className="w-8">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size={"icon-sm"}>
							<span className="sr-only">Open menu</span>
							<MoreHorizontalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<PencilIcon />
							<span>Edit</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<BellRingIcon />
							<span>Notifications</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => setSelectedTask(task)}>
							<AlertDialogTrigger className="flex items-center gap-1.5 text-destructive">
								<Trash2Icon className="text-destructive" />
								<span>Delete</span>
							</AlertDialogTrigger>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false;
	}
	return !Number.isNaN(date.getTime());
}

type DatePickerProps = {
	id: string;
	name: string;
	value: Date;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onChange?: (value: Date) => void;
	"aria-invalid"?: React.HTMLAttributes<HTMLInputElement>["aria-invalid"];
	placeholder?: string;
};

function DatePicker({ value, onChange, ...props }: DatePickerProps) {
	const formatDate = (date: Date | undefined) =>
		dayjs(date).format("MMMM DD, YYYY");

	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(value);
	const [month, setMonth] = React.useState<Date | undefined>(date);
	const [_value, _setValue] = React.useState(formatDate(date));

	return (
		<div className="relative flex gap-2">
			<Input
				value={_value}
				className="bg-background pr-10"
				onChange={(e) => {
					const date = new Date(e.target.value);
					_setValue(e.target.value);
					onChange?.(date);
					if (isValidDate(date)) {
						setDate(date);
						setMonth(date);
					}
				}}
				onKeyDown={(e) => {
					if (e.key === "ArrowDown") {
						e.preventDefault();
						setOpen(true);
					}
				}}
				{...props}
				autoComplete="off"
			/>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id="date-picker"
						variant="ghost"
						className="-translate-y-1/2 absolute top-1/2 right-2 size-6"
					>
						<CalendarIcon className="size-3.5" />
						<span className="sr-only">Select date</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="end"
					alignOffset={-8}
					sideOffset={10}
				>
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						month={month}
						onMonthChange={setMonth}
						onSelect={(date) => {
							setDate(date);
							_setValue(formatDate(date));
							if (date) {
								onChange?.(date);
							}
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
