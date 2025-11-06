import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		devtools(),
		VitePWA({
			injectRegister: "auto",
			manifest: {
				name: "BlendCN",
				short_name: "BlendCN",
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
				display: "browser",
				scope: "/",
				start_url: "/",
				display_override: ["minimal-ui"],
				icons: [
					{
						src: "/assets/icons/192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/assets/icons/512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/assets/icons/512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/assets/icons/512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
		tanstackStart({
			sitemap: {
				enabled: true,
				host: "https://blendcn.zackaryf.com",
			},
		}),
		viteReact(),
		nitro({ config: { preset: "aws_amplify" } }),
	],
});
