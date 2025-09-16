"use client";

import Color from "colorjs.io";
import { RotateCcwIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { useColorContext } from "~/components/color-context";
import {
	convertHexToLonghand,
	DEFAULT_COLOR,
	defaultColorMappings,
	extendedTokens,
	formatColorVariable,
	paletteTokens,
	stripHexAlpha,
	type themeTokens,
} from "~/components/color-field/types";
import { Button } from "~/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

interface ColorSelectFieldProps
	extends React.InputHTMLAttributes<HTMLSelectElement> {
	cssVariable: keyof typeof defaultColorMappings;
}

export const ColorSelectField = React.forwardRef<
	HTMLSelectElement,
	Omit<ColorSelectFieldProps, "value" | "onChange" | "defaultValue">
>(
	(
		{
			cssVariable,
			disabled,
			onBlur,
			onKeyDownCapture,
			placeholder = "Select a color",
			readOnly,
			className,
			...props
		},
		forwardedRef,
	) => {
		const defaultSelectValue: (typeof themeTokens)[number] =
			defaultColorMappings[cssVariable];

		const [displayValue, setDisplayValue] = React.useState<string | undefined>(
			formatColorVariable(defaultSelectValue),
		);

		const { paletteStylesObject, paletteStylesElementRef, setPaletteMappings } =
			useColorContext();

		const { resolvedTheme } = useTheme();
		const theme = React.useMemo(
			() => (resolvedTheme ?? "light") as "light" | "dark",
			[resolvedTheme],
		);

		const defaultInputValue = React.useMemo(
			() =>
				getVariableColor({
					variable: defaultSelectValue,
					paletteStylesObject,
					theme,
				}),
			[defaultSelectValue, theme, paletteStylesObject],
		);

		const [selectedVar, setSelectedVar] = React.useState<
			(typeof themeTokens)[number] | undefined
		>(defaultSelectValue);

		const [inputValue, setInputValue] = React.useState(
			defaultInputValue ??
				(selectedVar
					? getVariableColor({
							variable: selectedVar,
							paletteStylesObject,
							theme,
						})
					: DEFAULT_COLOR),
		);

		const currentSelectColorRef = React.useRef<string>(
			selectedVar
				? getVariableColor({
						variable: selectedVar,
						paletteStylesObject,
						theme,
					})
				: null,
		);

		const [isCustomColor, setIsCustomColor] = React.useState(
			!selectedVar && inputValue !== DEFAULT_COLOR,
		);

		const paletteOptions = React.useMemo(
			() =>
				paletteTokens.map((token) => (
					<SelectItem key={token} value={token} className="group">
						<div
							className="hidden size-4 rounded-md border group-data-[slot=select-item]:block"
							style={{ backgroundColor: `var(--${token})` }}
						/>
						{formatColorVariable(token)}
					</SelectItem>
				)),
			[],
		);

		const extendedOptions = React.useMemo(
			() =>
				extendedTokens.map((token) => (
					<SelectItem key={token} value={token} className="group">
						<div
							className="hidden size-4 rounded-md border group-data-[slot=select-item]:block"
							style={{ backgroundColor: `var(--${token})` }}
						/>
						{formatColorVariable(token)}
					</SelectItem>
				)),
			[],
		);

		function handleCssChange(newColor: string) {
			const stylesheet = paletteStylesElementRef.current?.sheet;
			if (!stylesheet) return;
			updateCssVariable({
				stylesheet,
				cssVariable,
				newHexValue: newColor,
				newWideGamutValue: new Color(newColor).toString({
					format: "oklch",
				}),
				theme,
				setPaletteMappings,
			});
		}

		React.useEffect(() => {
			setDisplayValue(undefined);
		}, []);

		return (
			<div className="flex w-full items-center gap-1 sm:max-w-48">
				<div className="relative flex-1">
					<Select
						onValueChange={(variable: (typeof themeTokens)[number]) => {
							const newColor = getVariableColor({
								variable,
								paletteStylesObject,
								theme,
							});
							currentSelectColorRef.current = newColor;

							setSelectedVar(variable);
							handleCssChange(newColor);
							setInputValue(newColor);
						}}
						defaultValue={defaultSelectValue}
						value={selectedVar ?? ""}
					>
						<SelectTrigger
							className="w-full bg-background pl-9 data-[is-custom]:data-[placeholder]:text-foreground"
							data-is-custom={isCustomColor ? true : undefined}
						>
							<SelectValue
								placeholder={
									isCustomColor
										? inputValue.replace("#", "").toUpperCase()
										: placeholder
								}
								ref={forwardedRef}
								{...props}
							>
								{displayValue && <span>{displayValue}</span>}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Palette</SelectLabel>
								{paletteOptions}
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Extended</SelectLabel>
								{extendedOptions}
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="-translate-y-1/2 absolute top-1/2 left-0 flex size-9 items-center pl-2">
						<div className="relative size-6">
							<input
								disabled={disabled || readOnly}
								title="Select color"
								className="absolute inset-0 size-6 cursor-pointer opacity-0"
								onChange={(event) => {
									const newColor = event.currentTarget.value;

									if (newColor !== currentSelectColorRef.current) {
										setIsCustomColor(true);
										setSelectedVar(undefined);
									}

									handleCssChange(newColor);
									setInputValue(newColor);
								}}
								tabIndex={-1}
								type="color"
								value={inputValue}
							/>
							<div
								className="h-full w-full rounded-md border"
								style={{
									backgroundColor: selectedVar
										? `var(--${selectedVar})`
										: inputValue,
								}}
							/>
						</div>
					</div>
				</div>
				{selectedVar !== defaultSelectValue && (
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => {
							setSelectedVar(defaultSelectValue);
							const selectedVarColor = getVariableColor({
								variable: defaultSelectValue,
								paletteStylesObject,
								theme,
							});
							handleCssChange(selectedVarColor);
							setInputValue(selectedVarColor);
						}}
					>
						<span className="sr-only">Reset</span>
						<RotateCcwIcon />
					</Button>
				)}
			</div>
		);
	},
);

