import { ColorContextProvider } from "~/components/color-context";
import { ColorMappingSection } from "~/components/color-mapping-section";
import { ColorPickerSection } from "~/components/color-picker-section";
import { ColorSwatchSection } from "~/components/color-swatch-section";
import { ComponentPreview } from "~/components/component-preview";
import { Header } from "~/components/header";
import { NoiseBackdrop } from "~/components/noise-backdrop";
import { Separator } from "~/components/ui/separator";

export default function Home() {
	return (
		<ColorContextProvider>
			<div className="relative">
				<NoiseBackdrop />
				<div className="mx-aut flex max-w-desktop flex-col pt-12 md:flex-row">
					<div className="flex w-full flex-col gap-3 px-3 md:max-w-[400px] md:pr-0 md:pl-3">
						<ColorPickerSection />
						<Separator className="mt-2" />
						<ColorMappingSection />
						<Separator className="mt-2" />
						<ColorSwatchSection />
					</div>
					<div className="flex w-full flex-col md:border-l">
						<Separator className="mx-auto mt-5 mb-2 data-[orientation=horizontal]:w-[calc(100%-24px)] md:hidden" />
						<Header />
						<Separator className="mx-auto hidden data-[orientation=horizontal]:w-[calc(100%-24px)] md:block md:data-[orientation=horizontal]:w-full" />
						<ComponentPreview />
					</div>
				</div>
			</div>
		</ColorContextProvider>
	);
}
