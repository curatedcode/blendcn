"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/lib/utils";

const hoverCardVariants = cva(
	"z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none" +
		"data-[state=closed]:animate-out data-[state=open]:animate-in" +
		"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" +
		"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95" +
		"data-[side=bottom]:slide-in-from-top-2" +
		"data-[side=left]:slide-in-from-right-2" +
		"data-[side=right]:slide-in-from-left-2" +
		"data-[side=top]:slide-in-from-bottom-2",
	{
		variants: {
			size: {
				sm: "w-48 p-3 text-sm",
				md: "w-64 p-4 text-sm",
				lg: "w-80 p-6 text-base",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

type HoverCardContentProps = React.ComponentPropsWithoutRef<
	typeof HoverCardPrimitive.Content
> &
	VariantProps<typeof hoverCardVariants>;

const HoverCardContent = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, size, ...props }, ref) => (
	<HoverCardPrimitive.Content
		ref={ref}
		align={align}
		sideOffset={sideOffset}
		className={cn([hoverCardVariants({ size }), className])}
		{...props}
	/>
));
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardContent, HoverCardTrigger };
