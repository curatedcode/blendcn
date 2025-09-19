import { InfoIcon } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { copyToClipboard } from "~/lib/clipboard";
import { cn } from "~/lib/utils";

const brightColors = ["amber", "yellow", "lime", "mint", "sky"];

type CustomSwatchProps = {
	scale: string;
	step: string;
	cssVariable: string;
	hex: string;
	hexA: string;
	p3: string;
	p3A: string;
	className?: string;
};

export const CustomSwatch = ({
	scale,
	step,
	cssVariable,
	hex,
	hexA,
	p3,
	p3A,
	className,
}: CustomSwatchProps) => {
	const contentRef = React.useRef<HTMLDivElement | null>(null);
	const friendlyScaleName = `${scale.charAt(0).toUpperCase() + scale.slice(1)}`;
	const friendlyColorName = `${friendlyScaleName} ${step}`;
	const isGray = ["gray", "mauve", "slate", "sage", "olive", "sand"].includes(
		scale,
	);

	return (
		<Dialog>
			<DialogTrigger
				className={cn([
					"h-20 max-h-20 w-full md:h-22.5 md:max-h-22.5",
					className,
				])}
				style={{ background: cssVariable }}
			>
				<div className="sr-only">
					{scale} {step}
				</div>
			</DialogTrigger>
			<DialogContent
				ref={contentRef}
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					contentRef.current?.focus();
				}}
				className="max-h-[calc(100%-2rem)] overflow-y-auto overflow-x-hidden px-2 pt-7.5 sm:px-6 sm:pt-6"
			>
				<DialogHeader className="sr-only">
					<DialogTitle>
						{scale} {step}
					</DialogTitle>
				</DialogHeader>
				<div className="relative text-sm">
					<div
						className="h-60 w-full border"
						style={{ backgroundColor: cssVariable }}
					/>
					<h3 className="mt-4 mb-3.5 font-semibold text-base">
						{friendlyColorName}
					</h3>
					<div className="flex flex-col gap-1.5">
						<div className="flex flex-col gap-1.5 sm:flex-row">
							<span className="w-32 font-medium">Usage</span>
							<div className="mb-1 xs:mb-0">
								<span>
									{["1", "2"].includes(step) && "Backgrounds"}
									{["3", "4", "5"].includes(step) && "Interactive components"}
									{["6", "7"].includes(step) && "Borders and separators"}
									{["8"].includes(step) &&
										isGray &&
										"Borders, focus rings, disabled text"}
									{["8"].includes(step) && !isGray && "Borders, focus rings"}
									{["9", "10"].includes(step) &&
										isGray &&
										"Solid backgrounds, disabled text"}
									{["9", "10"].includes(step) &&
										!isGray &&
										"Solid backgrounds, buttons"}
									{["11"].includes(step) && "Secondary text, links"}
									{["12"].includes(step) && "High-contrast text"}
								</span>
							</div>
						</div>
						<div className="flex flex-col gap-1.5 sm:flex-row">
							<span className="w-32 font-medium">Pairs with</span>
							<span>
								{" "}
								{["1", "2"].includes(step) && "Steps 11, 12 text"}
								{["3"].includes(step) && "Steps 11 labels, Step 12 text"}
								{["4"].includes(step) && "Steps 11, 12 labels"}
								{["5"].includes(step) && "Step 12 labels"}
								{["6", "7", "8"].includes(step) && "Steps 1-5 backgrounds"}
								{["9", "10"].includes(step) &&
									(brightColors.includes(scale) ? "Dark text" : "White text")}
								{["11", "12"].includes(step) && "Background colors"}
							</span>
						</div>
						<Separator className="my-2" />
						<div className="flex flex-col gap-0.5 md:flex-row md:items-center">
							<span className="w-32">Solid color</span>
							<CopyButton>{hex}</CopyButton>
						</div>
						<div className="flex flex-col gap-0.5 md:flex-row md:items-center">
							<div className="flex w-32 items-center gap-1.5">
								<span>Alpha color</span>
								<Popover modal>
									<PopoverTrigger asChild>
										<Button variant="ghost" size={"icon"} className="size-7">
											<InfoIcon className="size-3.5" />
											<span className="sr-only">Learn more</span>
										</Button>
									</PopoverTrigger>
									<PopoverContent
										side="top"
										align="center"
										className="flex w-95 flex-col gap-3"
									>
										<p className="mb-1">
											Alpha color is a translucent color that achieves the same
											look against a neutral background. Alpha colors are used
											for elements that need to retain contrast when overlayed
											over different backgrounds.
										</p>
										<p>
											The alphas are designed against white background in light
											mode and Gray 1 in dark mode.
										</p>
									</PopoverContent>
								</Popover>
							</div>
							<CopyButton className="-mt-1 md:-mt-0">{hexA}</CopyButton>
						</div>
						<div className="flex flex-col gap-0.5 md:flex-row md:items-center">
							<span className="w-32">P3 color</span>
							<CopyButton>{p3}</CopyButton>
						</div>
						<div className="flex flex-col gap-0.5 md:flex-row md:items-center">
							<span className="w-32">P3 alpha</span>
							<CopyButton>{p3A}</CopyButton>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

interface CopyButtonState {
	open: boolean;
	text: "Click to copy" | "Copied";
	timeout: ReturnType<typeof setTimeout> | null;
}

const CopyButton = ({
	onClick,
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof Button>) => {
	const ref = React.useRef<HTMLButtonElement>(null);

	const [state, setState] = React.useReducer(
		(
			prevState: CopyButtonState,
			newState: Partial<CopyButtonState>,
		): CopyButtonState => {
			// Start a timeout to change the text when tooltip is closed
			if (newState.open === false) {
				newState.timeout = setTimeout(() => {
					setState({
						text: "Click to copy",
						timeout: null,
					});
				}, 1000);
			}

			// Clear a previous timeout when tooltip state changes
			if (prevState.timeout) {
				clearTimeout(prevState.timeout);
				prevState.timeout = null;
			}

			return { ...prevState, ...newState };
		},
		{
			open: false,
			text: "Click to copy",
			timeout: null,
		},
	);

	return (
		<Tooltip
			disableHoverableContent
			onOpenChange={(open) => setState({ open })}
			open={state.open}
		>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					ref={ref}
					className={cn("w-fit select-auto px-1.5 sm:px-3", className)}
					onClick={(event) => {
						onClick?.(event);
						const originalDefaultPrevented = event.defaultPrevented;

						// Prevent tooltip closing on click
						event.preventDefault();
						const text = ref.current?.textContent;

						if (text) {
							setState({
								open: true,
								text: "Copied",
							});

							if (!originalDefaultPrevented) {
								void copyToClipboard(text);
							}
						}
					}}
					size={"sm"}
					{...props}
				/>
			</TooltipTrigger>
			<TooltipContent>{state.text}</TooltipContent>
		</Tooltip>
	);
};
