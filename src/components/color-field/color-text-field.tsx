"use client";

import Color from "colorjs.io";
import * as React from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface ColorTextFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	value: string; // single source of truth from parent
	onValueChange?: (value: string) => void;
	placeholder?: string;
	cssVariable: "accent-base" | "gray-base" | "background-base";
}

export const ColorTextField = React.forwardRef<
	HTMLInputElement,
	ColorTextFieldProps
>(
	(
		{
			value,
			onValueChange,
			placeholder = "Enter a color",
			className,
			cssVariable,
			...props
		},
		forwardedRef,
	) => {
		const [inputValue, setInputValue] = React.useState<string>(
			value.replace("#", ""),
		);
		const committedRef = React.useRef<string>(value.replace("#", ""));

		const normalizeColor = React.useCallback((input: string): string => {
			try {
				const colorObj = new Color(input);
				let hex = colorObj
					.to("srgb")
					.toString({ format: "hex" })
					.replace("#", "");

				switch (hex.length) {
					case 1:
						hex = hex.repeat(6);
						break;
					case 2:
						hex = hex.repeat(3);
						break;
					case 3: {
						const [r, g, b] = hex.split("");
						hex = `${r}${r}${g}${g}${b}${b}`;
					}
				}

				return hex.toUpperCase();
			} catch {
				return committedRef.current;
			}
		}, []);

		function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
			setInputValue(e.currentTarget.value);
		}

		function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
			if (e.key === "Enter") {
				const normalized = normalizeColor(inputValue);
				committedRef.current = normalized;
				setInputValue(normalized);
				onValueChange?.(`#${normalized}`);
			} else if (e.key === "Escape") {
				setInputValue(committedRef.current);
				e.stopPropagation();
			}
		}

		function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
			const normalized = normalizeColor(e.currentTarget.value);
			committedRef.current = normalized;
			setInputValue(normalized);
			onValueChange?.(`#${normalized}`);
		}

		React.useEffect(() => {
			const normalized = normalizeColor(value);
			setInputValue(normalized);
			committedRef.current = normalized;
		}, [value, normalizeColor]);

		return (
			<div className="flex w-full items-center gap-2 sm:max-w-48">
				<div className="relative flex-1">
					<Input
						ref={forwardedRef}
						type="text"
						value={inputValue}
						onChange={handleTextChange}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className={cn(
							"w-full bg-background pl-9 text-sm uppercase placeholder:normal-case",
							className,
						)}
						{...props}
					/>
					<div className="-translate-y-1/2 absolute top-1/2 left-0 flex size-9 items-center pl-2">
						<div className="relative size-6">
							<input
								type="color"
								value={`#${inputValue}`}
								disabled={props.disabled || props.readOnly}
								onChange={handleColorChange}
								title="Select color"
								className="absolute inset-0 size-6 cursor-pointer opacity-0"
							/>
							<div
								className="size-full rounded-md border"
								style={{
									backgroundColor: `var(--${cssVariable})`,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
