"use client";

import Color from "colorjs.io";
import { useTheme } from "next-themes";
import * as React from "react";
import { useLayoutEffect } from "~/hooks/use-layout-effect";
import { useLocalStorage } from "~/hooks/use-local-storage";
import { generateRadixColors } from "~/lib/radix-colors/generate-radix-colors";

type ColorContextType = {
  result: ReturnType<typeof generateRadixColors>;
  accentValue: string;
  grayValue: string;
  bgValue: string;
  setAccentValue: React.Dispatch<React.SetStateAction<string>>;
  setGrayValue: React.Dispatch<React.SetStateAction<string>>;
  setBgValue: React.Dispatch<React.SetStateAction<string>>;
  paletteStyles: ReturnType<typeof getNewPreviewStyles>;
  getColorCss: typeof getColorCss;
};

const ColorContext = React.createContext<ColorContextType | null>(null);

export function useColorContext() {
  const context = React.useContext(ColorContext);

  if (!context) {
    throw new Error("Component must be wrapped in <ColorContextProvider />");
  }

  return context;
}

export function ColorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  const [lightAccentValue, setLightAccentValue] = useLocalStorage(
    "colors/light/accent",
    "#3D63DD",
  );
  const [lightGrayValue, setLightGrayValue] = useLocalStorage(
    "colors/light/gray",
    "#8B8D98",
  );
  const [lightBgValue, setLightBgValue] = useLocalStorage(
    "colors/light/background",
    "#FFFFFF",
  );

  const [darkAccentValue, setDarkAccentValue] = useLocalStorage(
    "colors/dark/accent",
    "#3D63DD",
  );
  const [darkGrayValue, setDarkGrayValue] = useLocalStorage(
    "colors/dark/gray",
    "#8B8D98",
  );
  const [darkBgValue, setDarkBgValue] = useLocalStorage(
    "colors/dark/background",
    "#111111",
  );

  const lightModeResult = generateRadixColors({
    appearance: "light",
    accent: lightAccentValue,
    gray: lightGrayValue,
    background: lightBgValue,
  });

  const darkModeResult = generateRadixColors({
    appearance: "dark",
    accent: darkAccentValue,
    gray: darkGrayValue,
    background: darkBgValue,
  });
  console.log({ darkModeResult });

  const result = resolvedTheme === "dark" ? darkModeResult : lightModeResult;

  const [timestamp, setTimestamp] = useLocalStorage(
    "colors/timestamp",
    Date.now(),
  );
  const [discardStoredValues] = React.useState(
    Date.now() - timestamp > 1000 * 60 * 2,
  );

  const accentValue =
    resolvedTheme === "dark" ? darkAccentValue : lightAccentValue;
  const grayValue = resolvedTheme === "dark" ? darkGrayValue : lightGrayValue;
  const bgValue = resolvedTheme === "dark" ? darkBgValue : lightBgValue;

  const setAccentValue =
    resolvedTheme === "dark" ? setDarkAccentValue : setLightAccentValue;
  const setGrayValue =
    resolvedTheme === "dark" ? setDarkGrayValue : setLightGrayValue;
  const setBgValue =
    resolvedTheme === "dark" ? setDarkBgValue : setLightBgValue;

  const paletteStyles = getNewPreviewStyles({
    darkColors: darkModeResult,
    lightColors: lightModeResult,
  });

  React.useEffect(() => {
    console.log({ paletteStyles });
  }, [paletteStyles]);

  const memoValues = React.useMemo(
    () => ({
      result,
      accentValue,
      grayValue,
      bgValue,
      setAccentValue,
      setGrayValue,
      setBgValue,
      paletteStyles,
      getColorCss,
    }),
    [
      result,
      accentValue,
      grayValue,
      bgValue,
      setAccentValue,
      setGrayValue,
      setBgValue,
      paletteStyles,
    ],
  );

  useLayoutEffect(() => {
    if (discardStoredValues) {
      setLightAccentValue("#3D63DD");
      setLightGrayValue("#8B8D98");
      setLightBgValue("#FFFFFF");
      setDarkAccentValue("#3D63DD");
      setDarkGrayValue("#8B8D98");
      setDarkBgValue("#111111");
    }
    // Refresh the timestamp
    setTimestamp(Date.now());
  }, [discardStoredValues]);

  return (
    <ColorContext.Provider value={memoValues}>
      <style>{paletteStyles}</style>
      {children}
    </ColorContext.Provider>
  );
}

interface GetNewPreviewStylesParams {
  selector?: string;
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

  return `
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
}

${lightColorsCss}
${darkColorsCss}
  `.trim();
};

type GeneratedColors = ReturnType<typeof generateRadixColors>;

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

function _stripAlpha(color: string, format: "hex" | "oklch") {
  const newColor = new Color(color);
  newColor.alpha = 1;
  return newColor.toString({ format });
}

function getColorCss({
  isDarkMode,
  accent,
  background,
  gray,
}: GetColorCssParams) {
  const selector = isDarkMode ? ".dark" : ":root";

  // need to remove the alpha from surface (shadcn uses this for dropdowns and it ruins the look)
  // const accentSurface = stripAlpha(accent.surface, "hex");
  // const accentSurfaceWideGamut = stripAlpha(accent.surface, "oklch");
  // const graySurface = stripAlpha(gray.surface, "hex");
  // const graySurfaceWideGamut = stripAlpha(gray.surface, "oklch");
  // console.log({ scale: gray.scale, isDarkMode });

  const appleRed = {
    light: {
      hex: "#ff383c",
      oklch: "oklch(65.32% 0.233 25.74)",
    },
    dark: {
      hex: "#ff4245",
      oklch: "oklch(66.20% 0.225 25.12)",
    },
  };

  return `
${selector} {
  ${isDarkMode ? "" : "--radius: 0.625rem; \n"}
  --background: ${background};

  --foreground: ${gray.scale[11]};

  --card: ${gray.surface};
  --card-foreground: ${gray.scale[11]};

  --popover: ${gray.scale[2]};
  --popover-foreground: ${gray.scale[11]};

  --primary: ${accent.scale[8]};
  --primary-foreground: ${gray.scale[0]};
  
  --secondary: ${gray.scale[3]};
  --secondary-foreground: ${gray.scale[11]};

  --muted: ${gray.scale[1]};
  --muted-foreground: ${gray.scale[10]};

  --accent: ${accent.scale[4]};
  --accent-foreground: ${gray.scale[11]};

  --destructive: ${appleRed.light.hex};

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
      --primary-foreground: ${gray.scaleWideGamut[0]};
      
      --secondary: ${gray.scaleWideGamut[3]};
      --secondary-foreground: ${gray.scaleWideGamut[11]};

      --muted: ${gray.scaleWideGamut[1]};
      --muted-foreground: ${gray.scaleWideGamut[10]};

      --accent: ${accent.scaleWideGamut[4]};
      --accent-foreground: ${gray.scaleWideGamut[11]};

      --destructive: ${appleRed.light.oklch};

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
    }
  }
}
  `.trim();
}
