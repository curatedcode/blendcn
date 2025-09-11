import Image from "next/image";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export function AspectRatioPreview() {
	return (
		<ComponentAccordionGroup title="Aspect Ratio">
			<ComponentAccordionSubGroup title="Example">
				<div className="h-[216px] w-96">
					<AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
						<Image
							src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
							alt="Photo by Drew Beamer"
							fill
							className="size-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</AspectRatio>
				</div>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
