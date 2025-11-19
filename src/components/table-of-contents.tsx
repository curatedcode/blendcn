import * as React from "react";

const tocItems: { title: string; href: string; depth: number }[] = [
	{ title: "Checkbox", href: "#checkbox-component", depth: 1 },
	{ title: "Combobox", href: "#combobox-component", depth: 1 },
	{ title: "Date Picker", href: "#date-picker-component", depth: 1 },
	{ title: "Field", href: "#field-component", depth: 1 },
	{ title: "Input", href: "#input-component", depth: 1 },
	{ title: "Input Group", href: "#input-group-component", depth: 1 },
	{ title: "Input OTP", href: "#input-otp-component", depth: 1 },
	{ title: "Label", href: "#label-component", depth: 1 },
	{ title: "Native Select", href: "#native-select-component", depth: 1 },
	{ title: "Radio Group", href: "#radio-group-component", depth: 1 },
	{ title: "Select", href: "#select-component", depth: 1 },
	{ title: "Slider", href: "#slider-component", depth: 1 },
	{ title: "Switch", href: "#switch-component", depth: 1 },
	{ title: "Textarea", href: "#textarea-component", depth: 1 },
	{ title: "Button", href: "#button-component", depth: 1 },
	{ title: "Button Group", href: "#button-group-component", depth: 1 },
	{ title: "Toggle", href: "#toggle-component", depth: 1 },
	{ title: "Toggle Group", href: "#toggle-group-component", depth: 1 },
	{ title: "Alert", href: "#alert-component", depth: 1 },
	{ title: "Alert Dialog", href: "#alert-dialog-component", depth: 1 },
	{ title: "Progress", href: "#progress-component", depth: 1 },
	{ title: "Skeleton", href: "#skeleton-component", depth: 1 },
	{ title: "Sonner", href: "#sonner-component", depth: 1 },
	{ title: "Spinner", href: "#spinner-component", depth: 1 },
	{ title: "Accordion", href: "#accordion-component", depth: 1 },
	{ title: "Aspect Ratio", href: "#aspect-ratio-component", depth: 1 },
	{ title: "Card", href: "#card-component", depth: 1 },
	{ title: "Collapsible", href: "#collapsible-component", depth: 1 },
	{ title: "Drawer", href: "#drawer-component", depth: 1 },
	{ title: "Resizable", href: "#resizable-component", depth: 1 },
	{ title: "Scroll Area", href: "#scroll-area-component", depth: 1 },
	{ title: "Separator", href: "#separator-component", depth: 1 },
	{ title: "Sheet", href: "#sheet-component", depth: 1 },
	{ title: "Sidebar", href: "#sidebar-component", depth: 1 },
	{ title: "Breadcrumb", href: "#breadcrumb-component", depth: 1 },
	{ title: "Command", href: "#command-component", depth: 1 },
	{ title: "Context Menu", href: "#context-menu-component", depth: 1 },
	{ title: "Dropdown Menu", href: "#dropdown-menu-component", depth: 1 },
	{ title: "Menubar", href: "#menubar-component", depth: 1 },
	{ title: "Navigation Menu", href: "#navigation-menu-component", depth: 1 },
	{ title: "Pagination", href: "#pagination-component", depth: 1 },
	{ title: "Tabs", href: "#tabs-component", depth: 1 },
	{ title: "Avatar", href: "#avatar-component", depth: 1 },
	{ title: "Badge", href: "#badge-component", depth: 1 },
	{ title: "Calendar", href: "#calendar-component", depth: 1 },
	{ title: "Carousel", href: "#carousel-component", depth: 1 },
	{ title: "Chart", href: "#chart-component", depth: 1 },
	{ title: "Data Table", href: "#data-table-component", depth: 1 },
	{ title: "Empty", href: "#empty-component", depth: 1 },
	{ title: "Item", href: "#item-component", depth: 1 },
	{ title: "Kbd", href: "#kbd-component", depth: 1 },
	{ title: "Table", href: "#table-component", depth: 1 },
	{ title: "Dialog", href: "#dialog-component", depth: 1 },
	{ title: "Hover Card", href: "#hover-card-component", depth: 1 },
	{ title: "Popover", href: "#popover-component", depth: 1 },
	{ title: "Tooltip", href: "#tooltip-component", depth: 1 },
];

function useIntersectionObserver(items: typeof tocItems) {
	const [visibleHrefs, setVisibleHrefs] = React.useState<string[]>([]);
	const observer = React.useRef<IntersectionObserver | null>(null);

	React.useEffect(() => {
		const headings = items
			.map((item) => document.querySelector(item.href))
			.filter(Boolean) as HTMLElement[];

		observer.current = new IntersectionObserver(
			(entries) => {
				setVisibleHrefs((prev) => {
					const next = new Set(prev);
					for (const entry of entries) {
						const href = `#${entry.target.id}`;
						if (entry.isIntersecting) {
							next.add(href);
						} else {
							next.delete(href);
						}
					}
					return Array.from(next);
				});
			},
			{
				rootMargin: "0px 0px 0px 0px",
				threshold: 0,
			},
		);

		for (const el of headings) {
			observer.current?.observe(el);
		}

		return () => observer.current?.disconnect();
	}, [items]);

	return React.useMemo(() => visibleHrefs, [visibleHrefs]);
}

const isElementInView = (
	element: HTMLElement,
	parent: HTMLElement,
): boolean => {
	const parentTop = parent.scrollTop;
	const parentBottom = parentTop + parent.clientHeight;

	const elementTop = element.offsetTop;
	const elementBottom = elementTop + element.offsetHeight;

	return elementTop >= parentTop && elementBottom <= parentBottom;
};

export function TableOfContents() {
	const visibleHrefs = useIntersectionObserver(tocItems);
	const listWrapperRef = React.useRef<HTMLDivElement>(null);
	const [activeHref, setActiveHref] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (visibleHrefs.length === 0) {
			setActiveHref(null);
			return;
		}

		const leadHref = visibleHrefs[visibleHrefs.length - 1];
		const leadActiveItem = tocItems.find((item) => item.href === leadHref);

		if (leadActiveItem) {
			setActiveHref(leadActiveItem.href);
		}
	}, [visibleHrefs]);

	React.useEffect(() => {
		if (!activeHref || !listWrapperRef.current) return;

		const listWrapper = listWrapperRef.current;

		const activeElementWrapper = listWrapper.querySelector(
			`div > a[href="${activeHref}"]`,
		)?.parentElement as HTMLElement | null;

		if (!activeElementWrapper) return;

		if (!isElementInView(activeElementWrapper, listWrapper)) {
			activeElementWrapper.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [activeHref]);

	return (
		<div className="sticky top-0 right-0 hidden max-h-screen pr-1 pb-2 pl-6 2xl:block">
			<div
				ref={listWrapperRef}
				className="flex w-40 flex-col overflow-x-hidden overflow-y-scroll overscroll-contain pt-2 pr-1"
			>
				<h3 className="sr-only">Table of Contents</h3>
				{tocItems.map((item) => {
					const active = visibleHrefs.includes(item.href);
					return (
						<div key={item.href} className="relative">
							<a
								href={item.href}
								data-href={item.href}
								data-depth={item.depth}
								data-active={active}
								className="block w-full whitespace-nowrap py-1.5 text-muted-foreground text-sm transition-colors duration-300 hover:text-primary data-[active=true]:font-medium data-[active=true]:text-primary"
							>
								{item.title}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
