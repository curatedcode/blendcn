import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/lib/utils";

export type ComponentAccordionItemsProps = {
	value: string;
	title: string;
	description: string;
	children: React.ReactNode;
};

export function ComponentAccordionItem({
	value,
	title,
	description,
	children,
}: ComponentAccordionItemsProps) {
	return (
		<AccordionItem value={value}>
			<AccordionTrigger className="group text-base hover:[text-decoration-line:none]!">
				<div className="flex flex-col gap-1">
					<span className="font-medium transition-[underline] group-hover:underline">
						{title}
					</span>
					<p className="font-normal text-foreground/70 text-sm">
						{description}
					</p>
				</div>
			</AccordionTrigger>
			<AccordionContent className="space-y-9 px-3">{children}</AccordionContent>
		</AccordionItem>
	);
}

export function ComponentAccordionGroup({
	title,
	children,
	className,
}: {
	title: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className="flex flex-col gap-3">
			<h2 className="font-medium text-base">{title}</h2>
			<div
				className={cn("flex flex-wrap space-x-12 space-y-3 pl-3", className)}
			>
				{children}
			</div>
		</div>
	);
}

export function ComponentAccordionSubGroup({
	title,
	children,
	className,
}: {
	title: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-col gap-3", className)}>
			<span className="font-medium underline">{title}</span>
			<div className="px-1">{children}</div>
		</div>
	);
}
