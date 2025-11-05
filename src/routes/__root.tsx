/// <reference types="vite/client" />
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { NotFoundGeneric } from "~/components/not-found-generic";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import appCss from "~/styles/globals.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "BlendCN",
			},
			{
				name: "description",
				content:
					"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens",
			},
			{
				name: "author",
				content: "Zackary Fotheringham",
			},
			{
				name: "referrer",
				content: "strict-origin-when-cross-origin",
			},
			{
				name: "robots",
				content: "index, follow",
			},
			{
				name: "mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "BlendCN",
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default",
			},
			{
				name: "og:title",
				content: "BlendCN",
			},
			{
				name: "og:description",
				content:
					"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens.",
			},
			{
				name: "og:url",
				content: "https://blendcn.zackaryf.com",
			},
			{
				name: "og:site_name",
				content: "BlendCN",
			},
			{
				name: "og:locale",
				content: "en_US",
			},
			{
				name: "og:image",
				content: "https://blendcn.zackaryf.com/assets/icons/twitter-card.png",
			},
			{
				name: "og:image:width",
				content: "1200",
			},
			{
				name: "og:image:height",
				content: "630",
			},
			{
				name: "og:type",
				content: "website",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:site:id",
				content: "722408900213874688",
			},
			{
				name: "twitter:creator",
				content: "@IAmNotZack",
			},
			{
				name: "twitter:title",
				content: "BlendCN",
			},
			{
				name: "twitter:description",
				content:
					"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens.",
			},
			{
				name: "twitter:image",
				content: "https://blendcn.zackaryf.com/assets/icons/twitter-card.png",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "author",
				href: "https://zackaryf.com",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
			{
				rel: "canonical",
				href: "/",
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				url: "/assets/icons/favicon.svg",
			},
			{
				rel: "icon",
				sizes: "32x32",
				type: "image/png",
				url: "/assets/icons/favicon-32x32.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "120x120",
				url: "/assets/icons/apple-touch-icon-120x120.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "152x152",
				url: "/assets/icons/apple-touch-icon-152x152.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				url: "/assets/icons/apple-touch-icon-180x180.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "512x512",
				url: "/assets/icons/apple-touch-icon-512x512.png",
			},
		],
	}),
	shellComponent: RootLayout,
	notFoundComponent: NotFoundGeneric,
});

function RootLayout() {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="font-body">
				<ThemeProvider
					enableSystem
					attribute={"class"}
					disableTransitionOnChange
				>
					<main>
						<Outlet />
						<Toaster position="top-center" />
					</main>
				</ThemeProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
