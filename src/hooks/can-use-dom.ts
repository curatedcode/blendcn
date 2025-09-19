// biome-ignore-all lint/complexity/useOptionalChain: Breaks build if we switch to an optional chain. We need to be sure window exists.
export const canUseDOM = !!(
	typeof window !== "undefined" &&
	window.document &&
	window.document.createElement
);
