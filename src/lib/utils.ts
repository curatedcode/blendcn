import { type ClassValue, clsx } from "clsx";
import type * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type ExtractSchemaFromForm<T> = T extends UseFormReturn<infer U>
	? U
	: never;

export function composeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
	return (instance: T) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(instance);
			} else if (ref && typeof ref === "object" && "current" in ref) {
				(ref as React.RefObject<T>).current = instance;
			}
		});
	};
}
