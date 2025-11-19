import { AccordionPreview } from "~/components/component-preview/accordion-preview";
import { AlertDialogPreview } from "~/components/component-preview/alert-dialog-preview";
import { AlertPreview } from "~/components/component-preview/alert-preview";
import { AspectRatioPreview } from "~/components/component-preview/aspect-ratio-preview";
import { AvatarPreview } from "~/components/component-preview/avatar-preview";
import { BadgePreview } from "~/components/component-preview/badge-preview";
import { BreadcrumbPreview } from "~/components/component-preview/breadcrumb-preview";
import { ButtonGroupPreview } from "~/components/component-preview/button-group-preview";
import { ButtonPreview } from "~/components/component-preview/button-preview";
import { CalendarPreview } from "~/components/component-preview/calendar-preview";
import { CardPreview } from "~/components/component-preview/card-preview";
import { CarouselPreview } from "~/components/component-preview/carousel-preview";
import { ChartPreview } from "~/components/component-preview/chart-preview";
import { CheckboxPreview } from "~/components/component-preview/checkbox-preview";
import { CollapsiblePreview } from "~/components/component-preview/collapsible-preview";
import { ComboboxPreview } from "~/components/component-preview/combobox-preview";
import { CommandPreview } from "~/components/component-preview/command-preview";
import { ContextMenuPreview } from "~/components/component-preview/context-menu-preview";
import { DataTablePreview } from "~/components/component-preview/data-table-preview";
import { DatePickerPreview } from "~/components/component-preview/date-picker-preview";
import { DialogPreview } from "~/components/component-preview/dialog-preview";
import { DrawerPreview } from "~/components/component-preview/drawer-preview";
import { DropdownMenuPreview } from "~/components/component-preview/dropdown-menu-preview";
import { EmptyPreview } from "~/components/component-preview/empty-preview";
import { FieldPreview } from "~/components/component-preview/field-preview";
import { HoverCardPreview } from "~/components/component-preview/hover-card-preview";
import { InputGroupPreview } from "~/components/component-preview/input-group-preview";
import { InputOTPPreview } from "~/components/component-preview/input-otp-preview";
import { InputPreview } from "~/components/component-preview/input-preview";
import { ItemPreview } from "~/components/component-preview/item-preview";
import { KbdPreview } from "~/components/component-preview/kbd-preview";
import { LabelPreview } from "~/components/component-preview/label-preview";
import { MenubarPreview } from "~/components/component-preview/menubar-preview";
import { NativeSelectPreview } from "~/components/component-preview/native-select-preview";
import { NavigationMenuPreview } from "~/components/component-preview/navigation-menu-preview";
import { PaginationPreview } from "~/components/component-preview/pagination-preview";
import { PopoverPreview } from "~/components/component-preview/popover-preview";
import { ProgressPreview } from "~/components/component-preview/progress-preview";
import { RadioGroupPreview } from "~/components/component-preview/radio-group-preview";
import { ResizablePreview } from "~/components/component-preview/resizable-preview";
import { ScrollAreaPreview } from "~/components/component-preview/scroll-area-preview";
import { SelectPreview } from "~/components/component-preview/select-preview";
import { SeparatorPreview } from "~/components/component-preview/separator-preview";
import { SheetPreview } from "~/components/component-preview/sheet-preview";
import { SidebarPreview } from "~/components/component-preview/sidebar-preview";
import { SkeletonPreview } from "~/components/component-preview/skeleton-preview";
import { SliderPreview } from "~/components/component-preview/slider-preview";
import { SonnerPreview } from "~/components/component-preview/sonner-preview";
import { SpinnerPreview } from "~/components/component-preview/spinner-preview";
import { SwitchPreview } from "~/components/component-preview/switch-preview";
import { TablePreview } from "~/components/component-preview/table-preview";
import { TabsPreview } from "~/components/component-preview/tabs-preview";
import { TextareaPreview } from "~/components/component-preview/textarea-preview";
import { ToggleGroupPreview } from "~/components/component-preview/toggle-group-preview";
import { TogglePreview } from "~/components/component-preview/toggle-preview";
import { TooltipPreview } from "~/components/component-preview/tooltip-preview";
import { cn } from "~/lib/utils";

