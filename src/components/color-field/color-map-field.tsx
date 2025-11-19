import * as SelectPrimitive from "@radix-ui/react-select";
import Color from "colorjs.io";
import { BrushIcon, RotateCcwIcon } from "lucide-react";
import * as React from "react";
import { useColorContext } from "~/components/color-context";
import {
	formatCssVariable,
	formatForColorPicker,
	getColorFromPalette,
	hasSelection,
	toCssFormat,
	toShortFormat,
	updateStylesheet,
} from "~/components/color-field/helpers";
import {
	type allCssVariables,
	colorMappings,
	DEFAULT_INPUT_COLOR,
	themeTokens,
} from "~/components/color-field/types";
import { useTheme } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectValue,
} from "~/components/ui/select";

type ColorMapFieldProps = {
	id: string;
	cssVariable: (typeof allCssVariables)[number];
};

type ColorState = {
	displayColor: string;
	rawColor: string;
};

export function ColorMapField({ id, cssVariable }: ColorMapFieldProps) {
	const [userColorHistory, setUserColorHistory] = React.useState<string[]>([]);

	const { resolvedTheme } = useTheme();
	const theme = React.useMemo(() => resolvedTheme ?? "light", [resolvedTheme]);

	const { paletteStylesObject, paletteStylesElementRef, setPaletteMappings } =
		useColorContext();

	const defaultSelectValue: (typeof themeTokens)[number] =
		colorMappings[cssVariable];

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
			variable: defaultSelectValue,
			paletteStylesObject,
			theme,
		},
		(arg: {
			variable: Parameters<typeof getColorFromPalette>["0"]["variable"];
			paletteStylesObject: ReturnType<
				typeof useColorContext
			>["paletteStylesObject"];
			theme: typeof resolvedTheme;
		}) => {
			const color = getColorFromPalette({
				variable: arg.variable,
				paletteStylesObject: arg.paletteStylesObject,
				theme: arg.theme,
			});

			const displayColor = toShortFormat(color);

			return {
				displayColor: displayColor ?? DEFAULT_INPUT_COLOR,
				rawColor: displayColor ? color : DEFAULT_INPUT_COLOR,
			};
		},
	);

	const [inputValue, setInputValue] = React.useState(color.displayColor);
	const committedColorRef = React.useRef(color);
	const preventInputSelectionRef = React.useRef(false);

	const validateAndCommit = (input: string) => {
		const rawColor = toCssFormat(input);
		const displayColor = toShortFormat(rawColor);

		if (displayColor === color.displayColor) return;

		if (displayColor) {
			const newColor: ColorState = {
				displayColor,
				rawColor,
			};
			setColor(rawColor);
			committedColorRef.current = newColor;
			setInputValue(displayColor);
			handleStylesheet(rawColor);
			handleHistoryUpdate(rawColor);
			setSelectedVar(rawColor);
			return;
		}

		setInputValue(committedColorRef.current.displayColor);
		setColor(committedColorRef.current.rawColor);
	};

	/**
	 * Updates the user color history state
	 * @param color - Unmodified full color
	 */
	const handleHistoryUpdate = React.useCallback((color: string) => {
		setUserColorHistory((prev) => {
			if (prev.includes(color)) return prev;

			// We only want to keep 5 values
			const newHistory = [color, ...prev];
			return newHistory.slice(0, 5);
		});
	}, []);

	const [selectedVar, setSelectedVar] =
		React.useState<string>(defaultSelectValue);

	const themeTokenOptions = React.useMemo(
		() =>
			themeTokens.map((token) => (
				<SelectItem key={token} value={token} className="group">
					<div
						className="hidden size-4 rounded-md border group-data-[slot=select-item]:block"
						style={{ backgroundColor: `var(--${token})` }}
					/>
					{formatCssVariable(token)}
				</SelectItem>
			)),
		[],
	);

	const userColorHistoryOptions = React.useMemo(
		() =>
			userColorHistory.map((color) => (
				<SelectItem key={color} value={color} className="group">
					<div
						className="hidden size-4 rounded-md border group-data-[slot=select-item]:block"
						style={{ backgroundColor: color }}
					/>
					{color}
				</SelectItem>
			)),
		[userColorHistory],
	);

	function handleSelect(value: string) {
		let newColor = value;
		// biome-ignore lint/suspicious/noExplicitAny: since this is a typed array it typescript errors when trying to use .includes
		const isThemeToken = themeTokens.includes(value as any);
		if (isThemeToken) {
			newColor = getColorFromPalette({
				variable: value as (typeof themeTokens)[number],
				paletteStylesObject,
				theme,
			});
		}

		setSelectedVar(value);
		setColor(newColor);
		setInputValue(toShortFormat(newColor) || newColor);
		committedColorRef.current = {
			displayColor: toShortFormat(newColor) || newColor,
			rawColor: newColor,
		};
		handleStylesheet(newColor);

		if (!isThemeToken) {
			handleHistoryUpdate(
				newColor.startsWith("#") ? newColor.toUpperCase() : newColor,
			);
		}
	}

	function handleStylesheet(value: string) {
		const stylesheet = paletteStylesElementRef.current?.sheet;
		if (!stylesheet) return;

		updateStylesheet({
			stylesheet,
			cssVariable,
			value,
			theme,
			setPaletteMappings,
		});
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: Allow us to react to any click in/on this div to highlight all text
		<div
			className="flex w-full items-center gap-1"
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
							setSelectedVar(committedColorRef.current.rawColor);
							setTimeout(() => inputRef.current?.select());

							// We want the user to see the value first
							event.stopPropagation();
						}
					}}
					placeholder={"Enter a color"}
					type="text"
					value={inputValue}
					className="w-full bg-background px-9 text-sm placeholder:normal-case"
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
									handleStylesheet(rawColor);
									handleHistoryUpdate(rawColor);
									setSelectedVar(rawColor);
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
				<Select onValueChange={handleSelect} value={selectedVar}>
					<SelectPrimitive.SelectTrigger
						data-slot="select-trigger"
						className="-translate-y-1/2 absolute top-1/2 right-0 flex h-9 w-7 items-center pr-2 hover:cursor-pointer focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
						title="Presets"
					>
						<SelectValue>
							<span className="sr-only">{selectedVar}</span>
							<BrushIcon className="size-4.5 stroke-[1.3]" />
						</SelectValue>
					</SelectPrimitive.SelectTrigger>
					<SelectContent>
						{userColorHistory.length ? (
							<SelectGroup>
								<SelectLabel>Recent</SelectLabel>
								{userColorHistoryOptions}
							</SelectGroup>
						) : null}
						<SelectGroup>
							<SelectLabel>Theme</SelectLabel>
							{themeTokenOptions}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{selectedVar !== defaultSelectValue && (
				<Button
					variant={"ghost"}
					size={"icon"}
					onClick={() => {
						setSelectedVar(defaultSelectValue);
						const defaultColor = getColorFromPalette({
							variable: defaultSelectValue,
							paletteStylesObject,
							theme,
						});
						const displayColor = toShortFormat(defaultColor);
						const newColor: ColorState = {
							displayColor: displayColor || defaultColor,
							rawColor: defaultColor,
						};
						setColor(defaultColor);
						setInputValue(displayColor || defaultColor);
						committedColorRef.current = newColor;
						handleStylesheet(defaultColor);
					}}
				>
					<span className="sr-only">Reset</span>
					<RotateCcwIcon />
				</Button>
			)}
		</div>
	);
}
