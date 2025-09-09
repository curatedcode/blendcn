import { type ClassValue, clsx } from "clsx";
import type { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type ExtractSchemaFromForm<T> = T extends UseFormReturn<infer U>
	? U
	: never;
