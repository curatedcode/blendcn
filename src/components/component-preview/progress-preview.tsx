import * as React from "react";
import {
	ComponentGroup,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Progress } from "~/components/ui/progress";

export function ProgressPreview() {
	return (
		<ComponentGroup title="Progress" id="progress-component">
			<ComponentGroupPreview>
				<ProgressDemo />
			</ComponentGroupPreview>
		</ComponentGroup>
	);
}

function ProgressDemo() {
	const [progress, setProgress] = React.useState(13);
	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);
	return <Progress value={progress} className="w-[60%]" />;
}
