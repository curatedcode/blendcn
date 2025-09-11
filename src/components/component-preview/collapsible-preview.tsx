"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Button } from "~/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible";

export function CollapsiblePreview() {
	return (
		<ComponentAccordionGroup title="Collapsible">
			<ComponentAccordionSubGroup title="Example">
				<CollapsibleDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function CollapsibleDemo() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="flex w-[350px] flex-col gap-2"
		>
			<div className="flex items-center justify-between gap-4 px-4">
				<h4 className="font-semibold text-sm">
					@peduarte starred 3 repositories
				</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="icon" className="-mr-4 size-8">
						<ChevronsUpDown />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<div className="rounded-md border bg-background px-4 py-2 font-mono text-sm">
				@radix-ui/primitives
			</div>
			<CollapsibleContent className="flex flex-col gap-2">
				<div className="rounded-md border bg-background px-4 py-2 font-mono text-sm">
					@radix-ui/colors
				</div>
				<div className="rounded-md border bg-background px-4 py-2 font-mono text-sm">
					@stitches/react
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
