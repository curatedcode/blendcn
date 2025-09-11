import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export function ToggleGroupPreview() {
	return (
		<ComponentAccordionGroup title="Toggle Group">
			<ComponentAccordionSubGroup title="Default">
				<ToggleGroup type="multiple">
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<BoldIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<ItalicIcon />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						aria-label="Toggle strikethrough"
					>
						<UnderlineIcon />
					</ToggleGroupItem>
				</ToggleGroup>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Outline">
				<ToggleGroup
					variant="outline"
					type="multiple"
					className="bg-background"
				>
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<BoldIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<ItalicIcon />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						aria-label="Toggle strikethrough"
					>
						<UnderlineIcon />
					</ToggleGroupItem>
				</ToggleGroup>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Single">
				<ToggleGroup type="single">
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<BoldIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<ItalicIcon />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						aria-label="Toggle strikethrough"
					>
						<UnderlineIcon />
					</ToggleGroupItem>
				</ToggleGroup>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Small">
				<ToggleGroup type="single" size="sm">
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<BoldIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<ItalicIcon />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						aria-label="Toggle strikethrough"
					>
						<UnderlineIcon />
					</ToggleGroupItem>
				</ToggleGroup>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Large">
				<ToggleGroup type="multiple" size="lg">
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<BoldIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<ItalicIcon />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						aria-label="Toggle strikethrough"
					>
						<UnderlineIcon />
					</ToggleGroupItem>
				</ToggleGroup>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Disabled">
				<ToggleGroup type="multiple" disabled>
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<BoldIcon />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<ItalicIcon />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						aria-label="Toggle strikethrough"
					>
						<UnderlineIcon />
					</ToggleGroupItem>
				</ToggleGroup>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
