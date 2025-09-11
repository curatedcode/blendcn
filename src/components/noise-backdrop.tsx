"use client";

import { useTheme } from "next-themes";
import { useIsHydrated } from "~/hooks/use-is-hydrated";

export function NoiseBackdrop() {
	const { resolvedTheme } = useTheme();
	const isHydrated = useIsHydrated();

	if (!isHydrated) return null;

	if (resolvedTheme === "light") {
		return (
			<svg
				className="pointer-events-none fixed top-0 left-0 z-[-1] size-full bg-muted"
				// 	style={{
				// 		backgroundImage: `
				//   radial-gradient(
				//     circle at top right,
				//     var(--primary-4),
				//     var(--muted) 70%
				//   )
				// `,
				// 	}}
			>
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
						<feFuncA type="linear" slope="0.2"></feFuncA>
					</feComponentTransfer>
					<feComponentTransfer>
						<feFuncR type="linear" slope="1.2" intercept="-0.10" />
						<feFuncG type="linear" slope="1.2" intercept="-0.10" />
						<feFuncB type="linear" slope="1.2" intercept="-0.10" />
					</feComponentTransfer>
				</filter>
				<rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
			</svg>
		);
	}

	return (
		<svg className="pointer-events-none fixed top-0 left-0 z-[-1] size-full bg-background">
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
					<feFuncA type="linear" slope="0.1"></feFuncA>
				</feComponentTransfer>
				<feComponentTransfer>
					<feFuncR type="linear" slope="1.2" intercept="-0.10" />
					<feFuncG type="linear" slope="1.2" intercept="-0.10" />
					<feFuncB type="linear" slope="1.2" intercept="-0.10" />
				</feComponentTransfer>
			</filter>
			<rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
		</svg>
	);
}
