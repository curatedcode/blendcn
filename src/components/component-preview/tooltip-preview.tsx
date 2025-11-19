import {
	ComponentGroup,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

export function TooltipPreview() {
	return (
		<ComponentGroup title="Tooltip" id="tooltip-component">
			<ComponentGroupPreview>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline">Hover</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Add to library</p>
					</TooltipContent>
				</Tooltip>
			</ComponentGroupPreview>
		</ComponentGroup>
	);
}
