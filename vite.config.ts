import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		devtools(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
				failOnError: true,
			},
			sitemap: {
				enabled: true,
				host: "https://blendcn.zackaryf.com",
			},
		}),
		nitro({ config: { preset: "aws_amplify" } }),
		viteReact(),
	],
});
