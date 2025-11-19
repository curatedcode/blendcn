// originally from https://github.com/radix-ui/website/blob/main/components/ColorField.tsx
import Color from "colorjs.io";
import type * as React from "react";
import {
	formatForColorPicker,
	toShortFormat,
} from "~/components/color-field/helpers";

export type ColorPickerProps = {
	value?: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	committedColorRef: React.RefObject<{
		displayColor: string;
		rawColor: string;
	}>;
	/**
	 * The value passed to this will be the full unmodified color
	 */
	onValueChange?: (value: string) => void;
};

export function ColorPicker({
	value,
	setValue,
	inputValue,
	setInputValue,
	committedColorRef,
}: ColorPickerProps) {
	return (
		<div className="relative size-6">
			<input
				onChange={(event) => {
					// Some gymnastics here to make sure that we don't lose the current color space format,
					// e.g. if the user had "lch(45 70.5 286.08)" in the input before, it should stay "lch"
					// after using the native browser’s picker, which always outputs a color formatted as hex.
					const colorSpace = new Color(inputValue).spaceId;
					const color = new Color(event.currentTarget.value).toString({
						format: colorSpace,
					});
					const string = toShortFormat(color);

					if (string) {
						committedColorRef.current = {
							displayColor: string,
							rawColor: color,
						};
						setValue(formatForColorPicker(string));
						setInputValue(string);
					}
				}}
				tabIndex={-1}
				type="color"
				value={value}
				className="opacity size-full cursor-pointer [-webkit-tap-highlight-color:_transparent]"
				placeholder="Select color"
			/>
			<div
				className="pointer-events-none absolute inset-0 rounded-md border border-border"
				style={{ backgroundColor: value }}
				suppressHydrationWarning
			/>
		</div>
	);
}
