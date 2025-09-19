"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { useSessionStorage } from "~/hooks/use-session-storage";
import { generateColors } from "~/lib/colors/generate-colors";
import { generatePaletteMappings } from "~/lib/colors/generate-palette-mappings";

type ColorContextType = {
	result: ReturnType<typeof generateColors>;
	accentValue: string;
	grayValue: string;
	bgValue: string;
	setAccentValue: React.Dispatch<React.SetStateAction<string>>;
	setGrayValue: React.Dispatch<React.SetStateAction<string>>;
	setBgValue: React.Dispatch<React.SetStateAction<string>>;
	paletteStyles: string;
	paletteStylesObject: { light: GeneratedColors; dark: GeneratedColors };
	getColorCss: typeof getColorCss;
	paletteStylesElementRef: React.RefObject<HTMLStyleElement | null>;
	paletteMappings: ReturnType<typeof generatePaletteMappings>;
	/** Needs to be a color value, hex/hsl/oklch etc. */
	setPaletteMappings: React.Dispatch<
		React.SetStateAction<ReturnType<typeof generatePaletteMappings>>
	>;
};

const ColorContext = React.createContext<ColorContextType | null>(null);

export function useColorContext() {
	const context = React.useContext(ColorContext);

	if (!context) {
		throw new Error("Component must be wrapped in <ColorContextProvider />");
	}

	return context;
}

interface ColorContextProviderProps {
	children: React.ReactNode;
}

export function ColorContextProvider({ children }: ColorContextProviderProps) {
	const { resolvedTheme } = useTheme();

	const getEffectiveTheme = React.useCallback(() => {
		if (typeof window === "undefined") return "light";

		if (resolvedTheme === "light" || resolvedTheme === "dark")
			return resolvedTheme;

		if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}

		return "light";
	}, [resolvedTheme]);

	const effectiveTheme = getEffectiveTheme();

	// Session storage hooks with initial palette fallbacks
	const [lightAccentValue, setLightAccentValue] = useSessionStorage(
		"colors/light/accent",
		"#1B115B",
		{ initializeWithValue: false },
	);
	const [lightGrayValue, setLightGrayValue] = useSessionStorage(
		"colors/light/gray",
		"#8B8D98",
		{ initializeWithValue: false },
	);
	const [lightBgValue, setLightBgValue] = useSessionStorage(
		"colors/light/background",
		"#FFFFFF",
		{ initializeWithValue: false },
	);

	const [darkAccentValue, setDarkAccentValue] = useSessionStorage(
		"colors/dark/accent",
		"#1B115B",
		{ initializeWithValue: false },
	);
	const [darkGrayValue, setDarkGrayValue] = useSessionStorage(
		"colors/dark/gray",
		"#8B8D98",
		{ initializeWithValue: false },
	);
	const [darkBgValue, setDarkBgValue] = useSessionStorage(
		"colors/dark/background",
		"#111111",
		{ initializeWithValue: false },
	);

	const lightModeResult = React.useMemo(
		() =>
			generateColors({
				appearance: "light",
				accent: lightAccentValue,
				gray: lightGrayValue,
				background: lightBgValue,
			}),
		[lightAccentValue, lightGrayValue, lightBgValue],
	);

	const darkModeResult = React.useMemo(
		() =>
			generateColors({
				appearance: "dark",
				accent: darkAccentValue,
				gray: darkGrayValue,
				background: darkBgValue,
			}),
		[darkAccentValue, darkGrayValue, darkBgValue],
	);

	const [paletteMappings, setPaletteMappings] = React.useState(
		generatePaletteMappings({ light: lightModeResult, dark: darkModeResult }),
	);

	const result = effectiveTheme === "dark" ? darkModeResult : lightModeResult;

	const accentValue =
		effectiveTheme === "dark" ? darkAccentValue : lightAccentValue;
	const grayValue = effectiveTheme === "dark" ? darkGrayValue : lightGrayValue;
	const bgValue = effectiveTheme === "dark" ? darkBgValue : lightBgValue;

	const setAccentValue =
		effectiveTheme === "dark" ? setDarkAccentValue : setLightAccentValue;
	const setGrayValue =
		effectiveTheme === "dark" ? setDarkGrayValue : setLightGrayValue;
	const setBgValue =
		effectiveTheme === "dark" ? setDarkBgValue : setLightBgValue;

	const { stylesheet, styleObject } = React.useMemo(
		() =>
			getNewPreviewStyles({
				lightColors: lightModeResult,
				darkColors: darkModeResult,
			}),
		[darkModeResult, lightModeResult],
	);

	const paletteStylesElementRef = React.useRef<HTMLStyleElement>(null);

	const memoValues = React.useMemo(
		() => ({
			result,
			accentValue,
			grayValue,
			bgValue,
			setAccentValue,
			setGrayValue,
			setBgValue,
			paletteStyles: stylesheet,
			paletteStylesObject: styleObject,
			getColorCss,
			paletteStylesElementRef,
			paletteMappings,
			setPaletteMappings,
		}),
		[
			result,
			accentValue,
			grayValue,
			bgValue,
			setAccentValue,
			setGrayValue,
			setBgValue,
			stylesheet,
			styleObject,
			paletteMappings,
		],
	);

	React.useEffect(() => {
		setPaletteMappings(
			generatePaletteMappings({ light: lightModeResult, dark: darkModeResult }),
		);
	}, [lightModeResult, darkModeResult]);

	return (
		<ColorContext.Provider value={memoValues}>
			<style
				id="palette-styles"
				ref={paletteStylesElementRef}
				suppressHydrationWarning
			>
				{stylesheet}
			</style>
			{children}
		</ColorContext.Provider>
	);
}

