import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		dir: "./tests/unit",
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src"),
		},
	},
});
