import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1.0,
	maximumScale: 1,
	themeColor: "#22b573",
};

export const metadata: Metadata = {
	robots: "index, follow",
	referrer: "strict-origin-when-cross-origin",
	authors: [{ name: "Zackary Fotheringham", url: "https://zackaryf.com" }],
	description: "Turn Radix-UI color palettes into a shadcn/ui theme",
	manifest: "/manifest.json",
	icons: [
		{ rel: "icon", type: "image/svg+xml", url: "/assets/icons/favicon.svg" },
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
	],
	title: "Radix2Shadcn",
	other: {
		"mobile-web-app-capable": "yes",
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-title": "Radix2Shadcn",
		"apple-mobile-web-app-status-bar-style": "default",
	},
	alternates: {
		canonical: "/",
	},
	twitter: {
		card: "summary_large_image",
		title: "Radix2Shadcn",
		description: "Turn Radix-UI color palettes into a shadcn/ui theme",
		siteId: "722408900213874688",
		creator: "@IAmNotZack",
		images: ["https://Radix2Shadcn.zackaryf.com/assets/icons/twitter-card.png"],
	},
	openGraph: {
		type: "website",
		title: "Radix2Shadcn",
		description: "Turn Radix-UI color palettes into a shadcn/ui theme",
		siteName: "Radix2Shadcn",
		url: "https://Radix2Shadcn.zackaryf.com",
		images: [
			{
				url: "https://Radix2Shadcn.zackaryf.com/assets/icons/twitter-card.png",
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
	},
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
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
