import { ColorContextProvider } from "~/components/color-context";
import { ColorPickerSection } from "~/components/color-picker-section";
import { ColorSwatchSection } from "~/components/color-swatch-section";
import { ComponentPreview } from "~/components/component-preview";
import { ThemeControlHeader } from "~/components/theme-control-header";

export default function Home() {
	return (
		<ColorContextProvider>
			<div className="absolute right-0 left-0 z-[-1] h-[480px] bg-gradient-to-b from-[var(--primary-4)] to-transparent opacity-60" />
			<div className="px-4 py-12 sm:px-8">
				<ThemeControlHeader />
				<div className="grid gap-4 md:flex">
					<ColorPickerSection />
					<ColorSwatchSection />
				</div>
				<ComponentPreview className="mt-12" />
			</div>
		</ColorContextProvider>
	);
}
