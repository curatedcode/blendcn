"use client";

import Color from "colorjs.io";
import * as React from "react";
import {
	DEFAULT_COLOR,
	toCssFormat,
	toShortFormat,
} from "~/components/color-field/types";
import { Input } from "~/components/ui/input";
import { useIsomorphicLayoutEffect } from "~/hooks/use-isomorphic-layout-effect";
import { cn } from "~/lib/utils";

interface ColorTextFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
}

export const ColorTextField = React.forwardRef<
	HTMLInputElement,
	ColorTextFieldProps
>(
	(
		{
			defaultValue = DEFAULT_COLOR,
			disabled,
			onBlur,
			onChange,
			onKeyDownCapture,
			onValueChange,
			placeholder = "Enter a color",
			readOnly,
			value,
			className,
			...props
		},
		forwardedRef,
	) => {
		const inputRef = React.useRef<HTMLInputElement>(null);
		const [inputValue, setInputValue] = React.useState(
			toShortFormat(value ?? defaultValue) ?? DEFAULT_COLOR,
		);

		const committedColorRef = React.useRef(inputValue);
		const preventInputSelectionRef = React.useRef(false);

		const color = React.useMemo(() => {
			const string = toShortFormat(inputValue);
			return string ? string : committedColorRef.current;
		}, [inputValue]);

		// sync with incoming value
		useIsomorphicLayoutEffect(() => {
			const string = toShortFormat(value);
			if (string) {
				setInputValue(string);
				committedColorRef.current = string;
			}
		}, [value]);

		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: we need to make sure input doesn't lose focus. unique element unique requirements.
			<div
				className="flex w-full max-w-60 items-center gap-2"
				onMouseUp={() => {
					if (preventInputSelectionRef.current) return;

					const inputHasFocus = document.activeElement === inputRef.current;
					if (inputHasFocus && !hasSelection(inputRef.current)) {
						inputRef.current?.select();
						preventInputSelectionRef.current = true;
					}
				}}
			>
				<div className="relative flex-1">
					<Input
						ref={(el) => {
							inputRef.current = el;
							if (typeof forwardedRef === "function") {
								forwardedRef(el);
							} else if (forwardedRef) {
								(
									forwardedRef as React.RefObject<HTMLInputElement | null>
								).current = el;
							}
						}}
						autoCapitalize="none"
						autoComplete="off"
						autoCorrect="off"
						placeholder={placeholder}
						disabled={disabled}
						readOnly={readOnly}
						type="text"
						value={inputValue}
						className={cn("bg-background pl-9 uppercase", className)}
						onBlur={(event) => {
							committedColorRef.current = color;
							preventInputSelectionRef.current = false;
							setInputValue(color);
							onValueChange?.(toCssFormat(color));

							if (navigator.userAgent.toLowerCase().includes("firefox")) {
								inputRef.current?.setSelectionRange(0, 0);
							}

							onBlur?.(event);
						}}
						onChange={(event) => {
							setInputValue(event.currentTarget.value);
							onChange?.(event);
						}}
						onKeyDownCapture={(event) => {
							if (event.key === "Enter") {
								if (committedColorRef.current !== inputValue) {
									committedColorRef.current = color;
									setInputValue(color);
									onValueChange?.(toCssFormat(color));
									setTimeout(() => inputRef.current?.select());
									event.preventDefault();
								}
							}

							if (event.key === "Escape") {
								if (committedColorRef.current !== inputValue) {
									setInputValue(committedColorRef.current);
									setTimeout(() => inputRef.current?.select());
									event.stopPropagation();
								}
							}

							onKeyDownCapture?.(event);
						}}
						{...props}
					/>
					<div className="-translate-y-1/2 absolute top-1/2 left-0 flex size-9 items-center pl-2">
						<div className="relative size-6">
							<input
								disabled={disabled || readOnly}
								title="Select color"
								className="absolute inset-0 size-6 cursor-pointer opacity-0"
								onChange={(event) => {
									const colorSpace = new Color(value ?? DEFAULT_COLOR).spaceId;
									const string = toShortFormat(
										new Color(event.currentTarget.value)
											.to(colorSpace)
											.toString(),
									);

									if (string) {
										committedColorRef.current = string;
										setInputValue(string);
										onValueChange?.(toCssFormat(string));
									}

									onChange?.(event);
								}}
								tabIndex={-1}
								type="color"
								value={toCssFormat(
									toShortFormat(
										new Color(toCssFormat(color))
											.to("srgb")
											.toString({ format: "hex" }),
									) ?? "",
								)}
							/>
							<div
								className="h-full w-full rounded-md border"
								style={{ backgroundColor: toCssFormat(color) }}
								suppressHydrationWarning
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
);

ColorTextField.displayName = "ColorTextField";

const hasSelection = (input: HTMLInputElement | null) => {
	if (input) {
		const { selectionStart, selectionEnd } = input;
		return (selectionEnd ?? 0) - (selectionStart ?? 0) > 0;
	}
	return false;
};
