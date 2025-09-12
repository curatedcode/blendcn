"use client";

import { useTheme } from "next-themes";

export function NoiseBackdrop() {
	const { resolvedTheme } = useTheme();

	return (
		<svg className="pointer-events-none fixed top-0 left-0 z-[-1] size-full">
			<title>Noise filter</title>
			<filter id="noise-filter">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.5"
					numOctaves="4"
					stitchTiles="stitch"
				></feTurbulence>
				<feColorMatrix type="saturate" values="0"></feColorMatrix>
				<feComponentTransfer>
					<feFuncR type="linear" slope="1.5"></feFuncR>
					<feFuncG type="linear" slope="1.5"></feFuncG>
					<feFuncB type="linear" slope="1.5"></feFuncB>
					<OpacitySlope resolvedTheme={resolvedTheme} />
				</feComponentTransfer>
				<feComponentTransfer>
					<feFuncR type="linear" slope="1.2" intercept="-0.10" />
					<feFuncG type="linear" slope="1.2" intercept="-0.10" />
					<feFuncB type="linear" slope="1.2" intercept="-0.10" />
				</feComponentTransfer>
			</filter>
			<rect
				width="100%"
				height="100%"
				filter="url(#noise-filter)"
				fill="currentColor"
				className="mix-blend-overlay"
			></rect>
		</svg>
	);
}

function OpacitySlope({
	resolvedTheme,
}: {
	resolvedTheme: string | undefined;
}) {
	if (resolvedTheme === "light") {
		return (
			<feFuncA type="linear" slope="0.3" suppressHydrationWarning></feFuncA>
		);
	}

	return (
		<feFuncA type="linear" slope="0.08" suppressHydrationWarning></feFuncA>
	);
}
