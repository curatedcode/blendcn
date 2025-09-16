/** biome-ignore-all lint/a11y/useValidAnchor: Not real links, these are all used for demo purposes */
"use client";

import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

export function NavigationMenuPreview() {
	return (
		<ComponentAccordionGroup title="Navigation Menu">
			<ComponentAccordionSubGroup title="Example">
				<NavigationMenuDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

const components: { title: string; description: string }[] = [
	{
		title: "Alert Dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

function NavigationMenuDemo() {
	return (
		<NavigationMenu viewport={false}>
			<NavigationMenuList className="flex flex-col items-start sm:flex-row sm:items-center">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Home</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
										href="#"
									>
										<div className="mt-4 mb-2 font-medium text-lg">
											shadcn/ui
										</div>
										<p className="text-muted-foreground text-sm leading-tight">
											Beautifully designed components built with Tailwind CSS.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem href="#" title="Introduction">
								Re-usable components built using Radix UI and Tailwind CSS.
							</ListItem>
							<ListItem href="#" title="Installation">
								How to install dependencies and structure your app.
							</ListItem>
							<ListItem href="#" title="Typography">
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[300px] gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href="#"
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<a href="#">Docs</a>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>List</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[300px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<a href="#">
										<div className="font-medium">Components</div>
										<div className="text-muted-foreground">
											Browse all components in the library.
										</div>
									</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="#">
										<div className="font-medium">Documentation</div>
										<div className="text-muted-foreground">
											Learn how to use the library.
										</div>
									</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="#">
										<div className="font-medium">Blog</div>
										<div className="text-muted-foreground">
											Read our latest blog posts.
										</div>
									</a>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Simple</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<a href="#">Components</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="#">Documentation</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="#">Blocks</a>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<a href="#" className="flex-row items-center gap-2">
										<CircleHelpIcon />
										Backlog
									</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="#" className="flex-row items-center gap-2">
										<CircleIcon />
										To Do
									</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="#" className="flex-row items-center gap-2">
										<CircleCheckIcon />
										Done
									</a>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="font-medium text-sm leading-none">{title}</div>
					<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
