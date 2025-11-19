import { ColorMapField } from "~/components/color-field/color-map-field";
import { formatCssVariable } from "~/components/color-field/helpers";
import { allCssVariables } from "~/components/color-field/types";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";

const _radiusArr = ["radius"] as const;

const _variables = [...allCssVariables, ..._radiusArr];

const categories: { title: string; variables: typeof allCssVariables }[] = [
	{
		title: "Base",
		variables: [
			"background",
			"foreground",
			/**
			 * @todo add radius mapping support
			 */
			// "radius",
			"border",
			"input",
			"ring",
		],
	},
	{
		title: "Surfaces",
		variables: ["card", "card-foreground", "popover", "popover-foreground"],
	},
	{
		title: "Semantic",
		variables: [
			"primary",
			"primary-foreground",
			"secondary",
			"secondary-foreground",
			"muted",
			"muted-foreground",
			"accent",
			"accent-foreground",
			"destructive",
		],
	},
	{
		title: "Sidebar",
		variables: [
			"sidebar",
			"sidebar-foreground",
			"sidebar-primary",
			"sidebar-primary-foreground",
			"sidebar-accent",
			"sidebar-accent-foreground",
			"sidebar-border",
			"sidebar-ring",
		],
	},
	{
		title: "Charts",
		variables: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
	},
	{
		title: "Other",
		variables: [
			"scrollbar-thumb",
			"scrollbar-thumb-hover",
			"scrollbar-thumb-active",
		],
	},
];

export function ColorMappingSection({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"mb-16 flex w-full max-w-[960px] flex-col gap-3",
				className,
			)}
		>
			<h1 className="mb-2 text-center font-semibold text-lg">Theme Mappings</h1>
			<Tabs
				defaultValue="Base"
				className="flex-row gap-0 rounded-lg border bg-muted md:h-[392px] lg:h-[244px]"
			>
				<TabsList className="flex h-full flex-col justify-start gap-1.5 py-2 pl-2">
					{categories.map((category) => (
						<TabsTrigger
							key={category.title}
							value={category.title}
							className="max-h-7 w-full px-1.5 md:px-3"
						>
							{category.title}
						</TabsTrigger>
					))}
				</TabsList>
				<Separator
					orientation="vertical"
					className="mx-2 bg-border data-[orientation=vertical]:h-auto"
				/>
				{categories.map((category) => (
					<TabsContent
						key={category.title}
						value={category.title}
						className="grid auto-rows-min gap-4 py-4.5 pr-2 md:grid-cols-2 lg:grid-cols-3"
					>
						{category.variables.map((variable) => (
							<div key={variable} className="flex flex-col gap-2">
								<Label htmlFor={variable} className="ml-1">
									{formatCssVariable(variable)}
								</Label>
								<ColorMapField id={variable} cssVariable={variable} />
							</div>
						))}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
