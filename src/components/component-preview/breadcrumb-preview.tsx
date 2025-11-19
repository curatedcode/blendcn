/** biome-ignore-all lint/a11y/useValidAnchor: Demo links, they shouldn't navigate the user */
import { ChevronDownIcon, SlashIcon } from "lucide-react";
import * as React from "react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
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
import { useMediaQuery } from "~/hooks/use-media-query";

export function BreadcrumbPreview() {
	return (
		<ComponentGroup title="Breadcrumb" id="breadcrumb-component">
			<ComponentGroupPreview>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<a href="#">Home</a>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1">
									<BreadcrumbEllipsis className="size-4" />
									<span className="sr-only">Toggle menu</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									<DropdownMenuItem>Documentation</DropdownMenuItem>
									<DropdownMenuItem>Themes</DropdownMenuItem>
									<DropdownMenuItem>GitHub</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
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
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Custom Separator">
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
				</ComponentGroupExample>
				<ComponentGroupExample title="Dropdown">
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
				</ComponentGroupExample>
				<ComponentGroupExample title="Collapsed">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<a href="#">Home</a>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbEllipsis />
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
				</ComponentGroupExample>
				<ComponentGroupExample title="Responsive">
					<BreadcrumbResponsive />
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
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
	const isDesktop = useMediaQuery("(min-width: 768px)");

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
							{isDesktop ? (
								<DropdownMenu open={open} onOpenChange={setOpen}>
									<DropdownMenuTrigger
										className="flex items-center gap-1"
										aria-label="Toggle menu"
									>
										<BreadcrumbEllipsis className="size-4" />
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										{items.slice(1, -2).map((item, index) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: order doesn't change
											<DropdownMenuItem key={index}>
												<a href="#">{item.label}</a>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
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
											{items.slice(1, -2).map((item, index) => (
												<a
													// biome-ignore lint/suspicious/noArrayIndexKey: order doesn't change
													key={index}
													href="#"
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
							)}
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				) : null}
				{items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: order never changes
					<BreadcrumbItem key={index}>
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
