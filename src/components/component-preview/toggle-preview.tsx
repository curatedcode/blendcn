import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Toggle } from "~/components/ui/toggle";

export function TogglePreview() {
	return (
		<ComponentAccordionGroup title="Toggle">
			<ComponentAccordionSubGroup title="Default">
				<Toggle aria-label="Toggle italic">
					<BoldIcon />
				</Toggle>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Outline">
				<Toggle
					variant="outline"
					aria-label="Toggle italic"
					className="bg-background"
				>
					<ItalicIcon />
				</Toggle>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Text">
				<Toggle aria-label="Toggle italic">
					<ItalicIcon />
					Italic
				</Toggle>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Small">
				<Toggle size="sm" aria-label="Toggle italic">
					<ItalicIcon />
				</Toggle>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Large">
				<Toggle size="lg" aria-label="Toggle italic">
					<ItalicIcon />
				</Toggle>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Disabled">
				<Toggle aria-label="Toggle italic" disabled>
					<UnderlineIcon />
				</Toggle>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
