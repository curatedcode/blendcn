import { createFileRoute } from "@tanstack/react-router";
import { ColorContextProvider } from "~/components/color-context";
import { ColorMappingSection } from "~/components/color-mapping-section";
import { ColorPickerSection } from "~/components/color-picker-section";
import { ColorSwatchSection } from "~/components/color-swatch-section";
import { DemoApp } from "~/components/demo-app";
import { Logo } from "~/components/logo";
import { NoiseBackdrop } from "~/components/noise-backdrop";
import { ThemeExportDialog } from "~/components/theme-export-dialog";
import { ThemeSwitcher } from "~/components/theme-switcher";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	ssr: false,
});

function RouteComponent() {
	return (
		<ColorContextProvider>
			<div className="relative">
				<NoiseBackdrop />
				<div className="mx-auto min-h-screen max-w-desktop px-2 pt-20">
					<div className="flex flex-col items-center gap-6">
						<div className="mx-auto flex w-fit items-center gap-3.5 md:pl-5">
							<Logo
								variant="transparent"
								className="spin-in-180 zoom-in-40 fade-in size-24 animate-in duration-800"
							/>
							<div className="fade-in max-w-xs animate-in duration-800">
								<span className="font-semibold text-2xl md:text-3xl">
									BlendCN
								</span>
								<p className="text-muted-foreground text-sm md:text-base">
									Radix-based theme builder with live shadcn/ui previews.
								</p>
							</div>
						</div>
						<div className="mb-6 grid w-fit gap-2">
							<ThemeSwitcher />
							<ThemeExportDialog />
						</div>
						<ColorPickerSection />
						<ColorSwatchSection />
						<ColorMappingSection />
					</div>
				</div>
			</div>
			<DemoApp />
		</ColorContextProvider>
	);
}
