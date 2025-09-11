import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Button } from "~/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

export function TooltipPreview() {
	return (
		<ComponentAccordionGroup title="Tooltip">
			<ComponentAccordionSubGroup title="Example">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline">Hover</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Add to library</p>
					</TooltipContent>
				</Tooltip>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