export function ComponentPreview() {
	return (
		<div className="max-w-full overflow-hidden">
			<div className="w-full space-y-16 border-r bg-background p-1.5 pt-4 sm:p-3 lg:columns-2 lg:[column-fill:balance]">
				<ComponentSection
					title="Form Inputs"
					id="form-inputs"
					description="Used constantly in UI forms and data entry"
				>
					<CheckboxPreview />
					<ComboboxPreview />
					<DatePickerPreview />
					<FieldPreview />
					<InputPreview />
					<InputGroupPreview />
					<InputOTPPreview />
					<LabelPreview />
					<NativeSelectPreview />
					<RadioGroupPreview />
					<SelectPreview />
					<SliderPreview />
					<SwitchPreview />
					<TextareaPreview />
				</ComponentSection>
				<ComponentSection
					title="Buttons & Actions"
					id="button-and-actions"
					description="Primary interaction elements"
				>
					<ButtonPreview />
					<ButtonGroupPreview />
					<TogglePreview />
					<ToggleGroupPreview />
				</ComponentSection>
				<ComponentSection
					title="Feedback & Status"
					id="feedback-and-status"
					description="Communicate progress, alerts, or feedback"
				>
					<AlertPreview />
					<AlertDialogPreview />
					<ProgressPreview />
					<SkeletonPreview />
					<SonnerPreview />
					<SpinnerPreview />
				</ComponentSection>
				<ComponentSection
					title="Layout & Structure"
					id="layout-and-structure"
					description="Containers and structural helpers"
				>
					<AccordionPreview />
					<AspectRatioPreview />
					<CardPreview />
					<CollapsiblePreview />
					<DrawerPreview />
					<ResizablePreview />
					<ScrollAreaPreview />
					<SeparatorPreview />
					<SheetPreview />
					<SidebarPreview />
				</ComponentSection>
				<ComponentSection
					title="Navigation"
					id="navigation"
					description="Menus and links for moving around interfaces"
				>
					<BreadcrumbPreview />
					<CommandPreview />
					<ContextMenuPreview />
					<DropdownMenuPreview />
					<MenubarPreview />
					<NavigationMenuPreview />
					<PaginationPreview />
					<TabsPreview />
				</ComponentSection>
				<ComponentSection
					title="Data Display"
					id="data-display"
					description="Show static or structured data"
				>
					<AvatarPreview />
					<BadgePreview />
					<CalendarPreview />
					<CarouselPreview />
					<ChartPreview />
					<DataTablePreview />
					<EmptyPreview />
					<ItemPreview />
					<KbdPreview />
					<TablePreview />
				</ComponentSection>
				<ComponentSection
					title="Overlays and Popups"
					id="overlays-and-popups"
					description="Transient layered UI components"
				>
					<DialogPreview />
					<HoverCardPreview />
					<PopoverPreview />
					<TooltipPreview />
				</ComponentSection>
			</div>
		</div>
	);
}

export type ComponentsSectionProps = {
	title: string;
	description: string;
	id: string;
	children: React.ReactNode;
};

function ComponentSection({
	title,
	description,
	id,
	children,
}: ComponentsSectionProps) {
	return (
		<section
			id={id}
			className="space-y-12 lg:inline-block lg:w-full lg:break-inside-avoid lg:align-top"
		>
			<div className="mx-auto w-fit md:mx-0">
				<h2 className="text-center font-semibold text-lg md:text-left">
					{title}
				</h2>
				<p className="text-muted-foreground text-sm">{description}</p>
			</div>
			<div className="space-y-12">{children}</div>
		</section>
	);
}

export type ComponentGroupProps = {
	id: string;
	title: string;
	className?: string;
	children: React.ReactNode;
};

export function ComponentGroup({
	id,
	title,
	className,
	children,
}: ComponentGroupProps) {
	return (
		<div id={id} className="space-y-12 border-border/80 border-l pb-12">
			<h3 className="w-fit rounded-r-lg border border-l-0 bg-border/20 px-5 py-1 font-medium text-lg shadow">
				{title}
			</h3>
			<div className={cn("space-y-12", className)}>{children}</div>
		</div>
	);
}

export type ComponentGroupPreviewProps = {
	className?: string;
	children: React.ReactNode;
};

export function ComponentGroupPreview({
	className,
	children,
}: ComponentGroupPreviewProps) {
	return (
		<div className={cn("rounded-lg pl-1.5 sm:w-fit sm:pl-3.5", className)}>
			{children}
		</div>
	);
}

export type ComponentGroupExamplesProps = {
	className?: string;
	children: React.ReactNode;
};

export function ComponentGroupExamples({
	className,
	children,
}: ComponentGroupExamplesProps) {
	return <div className={cn("grid gap-12", className)}>{children}</div>;
}

export type ComponentGroupExampleProps = {
	title: string;
	className?: string;
	children: React.ReactNode;
};

export function ComponentGroupExample({
	title,
	className,
	children,
}: ComponentGroupExampleProps) {
	return (
		<div className="w-full space-y-6">
			<h4 className="w-fit rounded-r-lg border border-l-0 bg-border/20 px-3 py-0.5 font-medium text-sm shadow">
				{title}
			</h4>
			<div className={cn("pt-4.25 pl-1.5 sm:pl-3.5", className)}>
				{children}
			</div>
		</div>
	);
}
