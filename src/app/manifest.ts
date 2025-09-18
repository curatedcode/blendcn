import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Radix2Shadcn",
		short_name: "Radix2Shadcn",
		description:
			"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens.",
		lang: "en_US",
		dir: "ltr",
		categories: [
			"radix",
			"shadcn",
			"theme builder",
			"design tokens",
			"ui system",
			"palette editor",
			"semantic mapping",
			"tailwind",
			"component preview",
			"color system",
		],
		id: "/",
		theme_color: "#E5E7EB",
		background_color: "#F9FAFB",
		display: "standalone",
		scope: "/",
		start_url: "/",
		display_override: ["window-controls-overlay", "standalone"],
		icons: [
			{
				src: "/assets/icons/favicon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/assets/icons/favicon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/assets/icons/favicon-maskable-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/assets/icons/favicon-maskable-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
