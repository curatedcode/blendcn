import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { ColorContextProvider } from "~/components/color-context";
import { ColorMappingSection } from "~/components/color-mapping-section";
import { ColorPickerSection } from "~/components/color-picker-section";
import { ColorSwatchSection } from "~/components/color-swatch-section";
import { Logo } from "~/components/logo";
import { NoiseBackdrop } from "~/components/noise-backdrop";
import { ThemeExportDialog } from "~/components/theme-export-dialog";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Skeleton } from "~/components/ui/skeleton";

const DemoApp = React.lazy(() =>
	import("~/components/demo-app").then((module) => ({
		default: module.DemoApp,
	})),
);

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ColorContextProvider>
			<div className="relative">
				<NoiseBackdrop />
				<div className="mx-auto min-h-screen max-w-desktop px-2 pt-20">
					<div className="flex flex-col items-center gap-6">
						<div className="mx-auto flex w-fit items-center gap-3.5">
							<Logo variant="transparent" className="size-22 md:size-24" />
							<div>
								<span className="font-semibold text-2xl md:text-3xl">
									BlendCN
								</span>
								<p className="text-muted-foreground text-sm md:text-base">
									Radix-based theme builder <br /> with live shadcn/ui previews.
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
			<React.Suspense
				fallback={<Skeleton className="h-screen w-full bg-muted" />}
			>
				<DemoApp />
			</React.Suspense>
		</ColorContextProvider>
	);
}
