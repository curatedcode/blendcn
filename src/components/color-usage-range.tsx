import type * as React from "react";
import { cn } from "~/lib/utils";

export const ColorUsageRange = ({
	children,
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) => (
	<div
		className={cn(["mx-auto mb-1.5 flex w-fit flex-col", className])}
		{...props}
	>
		<span className="px-4 text-center font-medium text-sm">{children}</span>
		<div className="h-px [background:linear-gradient(to_right,_transparent,_var(--gray-8)_20%,_var(--gray-8)_70%,_transparent)]" />
	</div>
);
