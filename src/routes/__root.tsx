/// <reference types="vite/client" />
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { DefaultErrorComponent } from "~/components/default-error-component";
import { DefaultNotFoundComponent } from "~/components/default-not-found-component";
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
				name: "keywords",
				content:
					"radix, shadcn, theme builder, design tokens, ui system, palette editor, semantic mapping, tailwind, component preview, color system,",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover",
			},
			{
				httpEquiv: "X-UA-Compatible",
				content: "IE=edge",
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
				name: "theme-color",
				content: "#E5E7EB",
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
				property: "og:title",
				content: "BlendCN",
			},
			{
				property: "og:description",
				content:
					"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens.",
			},
			{
				property: "og:url",
				content: "https://blendcn.zackaryf.com",
			},
			{
				property: "og:site_name",
				content: "BlendCN",
			},
			{
				property: "og:locale",
				content: "en_US",
			},
			{
				property: "og:image",
				content: "https://blendcn.zackaryf.com/assets/meta/og-card.png",
			},
			{
				property: "og:image:secure_url",
				content: "https://blendcn.zackaryf.com/assets/meta/og-card.png",
			},
			{
				property: "og:image:width",
				content: "1200",
			},
			{
				property: "og:image:height",
				content: "630",
			},
			{
				property: "og:image:alt",
				content: "BlendCN preview",
			},
			{
				property: "og:updated_time",
				content: new Date().toISOString(),
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:ttl",
				content: "600",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:site",
				content: "@IAmNotZack",
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
			{
				name: "twitter:image:alt",
				content: "BlendCN preview",
			},
			{
				name: "msapplication-starturl",
				content: "/?utm_source=homescreen",
			},
			{
				name: "msapplication-navbutton-color",
				content: "#E5E7EB",
			},
			{
				name: "application-name",
				content: "BlendCN",
			},
			{
				name: "color-scheme",
				content: "light dark",
			},
			{
				name: "format-detection",
				content: "telephone=no",
			},
			{
				name: "msapplication-TileImage",
				content: "/assets/icons/144x144.png",
			},
			{
				name: "msapplication-TileColor",
				content: "#E5E7EB",
			},
			{
				name: "apple-touch-startup-image",
				content: "/assets/icons/512x512.png",
			},
			{
				name: "application-short-name",
				content: "BlendCN",
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
				href: "/manifest.webmanifest",
			},
			{
				rel: "canonical",
				href: "https://blendcn.zackaryf.com/",
			},

			{
				rel: "alternate icon",
				type: "image/x-icon",
				href: "/favicon.ico",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/assets/icons/16x16.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/assets/icons/32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "48x48",
				href: "/assets/icons/48x48.png",
			},
			{
				rel: "icon",
				sizes: "64x64",
				type: "image/png",
				href: "/assets/icons/64x64.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				href: "/assets/icons/192x192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "256x256",
				href: "/assets/icons/256x256.png",
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
			{
				rel: "apple-touch-icon",
				sizes: "60x60",
				href: "/assets/icons/60x60.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "76x76",
				href: "/assets/icons/76x76.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "114x114",
				href: "/assets/icons/114x114.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "120x120",
				href: "/assets/icons/120x120.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "144x144",
				href: "/assets/icons/144x144.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "152x152",
				href: "/assets/icons/152x152.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/assets/icons/180x180.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "512x512",
				href: "/assets/icons/512x512.png",
			},
			{
				rel: "mask-icon",
				href: "/assets/icons/icon-maskable.svg",
				color: "#231f20",
			},
		],
	}),
	shellComponent: RootLayout,
	errorComponent: DefaultErrorComponent,
	notFoundComponent: DefaultNotFoundComponent,
});

function RootLayout() {
	return (
		<html lang="en" suppressHydrationWarning>
			<head prefix="og: https://ogp.me/ns#">
				<HeadContent />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Only way to create this without a warning.
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: "BlendCN",
							url: "https://blendcn.zackaryf.com/",
						}),
					}}
				/>
			</head>
			<body className="font-body">
				<Scripts />
				<ThemeProvider>
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
