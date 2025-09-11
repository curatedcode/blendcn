"use client";

import { ColorSelectField } from "~/components/color-field/color-select-field";
import { defaultColorMappings } from "~/components/color-field/types";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export function ColorMappingSection({ className }: { className?: string }) {
	const allVariables = Object.keys(
		defaultColorMappings,
	) as (keyof typeof defaultColorMappings)[];

	return (
		<div className={cn("flex flex-col gap-3 md:pr-3", className)}>
			<h1 className="font-semibold text-lg">Mapping</h1>
			{allVariables.map((key: keyof typeof defaultColorMappings) => (
				<div
					className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
					key={key}
				>
					<Label>{capitalizeVariable(key)}</Label>
					<ColorSelectField cssVariable={key} />
				</div>
			))}
		</div>
	);
}

function capitalizeVariable(value: keyof typeof defaultColorMappings) {
	const words = value.split("-");
	const capitalized: string[] = [];

	for (const word of words) {
		const firstLetter = word.charAt(0).toUpperCase();
		capitalized.push(`${firstLetter}${word.slice(1).toLowerCase()}`);
	}

	return capitalized.join(" ");
}
