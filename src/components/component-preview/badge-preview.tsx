import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Badge } from "~/components/ui/badge";

export function BadgePreview() {
	return (
		<ComponentAccordionGroup title="Badge">
			<ComponentAccordionSubGroup title="Default">
				<Badge>Badge</Badge>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Secondary">
				<Badge variant={"secondary"}>Badge</Badge>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Destructive">
				<Badge variant={"destructive"}>Badge</Badge>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Outline">
				<Badge variant={"outline"}>Badge</Badge>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
