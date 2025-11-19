import {
	ComponentGroup,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Slider } from "~/components/ui/slider";

export function SliderPreview() {
	return (
		<ComponentGroup title="Slider" id="slider-component">
			<ComponentGroupPreview>
				<Slider defaultValue={[50]} max={100} step={1} className="w-80" />
			</ComponentGroupPreview>
		</ComponentGroup>
	);
}
