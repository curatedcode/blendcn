import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1.0,
};

export const metadata: Metadata = {
	robots: "index, follow",
	referrer: "strict-origin-when-cross-origin",
	authors: [{ name: "Zackary Fotheringham", url: "https://zackaryf.com" }],
	description:
		"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens",
	manifest: "/manifest.json",
	icons: [
		{ rel: "icon", type: "image/svg+xml", url: "/assets/icons/favicon.svg" },
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
	title: "BlendCN",
	other: {
		"mobile-web-app-capable": "yes",
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-title": "BlendCN",
		"apple-mobile-web-app-status-bar-style": "default",
	},
	alternates: {
		canonical: "/",
	},
	twitter: {
		card: "summary_large_image",
		title: "BlendCN",
		description:
			"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens.",
		siteId: "722408900213874688",
		creator: "@IAmNotZack",
		images: ["https://blendcn.zackaryf.com/assets/icons/twitter-card.png"],
	},
	openGraph: {
		type: "website",
		title: "BlendCN",
		description:
			"A semantic theme builder that maps Radix color steps to shadcn/ui tokens with live component previews, customizable palettes, and export-ready design tokens.",
		siteName: "BlendCN",
		url: "https://blendcn.zackaryf.com",
		images: [
			{
				url: "https://blendcn.zackaryf.com/assets/icons/twitter-card.png",
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-body">
				<ThemeProvider
					enableSystem
					attribute={"class"}
					disableTransitionOnChange
				>
					{children}
					<Toaster position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
