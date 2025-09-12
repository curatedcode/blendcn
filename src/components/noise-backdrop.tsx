export function NoiseBackdrop() {
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
					<feFuncA type="linear" slope="var(--noise-opacity-slope)"></feFuncA>
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
				className="opacity-[0.32] mix-blend-overlay dark:opacity-[0.09]"
			></rect>
		</svg>
	);
}
