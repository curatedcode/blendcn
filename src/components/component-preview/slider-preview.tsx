import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Slider } from "~/components/ui/slider";
import { cn } from "~/lib/utils";

export function SliderPreview() {
	return (
		<ComponentAccordionGroup title="Slider">
			<ComponentAccordionSubGroup title="Default">
				<SliderDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

type SliderProps = React.ComponentProps<typeof Slider>;

function SliderDemo({ className, ...props }: SliderProps) {
	return (
		<Slider
			defaultValue={[50]}
			max={100}
			step={1}
			className={cn("w-80", className)}
			{...props}
		/>
	);
}
