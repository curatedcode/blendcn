"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ClipboardIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { useColorContext } from "~/components/color-context";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useIsHydrated } from "~/hooks/use-is-hydrated";
import { copyToClipboard } from "~/lib/clipboard";
import {
	generateUserColorsCss,
	supportedColorFormats,
	supportedDarkVariants,
} from "~/lib/colors/generate-user-colors-css";

const formSchema = z.object({
	theme: z.enum(["light", "dark", "both"]).default("both"),
	includeSupportsMediaQuery: z.boolean().default(true),
	includeThemeInlineVariables: z.boolean().default(true),
	indentation: z
		.discriminatedUnion("type", [
			z.object({ type: z.literal("tab") }),
			z.object({
				type: z.literal("space"),
				size: z.enum(["2", "4"]),
			}),
		])
		.default({ type: "tab" }),
	darkModeVariant: z.enum(["class", "data-attribute"]),
	uppercaseHex: z.boolean().default(false),
	colorFormat: z.enum(["hex", "srgb", "hsl", "oklch"]),
});

const defaultFormValues: z.infer<typeof formSchema> = {
	theme: "both",
	includeSupportsMediaQuery: true,
	includeThemeInlineVariables: true,
	indentation: { type: "tab" },
	darkModeVariant: "class",
	uppercaseHex: false,
	colorFormat: "hex",
};

