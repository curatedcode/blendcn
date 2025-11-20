import { TargetIcon } from "lucide-react";
import type { Project } from "~/components/demo-app/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";

export function GoalsSection({
	goals,
	className,
}: {
	goals: (Project["goals"][number] & {
		project: Omit<Project, "goals" | "tasks" | "teammates">;
	})[];
	className?: string;
}) {
	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<TargetIcon className="size-5 text-primary" />
					<span>Goals</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{goals.map((goal) => (
					<div
						key={goal.id}
						className="flex justify-between gap-3 md:items-center"
					>
						<div className="space-y-1">
							<span className="block font-semibold text-sm leading-4 md:text-base md:leading-normal">
								{goal.title}
							</span>
							<div className="flex items-center gap-1.5 text-muted-foreground text-xs *:leading-4 md:text-sm">
								<span>{goal.project.title}</span>
								<span>&bull;</span>
								<span>My Projects</span>
							</div>
						</div>
						<div className="flex h-fit items-center gap-3 md:w-40">
							<Progress
								value={goal.completion}
								className="hidden bg-muted md:block"
								// biome-ignore lint/suspicious/noExplicitAny: pass custom vars
								style={{ "--primary": goal.project.color } as any}
								aria-label={`Goal completion`}
							/>
							<span className="font-medium text-sm">{goal.completion}%</span>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
