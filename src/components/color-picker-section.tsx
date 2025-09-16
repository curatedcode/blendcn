"use client";

import { useColorContext } from "~/components/color-context";
import { ColorTextField } from "~/components/color-field/color-text-field";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export function ColorPickerSection({ className }: { className?: string }) {
	const {
		accentValue,
		setAccentValue,
		grayValue,
		setGrayValue,
		bgValue,
		setBgValue,
	} = useColorContext();

	return (
		<div className={cn("flex w-full flex-col gap-3", className)}>
			<h1 className="flex h-9 items-center font-semibold text-lg md:h-[38px] md:pr-3">
				Theme
			</h1>
			<Separator className="-mt-2" />
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:pr-3">
				<Label htmlFor="accent">Accent</Label>
				<ColorTextField
					id="accent"
					value={accentValue}
					onValueChange={setAccentValue}
					cssVariable="accent-base"
				/>
			</div>
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:pr-3">
				<Label htmlFor="gray">Gray</Label>
				<ColorTextField
					id="gray"
					value={grayValue}
					onValueChange={setGrayValue}
					cssVariable="gray-base"
				/>
			</div>
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:pr-3">
				<Label htmlFor="background">Background</Label>
				<ColorTextField
					id="background"
					value={bgValue}
					onValueChange={setBgValue}
					cssVariable="background-base"
				/>
			</div>
		</div>
	);
}
