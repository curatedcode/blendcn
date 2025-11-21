import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";
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
			outDir: ".amplify-hosting/static",
			manifest: {
				name: "BlendCN",
				short_name: "BlendCN",
				description:
					"A shadcn/ui theme builder using Radix color steps. Live component previews, customizable palettes, and export-ready design tokens.",
				lang: "en-US",
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
				display: "minimal-ui",
				scope: "/",
				start_url: "/",
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
				screenshots: [
					{
						src: "/assets/meta/pwa-desktop-1.png",
						type: "image/png",
						sizes: "1920x929",
						form_factor: "wide",
					},
					{
						src: "/assets/meta/pwa-desktop-2.png",
						type: "image/png",
						sizes: "1920x929",
						form_factor: "wide",
					},
					{
						src: "/assets/meta/pwa-mobile-1.png",
						type: "image/png",
						sizes: "540x720",
						form_factor: "narrow",
					},
					{
						src: "/assets/meta/pwa-mobile-1.png",
						type: "image/png",
						sizes: "540x720",
						form_factor: "narrow",
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
		nitro(),
		viteReact(),
		process.env.NODE_ENV !== "production" &&
			(visualizer({
				open: true,
				template: "sunburst",
			}) as PluginOption),
	],
	nitro: {
		preset: "aws-amplify",
		externals: {
			inline: ["decimal.js-light"],
		},
		compressPublicAssets: true,
	},
});
