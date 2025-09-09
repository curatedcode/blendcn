"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";
import { cn } from "~/lib/utils";

const segmentedControlVariants = cva(
	"relative inline-flex items-center rounded-md bg-muted p-1 text-muted-foreground",
	{
		variants: {
			size: {
				sm: "h-8 text-xs",
				md: "h-9 text-sm",
				lg: "h-10 text-base",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const segmentedControlItemVariants = cva(
	"relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5" +
		"font-medium transition-colors" +
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" +
		"disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			size: {
				sm: "h-6 px-2 text-xs",
				md: "h-8 px-3 text-sm",
				lg: "h-10 px-4 text-base",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

type SegmentedControlProps = Omit<
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
	"type" | "value" | "defaultValue" | "onValueChange"
> &
	VariantProps<typeof segmentedControlVariants> & {
		type?: "single";
		value?: string;
		defaultValue?: string;
		onValueChange?(value: string): void;
	};

const SegmentedControl = React.forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
	SegmentedControlProps
>(({ className, size, children, value, ...props }, ref) => {
	const [indicatorStyle, setIndicatorStyle] =
		React.useState<React.CSSProperties>();

	React.useEffect(() => {
		if (!value) return;

		const activeValue = Array.isArray(value) ? value[0] : value;

		if (!activeValue) return;
		const el = document.querySelector<HTMLElement>(
			`[data-segmented-value="${activeValue}"]`,
		);
		if (el) {
			const rect = el.getBoundingClientRect();
			const parentRect = el.parentElement?.getBoundingClientRect();
			if (parentRect) {
				setIndicatorStyle({
					left: rect.left - parentRect.left,
					width: rect.width,
				});
			}
		}
	}, [value]);

	return (
		<ToggleGroupPrimitive.Root
			ref={ref}
			value={value}
			className={cn(segmentedControlVariants({ size }), className)}
			type="single"
			{...props}
		>
			{indicatorStyle && (
				<motion.div
					className="absolute top-1 bottom-1 rounded-sm bg-background shadow-sm"
					layout
					transition={{ type: "spring", stiffness: 400, damping: 30 }}
					style={indicatorStyle}
				/>
			)}
			{children}
		</ToggleGroupPrimitive.Root>
	);
});
SegmentedControl.displayName = "SegmentedControl";

type SegmentedControlItemProps = React.ComponentPropsWithoutRef<
	typeof ToggleGroupPrimitive.Item
> &
	VariantProps<typeof segmentedControlItemVariants>;

const SegmentedControlItem = React.forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
	SegmentedControlItemProps
>(({ className, size, value, ...props }, ref) => (
	<ToggleGroupPrimitive.Item
		ref={ref}
		value={value}
		data-segmented-value={value}
		className={cn(
			segmentedControlItemVariants({ size }),
			"data-[state=on]:bg-background data-[state=off]:text-muted-foreground data-[state=on]:text-foreground",
			className,
		)}
		{...props}
	/>
));
SegmentedControlItem.displayName = "SegmentedControlItem";

export { SegmentedControl, SegmentedControlItem };
