import { BriefcaseIcon, PlusIcon, SparkleIcon } from "lucide-react";
import type { Project } from "~/components/demo-app/demo-data";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export function ProjectsSection({
	projects,
	className,
}: {
	projects: Project[];
	className?: string;
}) {
	const isPlural = (num: number) => num === 0 || num > 1;

	return (
		<Card className={cn("", className)}>
			<CardHeader className="w-fit space-x-2">
				<CardTitle className="flex items-center gap-3">
					<BriefcaseIcon className="size-5 text-primary" />
					<span>Projects</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-6 md:grid-cols-2">
				{projects.map((project, index) => (
					<div key={project.title} className="flex gap-3">
						<div
							className="relative size-11 overflow-hidden rounded-md opacity-70"
							style={{
								// backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, ${project.color} 70%, transparent 100%), ${project.color})`,
								backgroundColor: project.color,
							}}
						>
							<SparkleIcon
								className="absolute size-14 fill-card stroke-transparent"
								style={{
									rotate: `${Math.floor(Math.random() * 44) * index}deg`,
									left: `${index * 2}px`,
									top: `${index * 2}px`,
								}}
							/>
						</div>
						<div>
							<span className="text-sm leading-4">{project.title}</span>
							<div className="flex gap-1.5 text-muted-foreground text-xs md:text-sm">
								<span>
									{project.tasks.length}{" "}
									{isPlural(project.tasks.length) ? "tasks" : "task"}
								</span>
								<span>&bull;</span>
								<span>
									{project.teammates.length}{" "}
									{isPlural(project.teammates.length)
										? "teammates"
										: "teammate"}
								</span>
							</div>
						</div>
					</div>
				))}
				<Button
					variant={"ghost"}
					className="group h-11 w-full justify-start gap-3 border border-dashed px-0 pr-6 hover:border-transparent"
				>
					<div className="flex size-11 items-center justify-center">
						<PlusIcon className="size-5" />
					</div>
					<span>Create new project</span>
				</Button>
			</CardContent>
		</Card>
	);
}
