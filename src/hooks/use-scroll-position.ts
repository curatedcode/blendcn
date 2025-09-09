"use client";

import * as React from "react";

type Options = {
	enabled?: boolean;
	threshold?: number;
};

export function useScrollPosition({
	enabled = true,
	threshold = 2,
}: Options = {}) {
	const [scrollY, setScrollY] = React.useState<number>(0);
	const [direction, setDirection] = React.useState<"up" | "down" | "none">(
		"none",
	);
	const [didSyncInitial, setDidSyncInitial] = React.useState(false);
	const rafId = React.useRef<number | null>(null);
	const lastYRef = React.useRef<number>(0);

	React.useEffect(() => {
		if (!enabled || typeof window === "undefined") return;

		const getY = () => window.scrollY || window.pageYOffset || 0;

		const initialY = getY();
		lastYRef.current = initialY;
		setScrollY(initialY);
		const t = setTimeout(() => setDidSyncInitial(true), 0);

		const onScroll = () => {
			if (rafId.current != null) return;
			rafId.current = window.requestAnimationFrame(() => {
				rafId.current = null;
				const y = getY();
				const last = lastYRef.current;
				const delta = y - last;

				if (Math.abs(delta) >= threshold) {
					setScrollY(y);
					setDirection(delta > 0 ? "down" : "up");
					lastYRef.current = y;
				}
			});
		};

		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			clearTimeout(t);
			window.removeEventListener("scroll", onScroll as EventListener);
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
				rafId.current = null;
			}
		};
	}, [enabled, threshold]);

	return { scrollY, direction, didSyncInitial };
}
