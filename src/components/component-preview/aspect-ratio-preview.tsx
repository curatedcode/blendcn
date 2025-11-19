import { Image } from "@unpic/react";
import {
	ComponentGroup,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export function AspectRatioPreview() {
	return (
		<ComponentGroup title="Aspect Ratio" id="aspect-ratio-component">
			<ComponentGroupPreview>
				<AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
					<Image
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt="Photo by Drew Beamer"
						layout="fullWidth"
						className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</AspectRatio>
			</ComponentGroupPreview>
		</ComponentGroup>
	);
}