interface GetNewPreviewStylesParams {
	lightColors: GeneratedColors;
	darkColors: GeneratedColors;
}

const getNewPreviewStyles = ({
	lightColors,
	darkColors,
}: GetNewPreviewStylesParams) => {
	const lightColorsCss = getColorCss({
		isDarkMode: false,
		accent: {
			contrast: lightColors.accentContrast,
			scale: lightColors.accentScale,
			scaleWideGamut: lightColors.accentScaleWideGamut,
			surface: lightColors.accentSurface,
			surfaceWideGamut: lightColors.accentSurfaceWideGamut,
		},
		background: lightColors.background,
		gray: {
			contrast: "#fff",
			scale: lightColors.grayScale,
			scaleWideGamut: lightColors.grayScaleWideGamut,
			surface: lightColors.graySurface,
			surfaceWideGamut: lightColors.graySurfaceWideGamut,
		},
	});

	const darkColorsCss = getColorCss({
		isDarkMode: true,
		accent: {
			contrast: darkColors.accentContrast,
			scale: darkColors.accentScale,
			scaleWideGamut: darkColors.accentScaleWideGamut,
			surface: darkColors.accentSurface,
			surfaceWideGamut: darkColors.accentSurfaceWideGamut,
		},
		background: darkColors.background,
		gray: {
			contrast: "#fff",
			scale: darkColors.grayScale,
			scaleWideGamut: darkColors.grayScaleWideGamut,
			surface: darkColors.graySurface,
			surfaceWideGamut: darkColors.graySurfaceWideGamut,
		},
	});

	return {
		stylesheet: `
:root {
  --primary-1: ${lightColors.accentScale[0]};
  --primary-2: ${lightColors.accentScale[1]};
  --primary-3: ${lightColors.accentScale[2]};
  --primary-4: ${lightColors.accentScale[3]};
  --primary-5: ${lightColors.accentScale[4]};
  --primary-6: ${lightColors.accentScale[5]};
  --primary-7: ${lightColors.accentScale[6]};
  --primary-8: ${lightColors.accentScale[7]};
  --primary-9: ${lightColors.accentScale[8]};
  --primary-10: ${lightColors.accentScale[9]};
  --primary-11: ${lightColors.accentScale[10]};
  --primary-12: ${lightColors.accentScale[11]};
	--primary-surface: ${lightColors.accentSurface};

  --gray-1: ${lightColors.grayScale[0]};
  --gray-2: ${lightColors.grayScale[1]};
  --gray-3: ${lightColors.grayScale[2]};
  --gray-4: ${lightColors.grayScale[3]};
  --gray-5: ${lightColors.grayScale[4]};
  --gray-6: ${lightColors.grayScale[5]};
  --gray-7: ${lightColors.grayScale[6]};
  --gray-8: ${lightColors.grayScale[7]};
  --gray-9: ${lightColors.grayScale[8]};
  --gray-10: ${lightColors.grayScale[9]};
  --gray-11: ${lightColors.grayScale[10]};
  --gray-12: ${lightColors.grayScale[11]};
	--gray-surface: ${lightColors.graySurface};

	--apple-red: #ff383c;
}

.dark {
  --primary-1: ${darkColors.accentScale[0]};
  --primary-2: ${darkColors.accentScale[1]};
  --primary-3: ${darkColors.accentScale[2]};
  --primary-4: ${darkColors.accentScale[3]};
  --primary-5: ${darkColors.accentScale[4]};
  --primary-6: ${darkColors.accentScale[5]};
  --primary-7: ${darkColors.accentScale[6]};
  --primary-8: ${darkColors.accentScale[7]};
  --primary-9: ${darkColors.accentScale[8]};
  --primary-10: ${darkColors.accentScale[9]};
  --primary-11: ${darkColors.accentScale[10]};
  --primary-12: ${darkColors.accentScale[11]};
	--primary-surface: ${darkColors.accentSurface};

  --gray-1: ${darkColors.grayScale[0]};
  --gray-2: ${darkColors.grayScale[1]};
  --gray-3: ${darkColors.grayScale[2]};
  --gray-4: ${darkColors.grayScale[3]};
  --gray-5: ${darkColors.grayScale[4]};
  --gray-6: ${darkColors.grayScale[5]};
  --gray-7: ${darkColors.grayScale[6]};
  --gray-8: ${darkColors.grayScale[7]};
  --gray-9: ${darkColors.grayScale[8]};
  --gray-10: ${darkColors.grayScale[9]};
  --gray-11: ${darkColors.grayScale[10]};
  --gray-12: ${darkColors.grayScale[11]};
	--gray-surface: ${darkColors.graySurface};
}

${lightColorsCss}
${darkColorsCss}
  `.trim(),
		styleObject: {
			light: lightColors,
			dark: darkColors,
		},
	};
};

