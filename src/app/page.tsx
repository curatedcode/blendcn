import { ColorContextProvider } from "~/components/color-context";
import { ColorMappingSection } from "~/components/color-mapping-section";
import { ColorPickerSection } from "~/components/color-picker-section";
import { ComponentPreview } from "~/components/component-preview";
import { Header } from "~/components/header";
import { NoiseBackdrop } from "~/components/noise-backdrop";
import { Separator } from "~/components/ui/separator";
import { generateRandomPalette } from "~/lib/colors/generate-random-palette";

export default function Home() {
	const initialPalette = generateRandomPalette();

	return (
		<ColorContextProvider initialPalette={initialPalette}>
			<div className="relative">
				<NoiseBackdrop />
				<div className="mx-auto flex max-w-desktop px-3 pt-12">
					<div className="flex w-full max-w-[400px] flex-col gap-3">
						<ColorPickerSection />
						<Separator />
						<ColorMappingSection />
					</div>
					<div className="flex w-full flex-col border-border border-l">
						<Header />
						<Separator />
						<ComponentPreview />
					</div>
				</div>
			</div>
		</ColorContextProvider>
	);
}