export function Header() {
	const { resolvedTheme, setTheme } = useTheme();
	const { paletteMappings } = useColorContext();
	const isHydrated = useIsHydrated();

	const [cssOutput, setCssOutput] = React.useState(
		generateUserColorsCss({
			...defaultFormValues,
			indentation:
				defaultFormValues.indentation.type === "tab"
					? {
							type: "tab",
						}
					: { type: "space", size: 4 },
			paletteMappings,
		}),
	);
	const [copied, setCopied] = React.useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
		defaultValues: defaultFormValues,
	});

	function handleThemeChange() {
		const newTheme = resolvedTheme === "light" ? "dark" : "light";
		setTheme(newTheme);
	}

	const onSubmit = React.useCallback(
		(values: z.infer<typeof formSchema>) => {
			try {
				const cssOutput = generateUserColorsCss({
					...values,
					indentation:
						values.indentation.type === "tab"
							? { type: "tab" }
							: {
									type: "space",
									size: Number(values.indentation.size) as 2 | 4,
								},
					paletteMappings,
				});
				setCssOutput(cssOutput);
			} catch (error) {
				console.error("CSS generation failed:", error);
				toast.error("Unable to generate CSS. Please try again.");
			}

			if (values.colorFormat === "oklch" && values.includeSupportsMediaQuery) {
				toast.info(
					"Omitting @supports media query because color format is already oklch.",
				);
			}
		},
		[paletteMappings],
	);

	React.useEffect(() => {
		const subscription = form.watch(() => form.handleSubmit(onSubmit)());
		return () => subscription.unsubscribe();
	}, [form.watch, form.handleSubmit, onSubmit]);

	React.useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => setCopied(false), 1000);
		return () => clearTimeout(timeout);
	}, [copied]);

	if (!isHydrated) {
		return (
			<div className="flex w-full items-center gap-1.5 pb-1 pl-3">
				<h1 className="mr-auto font-semibold text-lg">Components</h1>
				<Button
					variant={"outline"}
					className="dark:border-border dark:bg-background dark:hover:bg-accent/50 dark:hover:text-accent-foreground"
					size={"icon"}
				>
					<SunIcon />
				</Button>
				<Button
					variant={"outline"}
					className="dark:border-border dark:bg-background dark:hover:bg-accent/50 dark:hover:text-accent-foreground"
				>
					Copy
				</Button>
			</div>
		);
	}

	return (
		<div className="flex w-full items-center gap-1.5 pb-1 pl-3">
			<h1 className="mr-auto font-semibold text-lg">Components</h1>
			<Button
				variant={"outline"}
				size={"icon"}
				className="relative dark:border-border dark:bg-background dark:hover:bg-accent/50 dark:hover:text-accent-foreground"
				onClick={() => handleThemeChange()}
			>
				<span className="sr-only">Switch theme</span>
				<AnimatePresence mode="wait">
					{resolvedTheme === "light" && (
						<motion.div
							key="light"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1 }}
							className="absolute inset-0 flex items-center justify-center"
						>
							<SunIcon />
						</motion.div>
					)}
					{resolvedTheme === "dark" && (
						<motion.div
							key="dark"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1 }}
							className="absolute inset-0 flex items-center justify-center"
						>
							<MoonStarIcon />
						</motion.div>
					)}
				</AnimatePresence>
			</Button>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant={"outline"}
						className="dark:border-border dark:bg-background dark:hover:bg-accent dark:hover:text-accent-foreground"
					>
						Copy
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-5xl">
					<DialogHeader>
						<DialogTitle>Export Theme Palette</DialogTitle>
						<DialogDescription>
							Copy your generated theme variables in the format you prefer
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:items-center">
						<Form {...form}>
							<form
								onSubmit={(e) => e.preventDefault()}
								className="flex flex-col gap-6"
							>
								<div className="flex flex-col gap-3">
									<h2 className="font-medium text-base">Theme Behavior</h2>
									<div className="ml-0.75 flex flex-col gap-3 border-l py-1 pl-2">
										<FormField
											control={form.control}
											name="theme"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Theme Scope</FormLabel>
													<FormControl>
														<RadioGroup
															onValueChange={field.onChange}
															defaultValue={field.value}
															className="flex flex-col"
														>
															<FormItem className="flex items-center gap-2">
																<FormControl>
																	<RadioGroupItem value="light" />
																</FormControl>
																<FormLabel className="font-normal">
																	Light
																</FormLabel>
															</FormItem>
															<FormItem className="flex items-center gap-2">
																<FormControl>
																	<RadioGroupItem value="dark" />
																</FormControl>
																<FormLabel className="font-normal">
																	Dark
																</FormLabel>
															</FormItem>
															<FormItem className="flex items-center gap-2">
																<FormControl>
																	<RadioGroupItem value="both" />
																</FormControl>
																<FormLabel className="font-normal">
																	Both
																</FormLabel>
															</FormItem>
														</RadioGroup>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="darkModeVariant"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Dark Mode Strategy</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="w-35">
																<SelectValue />
															</SelectTrigger>
															<SelectContent className="w-35">
																{supportedDarkVariants.map((v) => (
																	<SelectItem key={v.value} value={v.value}>
																		{v.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="includeSupportsMediaQuery"
											render={({ field }) => (
												<FormItem className="flex items-center gap-2">
													<FormControl>
														<Checkbox
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
													<FormLabel>Include Supports Media Query</FormLabel>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="includeThemeInlineVariables"
											render={({ field }) => (
												<FormItem className="flex items-center gap-2">
													<FormControl>
														<Checkbox
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
													<FormLabel>Include Inline Theme Variables</FormLabel>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className="flex flex-col gap-3">
									<h2 className="font-medium text-base">Color Output</h2>
									<div className="ml-0.75 flex flex-col gap-3 border-l py-1 pl-2">
										<FormField
											control={form.control}
											name="colorFormat"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Color format</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="w-35">
																<SelectValue />
															</SelectTrigger>
															<SelectContent className="w-35">
																{supportedColorFormats.map((v) => (
																	<SelectItem key={v.value} value={v.value}>
																		{v.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="uppercaseHex"
											render={({ field }) => (
												<FormItem className="flex items-center gap-2">
													<FormControl>
														<Checkbox
															checked={field.value}
															onCheckedChange={field.onChange}
															disabled={form.watch("colorFormat") !== "hex"}
														/>
													</FormControl>
													<FormLabel>Uppercase hex</FormLabel>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className="flex flex-col gap-3">
									<h2 className="font-medium text-base">Formatting</h2>
									<div className="ml-0.75 flex flex-col gap-3 border-l py-1 pl-2">
										<FormField
											control={form.control}
											name="indentation.type"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Indentation type</FormLabel>
													<FormControl>
														<RadioGroup
															onValueChange={(v) => {
																if (v === "space") {
																	form.setValue("indentation", {
																		type: "space",
																		size: "4",
																	});
																} else {
																	field.onChange(v);
																}
															}}
															defaultValue={field.value}
															className="flex flex-col"
														>
															<FormItem className="flex items-center gap-2">
																<FormControl>
																	<RadioGroupItem value="tab" />
																</FormControl>
																<FormLabel className="font-normal">
																	Tab
																</FormLabel>
															</FormItem>
															<FormItem className="flex items-center gap-2">
																<FormControl>
																	<RadioGroupItem value="space" />
																</FormControl>
																<FormLabel className="font-normal">
																	Space
																</FormLabel>
															</FormItem>
														</RadioGroup>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="indentation.size"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Indentation size</FormLabel>
													<FormControl>
														<RadioGroup
															onValueChange={(v) => {
																console.log("indentation", v, typeof v);
																field.onChange(v);
															}}
															defaultValue={"4"}
															className="flex flex-col"
															disabled={
																form.watch("indentation.type") !== "space"
															}
														>
															<FormItem className="flex items-center gap-3">
																<FormControl>
																	<RadioGroupItem value="2" />
																</FormControl>
																<FormLabel className="font-normal">2</FormLabel>
															</FormItem>
															<FormItem className="flex items-center gap-3">
																<FormControl>
																	<RadioGroupItem value="4" />
																</FormControl>
																<FormLabel className="font-normal">4</FormLabel>
															</FormItem>
														</RadioGroup>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</form>
						</Form>
						{cssOutput && (
							<div className="col-span-2 h-full max-h-[calc(100vh-24rem)] rounded-sm bg-black p-px dark:bg-zinc-200">
								<ScrollArea
									className="relative h-full max-h-[calc(100vh-24rem)] rounded-sm bg-black font-mono text-white dark:bg-zinc-200 dark:text-black"
									showScrollbar={false}
								>
									<pre className="p-4">
										<code className="block whitespace-pre">{cssOutput}</code>
									</pre>
									<Button
										onClick={() => {
											copyToClipboard(cssOutput);
											setCopied(true);
										}}
										size="sm"
										className="absolute top-2.5 right-2.5 h-6 rounded bg-zinc-700 px-2 py-1 text-white text-xs hover:bg-zinc-800 dark:bg-black dark:text-white dark:hover:bg-zinc-800"
									>
										{copied ? (
											<>
												<CheckIcon className="size-3" />
												<span>Copied</span>
											</>
										) : (
											<>
												<ClipboardIcon className="size-3" />
												<span>Copy</span>
											</>
										)}
									</Button>
									<ScrollBar
										orientation="horizontal"
										thumbClassName="bg-zinc-400 dark:bg-zinc-800"
									/>
									<ScrollBar
										orientation="vertical"
										thumbClassName="bg-zinc-400 dark:bg-zinc-800"
									/>
								</ScrollArea>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
