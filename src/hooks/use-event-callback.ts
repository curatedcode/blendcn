/** https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useEventCallback/useEventCallback.ts */

import * as React from "react";
import { useIsomorphicLayoutEffect } from "~/hooks/use-isomorphic-layout-effect";

/**
 * Custom hook that creates a memoized event callback.
 * @template Args - An array of argument types for the event callback.
 * @template R - The return type of the event callback.
 * @param {(...args: Args) => R} fn - The callback function.
 * @returns {(...args: Args) => R} A memoized event callback function.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-event-callback)
 * @example
 * ```tsx
 * const handleClick = useEventCallback((event) => {
 *   // Handle the event here
 * });
 * ```
 */
export function useEventCallback<Args extends unknown[], R>(
	fn: (...args: Args) => R,
): (...args: Args) => R;
export function useEventCallback<Args extends unknown[], R>(
	fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined;
export function useEventCallback<Args extends unknown[], R>(
	fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined {
	const ref = React.useRef<typeof fn>(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});

	useIsomorphicLayoutEffect(() => {
		ref.current = fn;
	}, [fn]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: allow us to react to ref change
	return React.useCallback(
		(...args: Args) => ref.current?.(...args),
		[ref],
	) as (...args: Args) => R;
}
