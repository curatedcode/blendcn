"use client";

import * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Progress } from "~/components/ui/progress";

export function ProgressPreview() {
	return (
		<ComponentAccordionGroup title="Progress">
			<ComponentAccordionSubGroup title="Default">
				<ProgressDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function ProgressDemo() {
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (progress >= 100) {
				setProgress(0);
				return;
			}
			setProgress((v) => v + 2);
		}, 500);
		return () => clearInterval(interval);
	}, [progress]);

	return <Progress value={progress} className="w-60" />;
}
