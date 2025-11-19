// originally from https://github.com/radix-ui/website/blob/main/components/ColorField.tsx
import Color from "colorjs.io";
import * as React from "react";
import {
	formatForColorPicker,
	hasSelection,
	toCssFormat,
	toShortFormat,
} from "~/components/color-field/helpers";
import { DEFAULT_INPUT_COLOR } from "~/components/color-field/types";
import { Input } from "~/components/ui/input";

type ColorTextFieldProps = {
	id: string;
	value: string;
	onValueChange: (value: string) => void;
};

type ColorState = {
	displayColor: string;
	rawColor: string;
};

export function ColorTextField({
	id,
	onValueChange,
	value,
}: ColorTextFieldProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const [color, setColor] = React.useReducer(
		(state: ColorState, color: string): ColorState => {
			const displayColor = toShortFormat(color);
			if (!displayColor) return state;
			return {
				displayColor,
				rawColor: color,
			};
		},
		{
			value,
		},
		(arg: { value: string }): ColorState => {
			const displayColor = toShortFormat(arg.value);
			return {
				displayColor: displayColor ?? DEFAULT_INPUT_COLOR,
				rawColor: displayColor ? arg.value : `#${DEFAULT_INPUT_COLOR}`,
			};
		},
	);

	const [inputValue, setInputValue] = React.useState(color.displayColor);
	const committedColorRef = React.useRef(color);
	const preventInputSelectionRef = React.useRef(false);

	const validateAndCommit = (input: string) => {
		const rawColor = toCssFormat(input);
		const displayColor = toShortFormat(rawColor);

		if (displayColor) {
			setColor(rawColor);
			committedColorRef.current = {
				displayColor,
				rawColor,
			};
			setInputValue(displayColor);
			onValueChange(rawColor);
			return;
		}

		setInputValue(committedColorRef.current.displayColor);
		setColor(committedColorRef.current.rawColor);
	};

	// sync with parent prop
	React.useEffect(() => {
		const displayColor = toShortFormat(value);
		if (displayColor) {
			setColor(value);
			setInputValue(displayColor);
			committedColorRef.current = {
				displayColor,
				rawColor: value,
			};
		}
	}, [value]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: Allow us to react to any click in/on this div to select text
		<div
			className="flex w-full items-center gap-2"
			onMouseUp={() => {
				if (preventInputSelectionRef.current) return;

				const inputHasFocus = document.activeElement === inputRef.current;

				if (inputHasFocus && !hasSelection(inputRef.current)) {
					inputRef.current?.select();

					// Don't re-select the input value on next mouse up until blurred
					preventInputSelectionRef.current = true;
				}
			}}
		>
			<div className="relative flex-1">
				<Input
					id={id}
					ref={inputRef}
					autoCapitalize="none"
					autoComplete="off"
					autoCorrect="off"
					onChange={(event) => {
						setInputValue(event.currentTarget.value);
					}}
					onBlur={(_event) => {
						validateAndCommit(inputValue);
						preventInputSelectionRef.current = false;

						// Firefox doesn't really reset input selection range on blur, and then
						// recovers it on focus, which messes with our selection on mouse up.
						if (navigator.userAgent.toLowerCase().includes("firefox")) {
							inputRef.current?.setSelectionRange(0, 0);
						}
					}}
					onKeyDownCapture={(event) => {
						if (event.key === "Enter") {
							validateAndCommit(inputValue);
							setTimeout(() => inputRef.current?.select());

							// We want the user to see the value first
							event.preventDefault();
						}

						if (event.key === "Escape") {
							setInputValue(committedColorRef.current.displayColor);
							setColor(committedColorRef.current.rawColor);
							setTimeout(() => inputRef.current?.select());

							// We want the user to see the value first
							event.stopPropagation();
						}
					}}
					placeholder={"Enter a color"}
					type="text"
					value={inputValue}
					className="w-full bg-background pl-9 text-sm placeholder:normal-case"
				/>
				<div className="-translate-y-1/2 absolute top-1/2 left-0 flex size-9 items-center pl-2">
					<div className="relative size-6">
						<input
							onChange={(event) => {
								// Some gymnastics here to make sure that we don't lose the current color space format,
								// e.g. if the user had "lch(45 70.5 286.08)" in the input before, it should stay "lch"
								// after using the native browser's picker, which always outputs a color formatted as hex.
								const colorSpace = new Color(color.rawColor).spaceId;
								const rawColor = new Color(event.currentTarget.value).toString({
									format: colorSpace,
								});
								const displayColor = toShortFormat(rawColor);

								if (displayColor) {
									setColor(rawColor);
									setInputValue(displayColor);
									committedColorRef.current = {
										displayColor,
										rawColor,
									};
									event.currentTarget.value = formatForColorPicker(rawColor);
									onValueChange(rawColor);
								}
							}}
							tabIndex={-1}
							type="color"
							value={formatForColorPicker(color.rawColor)}
							className="size-full cursor-pointer opacity-0 [-webkit-tap-highlight-color:_transparent]"
							placeholder="Select color"
						/>
						<div
							className="pointer-events-none absolute inset-0 rounded-md border border-border transition-colors"
							style={{ backgroundColor: color.rawColor }}
							suppressHydrationWarning
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
