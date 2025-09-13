/** biome-ignore-all lint/a11y/useValidAnchor: no hrefs here are valid, just for demo purposes */
"use client";

import { AccordionPreview } from "~/components/component-preview/accordion-preview";
import { AlertDialogPreview } from "~/components/component-preview/alert-dialog-preview";
import { AlertPreview } from "~/components/component-preview/alert-preview";
import { AspectRatioPreview } from "~/components/component-preview/aspect-ratio-preview";
import { AvatarPreview } from "~/components/component-preview/avatar-preview";
import { BadgePreview } from "~/components/component-preview/badge-preview";
import { BreadcrumbPreview } from "~/components/component-preview/breadcrumb-preview";
import { ButtonPreview } from "~/components/component-preview/button-preview";
import { CalendarPreview } from "~/components/component-preview/calendar-preview";
import { CardPreview } from "~/components/component-preview/card-preview";
import { CarouselPreview } from "~/components/component-preview/carousel-preview";
import { ChartPreview } from "~/components/component-preview/chart-preview";
import { CheckboxPreview } from "~/components/component-preview/checkbox-preview";
import { CollapsiblePreview } from "~/components/component-preview/collapsible-preview";
import { ComboboxPreview } from "~/components/component-preview/combobox-preview";
import { CommandPreview } from "~/components/component-preview/command-preview";
import { ComponentAccordionItem } from "~/components/component-preview/component-accordion";
import { ContextMenuPreview } from "~/components/component-preview/context-menu-preview";
import { DataTablePreview } from "~/components/component-preview/data-table-preview";
import { DatePickerPreview } from "~/components/component-preview/date-picker-preview";
import { DialogPreview } from "~/components/component-preview/dialog-preview";
import { DrawerPreview } from "~/components/component-preview/drawer-preview";
import { DropdownMenuPreview } from "~/components/component-preview/dropdown-menu-preview";
import { HoverCardPreview } from "~/components/component-preview/hover-card-preview";
import { InputOTPPreview } from "~/components/component-preview/input-otp-preview";
import { InputPreview } from "~/components/component-preview/input-preview";
import { MenubarPreview } from "~/components/component-preview/menubar-preview";
import { NavigationMenuPreview } from "~/components/component-preview/navigation-menu-preview";
import { PaginationPreview } from "~/components/component-preview/pagination-preview";
import { PopoverPreview } from "~/components/component-preview/popover-preview";
import { ProgressPreview } from "~/components/component-preview/progress-preview";
import { ResizablePreview } from "~/components/component-preview/resizable-preview";
import { SelectPreview } from "~/components/component-preview/select-preview";
import { SeparatorPreview } from "~/components/component-preview/separator-preview";
import { SheetPreview } from "~/components/component-preview/sheet-preview";
import { SidebarPreview } from "~/components/component-preview/sidebar-preview";
import { SkeletonPreview } from "~/components/component-preview/skeleton-preview";
import { SliderPreview } from "~/components/component-preview/slider-preview";
import { SwitchPreview } from "~/components/component-preview/switch-preview";
import { TablePreview } from "~/components/component-preview/table-preview";
import { TabsPreview } from "~/components/component-preview/tabs-preview";
import { TextareaPreview } from "~/components/component-preview/textarea-preview";
import { ToastPreview } from "~/components/component-preview/toast-preview";
import { ToggleGroupPreview } from "~/components/component-preview/toggle-group-preview";
import { TogglePreview } from "~/components/component-preview/toggle-preview";
import { TooltipPreview } from "~/components/component-preview/tooltip-preview";
import { Accordion } from "~/components/ui/accordion";

export function ComponentPreview() {
	return (
		<Accordion
			type="multiple"
			className="w-full bg-background md:px-3"
			defaultValue={["form-and-inputs"]}
		>
			<ComponentAccordionItem
				value="form-and-inputs"
				title="Forms & Inputs"
				description="Show how your system handles user input, validations, and layout"
			>
				<ButtonPreview />
				<InputPreview />
				<TextareaPreview />
				<InputOTPPreview />
				<CheckboxPreview />
				<SwitchPreview />
				<TogglePreview />
				<ToggleGroupPreview />
				<SelectPreview />
				<ComboboxPreview />
				<DatePickerPreview />
				<CalendarPreview />
				<SliderPreview />
			</ComponentAccordionItem>
			<ComponentAccordionItem
				value="feedback-and-messaging"
				title="Feedback & Messaging"
				description="Communicate system state, alerts, and progress"
			>
				<AlertPreview />
				<AlertDialogPreview />
				<ToastPreview />
				<ProgressPreview />
				<SkeletonPreview />
			</ComponentAccordionItem>
			<ComponentAccordionItem
				value="navigation-and-structure"
				title="Navigation & Structure"
				description="Guide users through content and actions"
			>
				<TabsPreview />
				<MenubarPreview />
				<NavigationMenuPreview />
				<BreadcrumbPreview />
				<PaginationPreview />
				<SidebarPreview />
				<AccordionPreview />
				<CollapsiblePreview />
				<SeparatorPreview />
			</ComponentAccordionItem>
			<ComponentAccordionItem
				value="overlays-and-pop-interactions"
				title="Overlay & Pop Interactions"
				description="Layered components that appear on demand"
			>
				<DialogPreview />
				<DrawerPreview />
				<SheetPreview />
				<PopoverPreview />
				<TooltipPreview />
				<HoverCardPreview />
				<DropdownMenuPreview />
				<ContextMenuPreview />
			</ComponentAccordionItem>
			<ComponentAccordionItem
				value="identity-and-status"
				title="Identity & Status"
				description="Represent users, tags, and semantic styling"
			>
				<AvatarPreview />
				<BadgePreview />
			</ComponentAccordionItem>
			<ComponentAccordionItem
				value="data-and-visualization"
				title="Data & Visualization"
				description="Present structured content and analytics"
			>
				<TablePreview />
				<DataTablePreview />
				<ChartPreview />
			</ComponentAccordionItem>
			<ComponentAccordionItem
				value="layout-and-utility"
				title="Layout & Utility"
				description="Control spacing, aspect, and scroll behavior"
			>
				<CardPreview />
				<CarouselPreview />
				<AspectRatioPreview />
				<ResizablePreview />
				<CommandPreview />
			</ComponentAccordionItem>
		</Accordion>
	);
}
