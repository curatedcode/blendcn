import type * as React from "react";

export const ColorStepLabel = ({
	children,
	...props
}: React.ComponentPropsWithoutRef<"div">) => (
	<div className="mb-1 flex justify-center" {...props}>
		<span>{children}</span>
	</div>
);
