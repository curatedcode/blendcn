import type * as React from "react";
import { cn } from "~/lib/utils";

export function Blockquote({
	className,
	children,
	...props
}: React.ComponentPropsWithoutRef<"blockquote">) {
	return (
		<blockquote
			className={cn(["border-accent border-l-4 pl-1", className])}
			{...props}
		>
			{children}
		</blockquote>
	);
}