export type GeneratedColors = ReturnType<typeof generateColors>;

interface GetColorCssParams {
	isDarkMode: boolean;
	gray: {
		scale: GeneratedColors["accentScale"];
		scaleWideGamut: GeneratedColors["accentScaleWideGamut"];
		contrast: GeneratedColors["accentContrast"];
		surface: GeneratedColors["accentSurface"];
		surfaceWideGamut: GeneratedColors["accentSurfaceWideGamut"];
	};
	accent: {
		scale: GeneratedColors["accentScale"];
		scaleWideGamut: GeneratedColors["accentScaleWideGamut"];
		contrast: GeneratedColors["accentContrast"];
		surface: GeneratedColors["accentSurface"];
		surfaceWideGamut: GeneratedColors["accentSurfaceWideGamut"];
	};
	background: string;
}

function getColorCss({
	isDarkMode,
	accent,
	background,
	gray,
}: GetColorCssParams) {
	const selector = isDarkMode ? ".dark" : ":root";

	return `
${selector} {
  --background: ${background};

  --foreground: ${gray.scale[11]};

  --card: ${gray.surface};
  --card-foreground: ${gray.scale[11]};

  --popover: ${gray.scale[2]};
  --popover-foreground: ${gray.scale[11]};

  --primary: ${accent.scale[8]};
  --primary-foreground: ${accent.contrast};
  
  --secondary: ${gray.scale[3]};
  --secondary-foreground: ${gray.scale[11]};

  --muted: ${gray.scale[1]};
  --muted-foreground: ${gray.scale[10]};

  --accent: ${accent.scale[4]};
  --accent-foreground: ${gray.scale[11]};

  --destructive: var(--apple-red);

  --border: ${gray.scale[5]};
  --input: ${gray.scale[2]};
  --ring: ${accent.scale[7]};

  --chart-1: ${accent.scale[8]};
  --chart-2: ${accent.scale[4]};
  --chart-3: ${gray.scale[3]};
  --chart-4: ${accent.scale[9]};
  --chart-5: ${gray.scale[6]};

  --sidebar: ${gray.scale[1]};
  --sidebar-foreground: ${gray.scale[10]};

  --sidebar-primary: ${accent.scale[9]};
  --sidebar-primary-foreground: ${gray.scale[11]};

  --sidebar-accent: ${accent.scale[4]};
  --sidebar-accent-foreground: ${gray.scale[11]};

  --sidebar-border: ${gray.scale[6]};
  --sidebar-ring: ${accent.scale[7]};

	--primary-surface: ${accent.surface};
	--gray-surface: ${gray.surface};

	--scrollbar-thumb: ${gray.scale[5]};
	--scrollbar-thumb-hover: ${gray.scale[6]};
	--scrollbar-thumb-active: ${gray.scale[7]};
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    ${selector} {
      --foreground: ${gray.scaleWideGamut[11]};

      --card: ${gray.surfaceWideGamut};
      --card-foreground: ${gray.scaleWideGamut[11]};

      --popover: ${gray.scaleWideGamut[2]};
      --popover-foreground: ${gray.scaleWideGamut[11]};

      --primary: ${accent.scaleWideGamut[8]};
      --primary-foreground: ${accent.contrast};
      
      --secondary: ${gray.scaleWideGamut[3]};
      --secondary-foreground: ${gray.scaleWideGamut[11]};

      --muted: ${gray.scaleWideGamut[1]};
      --muted-foreground: ${gray.scaleWideGamut[10]};

      --accent: ${accent.scaleWideGamut[4]};
      --accent-foreground: ${gray.scaleWideGamut[11]};

      --destructive: var(--apple-red);

      --border: ${gray.scaleWideGamut[5]};
      --input: ${gray.scaleWideGamut[2]};
      --ring: ${accent.scaleWideGamut[7]};

      --chart-1: ${accent.scaleWideGamut[8]};
      --chart-2: ${accent.scaleWideGamut[4]};
      --chart-3: ${gray.scaleWideGamut[3]};
      --chart-4: ${accent.scaleWideGamut[9]};
      --chart-5: ${gray.scaleWideGamut[6]};

      --sidebar: ${gray.scaleWideGamut[1]};
      --sidebar-foreground: ${gray.scaleWideGamut[10]};

      --sidebar-primary: ${accent.scaleWideGamut[9]};
      --sidebar-primary-foreground: ${gray.scaleWideGamut[11]};

      --sidebar-accent: ${accent.scaleWideGamut[4]};
      --sidebar-accent-foreground: ${gray.scaleWideGamut[11]};

      --sidebar-border: ${gray.scaleWideGamut[6]};
      --sidebar-ring: ${accent.scaleWideGamut[7]};

			--primary-surface: ${accent.surfaceWideGamut};
			--gray-surface: ${gray.surfaceWideGamut};

			--scrollbar-thumb: ${gray.scaleWideGamut[5]};
			--scrollbar-thumb-hover: ${gray.scaleWideGamut[6]};
			--scrollbar-thumb-active: ${gray.scaleWideGamut[7]};
    }
  }
}
  `.trim();
}