function updateCssVariable({
	stylesheet,
	cssVariable,
	newHexValue,
	newWideGamutValue,
	theme,
	setPaletteMappings,
}: {
	stylesheet: CSSStyleSheet;
	cssVariable: keyof typeof defaultColorMappings;
	newHexValue: string;
	newWideGamutValue: string;
	theme: "light" | "dark";
	setPaletteMappings: ReturnType<typeof useColorContext>["setPaletteMappings"];
}) {
	const selector = theme === "light" ? ":root" : ".dark";

	setPaletteMappings((prev) => {
		if (theme === "dark") {
			return {
				light: prev.light,
				dark: { ...prev.dark, [cssVariable]: newHexValue },
			};
		}
		return {
			light: { ...prev.light, [cssVariable]: newHexValue },
			dark: prev.dark,
		};
	});

	function updateRule(ruleList: CSSRuleList) {
		for (let i = 0; i < ruleList.length; i++) {
			const rule = ruleList[i];

			if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
				rule.style.setProperty(`--${cssVariable}`, newHexValue);
			}

			if (rule instanceof CSSGroupingRule) {
				updateRule(rule.cssRules);
			}
		}
	}

	updateRule(stylesheet.cssRules);

	for (let i = 0; i < stylesheet.cssRules.length; i++) {
		const rule = stylesheet.cssRules[i];
		if (rule instanceof CSSSupportsRule || rule instanceof CSSMediaRule) {
			const groupRule = rule;
			for (let j = 0; j < groupRule.cssRules.length; j++) {
				const inner = groupRule.cssRules[j];
				if (inner instanceof CSSStyleRule && inner.selectorText === selector) {
					inner.style.setProperty(`--${cssVariable}`, newWideGamutValue);
				}
			}
		}
	}
}

function getVariableColor({
	variable,
	paletteStylesObject,
	theme,
}: {
	variable: (typeof themeTokens)[number];
	paletteStylesObject: ReturnType<
		typeof useColorContext
	>["paletteStylesObject"];
	theme: "light" | "dark";
}) {
	const scale = variable.includes("primary") ? "accentScale" : "grayScale";
	const scaleIndex = Number(variable.split("-")[1]) - 1;
	const palette = paletteStylesObject[theme];

	if (variable === "primary-surface") {
		return convertHexToLonghand(stripHexAlpha(palette.accentSurface));
	}
	if (variable === "gray-surface") {
		return convertHexToLonghand(stripHexAlpha(palette.graySurface));
	}
	if (variable === "color-background") {
		return convertHexToLonghand(palette.background);
	}
	if (variable === "apple-red") {
		return "#ff383c";
	}

	const color = palette[scale][scaleIndex];
	if (!color) {
		return DEFAULT_COLOR;
	}

	return convertHexToLonghand(color);
}
