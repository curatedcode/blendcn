/** biome-ignore-all lint/a11y/useValidAnchor: Demo links, they shouldn't navigate the user */
"use client";

import { ChevronDownIcon, SlashIcon } from "lucide-react";
import * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useIsMobile } from "~/hooks/use-mobile";

export function BreadcrumbPreview() {
	return (
		<ComponentAccordionGroup title="Breadcrumb">
			<ComponentAccordionSubGroup title="Custom Separator">
				<BreadcrumbWithCustomSeparator />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Dropdown">
				<BreadcrumbWithDropdown />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Collapsed">
				<BreadcrumbCollapsed />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Responsive">
				<BreadcrumbResponsive />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

/**
 * @todo add a note that says you need to update <BreadcrumbSeparator /> to a div instead of li otherwise you get a Hydration error saying li can't be a child of li
 * https://github.com/shadcn-ui/ui/issues/3818
 */

function BreadcrumbWithCustomSeparator() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<a href="#">Home</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<a href="#">Components</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

function BreadcrumbWithDropdown() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<a href="#">Home</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0">
							Components
							<ChevronDownIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuItem>Documentation</DropdownMenuItem>
							<DropdownMenuItem>Themes</DropdownMenuItem>
							<DropdownMenuItem>GitHub</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

function BreadcrumbCollapsed() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<a href="#">Home</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbEllipsis className="h-5 w-9" />
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<a href="#">Components</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

const items = [
	{ href: "#", label: "Home" },
	{ href: "#", label: "Documentation" },
	{ href: "#", label: "Building Your Application" },
	{ href: "#", label: "Data Fetching" },
	{ label: "Caching and Revalidating" },
];

const ITEMS_TO_DISPLAY = 3;

function BreadcrumbResponsive() {
	const [open, setOpen] = React.useState(false);
	const isMobile = useIsMobile();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<a href="#">{items[0]?.label}</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{items.length > ITEMS_TO_DISPLAY ? (
					<>
						<BreadcrumbItem>
							{isMobile ? (
								<Drawer open={open} onOpenChange={setOpen}>
									<DrawerTrigger aria-label="Toggle Menu">
										<BreadcrumbEllipsis className="h-4 w-4" />
									</DrawerTrigger>
									<DrawerContent>
										<DrawerHeader className="text-left">
											<DrawerTitle>Navigate to</DrawerTitle>
											<DrawerDescription>
												Select a page to navigate to.
											</DrawerDescription>
										</DrawerHeader>
										<div className="grid gap-1 px-4">
											{items.slice(1, -2).map((item) => (
												<a
													key={item.label}
													href={item.href ?? "#"}
													className="py-1 text-sm"
												>
													{item.label}
												</a>
											))}
										</div>
										<DrawerFooter className="pt-4">
											<DrawerClose asChild>
												<Button variant="outline">Close</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
							) : (
								<DropdownMenu open={open} onOpenChange={setOpen}>
									<DropdownMenuTrigger
										className="flex items-center gap-1"
										aria-label="Toggle menu"
									>
										<BreadcrumbEllipsis className="size-4" />
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										{items.slice(1, -2).map((item) => (
											<DropdownMenuItem key={item.label}>
												<a href={item.href ?? "#"}>{item.label}</a>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				) : null}
				{items.slice(-ITEMS_TO_DISPLAY + 1).map((item) => (
					<BreadcrumbItem key={item.label}>
						{item.href ? (
							<>
								<BreadcrumbLink
									asChild
									className="max-w-20 truncate md:max-w-none"
								>
									<a href={item.href}>{item.label}</a>
								</BreadcrumbLink>
								<BreadcrumbSeparator />
							</>
						) : (
							<BreadcrumbPage className="max-w-20 truncate md:max-w-none">
								{item.label}
							</BreadcrumbPage>
						)}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
