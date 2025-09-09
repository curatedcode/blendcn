"use client";

import { useColorContext } from "~/components/color-context";
import { ColorUsageRange } from "~/components/color-usage-range";
import { CustomSwatch } from "~/components/custom-swatch";
import { cn } from "~/lib/utils";

export function ColorSwatchSection() {
	const { result } = useColorContext();

	return (
		<div className="md:-mt-1 flex w-full flex-col gap-1 sm:grid sm:grid-cols-5">
			<div className="flex flex-col">
				<ColorUsageRange>Backgrounds</ColorUsageRange>
				<SwatchContainer>
					<CustomSwatch
						scale={"primary"}
						step={"1"}
						cssVariable={"var(--primary-1)"}
						hex={result.accentScale[0].toUpperCase()}
						hexA={result.accentScaleAlpha[0].toUpperCase()}
						p3={result.accentScaleWideGamut[0]}
						p3A={result.accentScaleAlphaWideGamut[0]}
						className="col-start-1 row-start-1"
					/>
					<CustomSwatch
						scale={"primary"}
						step={"2"}
						cssVariable={"var(--primary-2)"}
						hex={result.accentScale[1].toUpperCase()}
						hexA={result.accentScaleAlpha[1].toUpperCase()}
						p3={result.accentScaleWideGamut[1]}
						p3A={result.accentScaleAlphaWideGamut[1]}
						className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"1"}
						cssVariable={"var(--gray-1)"}
						hex={result.grayScale[0].toUpperCase()}
						hexA={result.grayScaleAlpha[0].toUpperCase()}
						p3={result.grayScaleWideGamut[0]}
						p3A={result.grayScaleAlphaWideGamut[0]}
						className="col-start-2 row-start-1 sm:col-start-1 sm:row-start-2"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"2"}
						cssVariable={"var(--gray-2)"}
						hex={result.grayScale[1].toUpperCase()}
						hexA={result.grayScaleAlpha[1].toUpperCase()}
						p3={result.grayScaleWideGamut[1]}
						p3A={result.grayScaleAlphaWideGamut[1]}
						className="col-start-2 row-start-2"
					/>
				</SwatchContainer>
			</div>
			<div className="flex flex-col">
				<ColorUsageRange>Interactive components</ColorUsageRange>
				<SwatchContainer className="grid-cols-3">
					<CustomSwatch
						scale={"primary"}
						step={"3"}
						cssVariable={"var(--primary-3)"}
						hex={result.accentScale[2].toUpperCase()}
						hexA={result.accentScaleAlpha[2].toUpperCase()}
						p3={result.accentScaleWideGamut[2]}
						p3A={result.accentScaleAlphaWideGamut[2]}
						className="col-start-1 row-start-1"
					/>
					<CustomSwatch
						scale={"primary"}
						step={"4"}
						cssVariable={"var(--primary-4)"}
						hex={result.accentScale[3].toUpperCase()}
						hexA={result.accentScaleAlpha[3].toUpperCase()}
						p3={result.accentScaleWideGamut[3]}
						p3A={result.accentScaleAlphaWideGamut[3]}
						className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1"
					/>
					<CustomSwatch
						scale={"primary"}
						step={"5"}
						cssVariable={"var(--primary-5)"}
						hex={result.accentScale[4].toUpperCase()}
						hexA={result.accentScaleAlpha[4].toUpperCase()}
						p3={result.accentScaleWideGamut[4]}
						p3A={result.accentScaleAlphaWideGamut[4]}
						className="col-start-1 row-start-3 sm:col-start-3 sm:row-start-1"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"3"}
						cssVariable={"var(--gray-3)"}
						hex={result.grayScale[2].toUpperCase()}
						hexA={result.grayScaleAlpha[2].toUpperCase()}
						p3={result.grayScaleWideGamut[2]}
						p3A={result.grayScaleAlphaWideGamut[2]}
						className="col-start-2 row-start-1 sm:col-start-1 sm:row-start-2"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"4"}
						cssVariable={"var(--gray-4)"}
						hex={result.grayScale[3].toUpperCase()}
						hexA={result.grayScaleAlpha[3].toUpperCase()}
						p3={result.grayScaleWideGamut[3]}
						p3A={result.grayScaleAlphaWideGamut[3]}
						className="col-start-2 row-start-2"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"5"}
						cssVariable={"var(--gray-5)"}
						hex={result.grayScale[4].toUpperCase()}
						hexA={result.grayScaleAlpha[4].toUpperCase()}
						p3={result.grayScaleWideGamut[4]}
						p3A={result.grayScaleAlphaWideGamut[4]}
						className="col-start-2 row-start-3 sm:col-start-3 sm:row-start-2"
					/>
				</SwatchContainer>
			</div>
			<div className="flex flex-col">
				<ColorUsageRange>Borders and separators</ColorUsageRange>
				<SwatchContainer className="grid-cols-3">
					<CustomSwatch
						scale={"primary"}
						step={"6"}
						cssVariable={"var(--primary-6)"}
						hex={result.accentScale[5].toUpperCase()}
						hexA={result.accentScaleAlpha[5].toUpperCase()}
						p3={result.accentScaleWideGamut[5]}
						p3A={result.accentScaleAlphaWideGamut[5]}
						className="col-start-1 row-start-1"
					/>
					<CustomSwatch
						scale={"primary"}
						step={"7"}
						cssVariable={"var(--primary-7)"}
						hex={result.accentScale[6].toUpperCase()}
						hexA={result.accentScaleAlpha[6].toUpperCase()}
						p3={result.accentScaleWideGamut[6]}
						p3A={result.accentScaleAlphaWideGamut[6]}
						className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1"
					/>
					<CustomSwatch
						scale={"primary"}
						step={"8"}
						cssVariable={"var(--primary-8)"}
						hex={result.accentScale[7].toUpperCase()}
						hexA={result.accentScaleAlpha[7].toUpperCase()}
						p3={result.accentScaleWideGamut[7]}
						p3A={result.accentScaleAlphaWideGamut[7]}
						className="col-start-1 row-start-3 sm:col-start-3 sm:row-start-1"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"6"}
						cssVariable={"var(--gray-6)"}
						hex={result.grayScale[5].toUpperCase()}
						hexA={result.grayScaleAlpha[5].toUpperCase()}
						p3={result.grayScaleWideGamut[5]}
						p3A={result.grayScaleAlphaWideGamut[5]}
						className="col-start-2 row-start-1 sm:col-start-1 sm:row-start-2"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"7"}
						cssVariable={"var(--gray-7)"}
						hex={result.grayScale[6].toUpperCase()}
						hexA={result.grayScaleAlpha[6].toUpperCase()}
						p3={result.grayScaleWideGamut[6]}
						p3A={result.grayScaleAlphaWideGamut[6]}
						className="col-start-2 row-start-2"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"8"}
						cssVariable={"var(--gray-8)"}
						hex={result.grayScale[7].toUpperCase()}
						hexA={result.grayScaleAlpha[7].toUpperCase()}
						p3={result.grayScaleWideGamut[7]}
						p3A={result.grayScaleAlphaWideGamut[7]}
						className="col-start-2 row-start-3 sm:col-start-3 sm:row-start-2"
					/>
				</SwatchContainer>
			</div>
			<div className="flex flex-col">
				<ColorUsageRange>Solid colors</ColorUsageRange>
				<SwatchContainer>
					<CustomSwatch
						scale={"primary"}
						step={"9"}
						cssVariable={"var(--primary-9)"}
						hex={result.accentScale[8].toUpperCase()}
						hexA={result.accentScaleAlpha[8].toUpperCase()}
						p3={result.accentScaleWideGamut[8]}
						p3A={result.accentScaleAlphaWideGamut[8]}
						className="col-start-1 row-start-1"
					/>
					<CustomSwatch
						scale={"primary"}
						step={"10"}
						cssVariable={"var(--primary-10)"}
						hex={result.accentScale[9].toUpperCase()}
						hexA={result.accentScaleAlpha[9].toUpperCase()}
						p3={result.accentScaleWideGamut[9]}
						p3A={result.accentScaleAlphaWideGamut[9]}
						className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"9"}
						cssVariable={"var(--gray-9)"}
						hex={result.grayScale[8].toUpperCase()}
						hexA={result.grayScaleAlpha[8].toUpperCase()}
						p3={result.grayScaleWideGamut[8]}
						p3A={result.grayScaleAlphaWideGamut[8]}
						className="col-start-2 row-start-1 sm:col-start-1 sm:row-start-2"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"10"}
						cssVariable={"var(--gray-10)"}
						hex={result.grayScale[9].toUpperCase()}
						hexA={result.grayScaleAlpha[9].toUpperCase()}
						p3={result.grayScaleWideGamut[9]}
						p3A={result.grayScaleAlphaWideGamut[9]}
						className="col-start-2 row-start-2"
					/>
				</SwatchContainer>
			</div>
			<div className="flex flex-col">
				<ColorUsageRange>Accessible text</ColorUsageRange>
				<SwatchContainer>
					<CustomSwatch
						scale={"primary"}
						step={"11"}
						cssVariable={"var(--primary-11)"}
						hex={result.accentScale[10].toUpperCase()}
						hexA={result.accentScaleAlpha[10].toUpperCase()}
						p3={result.accentScaleWideGamut[10]}
						p3A={result.accentScaleAlphaWideGamut[10]}
						className="col-start-1 row-start-1"
					/>
					<CustomSwatch
						scale={"primary"}
						step={"12"}
						cssVariable={"var(--primary-12)"}
						hex={result.accentScale[11].toUpperCase()}
						hexA={result.accentScaleAlpha[11].toUpperCase()}
						p3={result.accentScaleWideGamut[11]}
						p3A={result.accentScaleAlphaWideGamut[11]}
						className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"11"}
						cssVariable={"var(--gray-11)"}
						hex={result.grayScale[10].toUpperCase()}
						hexA={result.grayScaleAlpha[10].toUpperCase()}
						p3={result.grayScaleWideGamut[10]}
						p3A={result.grayScaleAlphaWideGamut[10]}
						className="col-start-2 row-start-1 sm:col-start-1 sm:row-start-2"
					/>
					<CustomSwatch
						scale={"gray"}
						step={"12"}
						cssVariable={"var(--gray-12)"}
						hex={result.grayScale[11].toUpperCase()}
						hexA={result.grayScaleAlpha[11].toUpperCase()}
						p3={result.grayScaleWideGamut[11]}
						p3A={result.grayScaleAlphaWideGamut[11]}
						className="col-start-2 row-start-2"
					/>
				</SwatchContainer>
			</div>
		</div>
	);
}

function SwatchContainer({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn([
				"relative grid w-full grid-cols-2 gap-y-1",
				// rounded-2xl border-[color-mix(in_oklab,_var(--gray-8)_20%,_transparent)] border-x-2 p-4
				className,
			])}
		>
			{children}
		</div>
	);
}
