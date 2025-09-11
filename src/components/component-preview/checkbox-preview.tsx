"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v4";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";

export function CheckboxPreview() {
	return (
		<ComponentAccordionGroup title="Checkbox">
			<ComponentAccordionSubGroup title="Default">
				<div className="flex items-center gap-2">
					<Checkbox id="terms" className="bg-background" />
					<Label htmlFor="terms">Accept terms and conditions</Label>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Text">
				<div className="flex items-start gap-3">
					<Checkbox id="terms-2" className="bg-background" defaultChecked />
					<div className="grid gap-2">
						<Label htmlFor="terms-2">Accept terms and conditions</Label>
						<p className="text-muted-foreground text-sm">
							By clicking this checkbox, you agree to the terms and conditions.
						</p>
					</div>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Disabled">
				<div className="flex items-center gap-2">
					<Checkbox id="toggle" className="bg-background" disabled />
					<Label htmlFor="toggle">Enable notifications</Label>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Card">
				<Label className="flex items-start gap-3 rounded-lg border bg-background p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
					<Checkbox
						id="toggle-2"
						defaultChecked
						className="bg-background data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
					/>
					<div className="grid gap-1.5 font-normal">
						<p className="font-medium text-sm leading-none">
							Enable notifications
						</p>
						<p className="text-muted-foreground text-sm">
							You can enable or disable notifications at any time.
						</p>
					</div>
				</Label>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Form">
				<CheckboxForm />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function CheckboxForm() {
	const items = [
		{
			id: "recents",
			label: "Recents",
		},
		{
			id: "home",
			label: "Home",
		},
		{
			id: "applications",
			label: "Applications",
		},
		{
			id: "desktop",
			label: "Desktop",
		},
		{
			id: "downloads",
			label: "Downloads",
		},
		{
			id: "documents",
			label: "Documents",
		},
	] as const;

	const schema = z.object({
		items: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You have to select at least one item.",
		}),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			items: ["recents", "home"],
		},
	});
	function onSubmit(data: z.infer<typeof schema>) {
		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="items"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel className="text-base">Sidebar</FormLabel>
								<FormDescription>
									Select the items you want to display in the sidebar.
								</FormDescription>
							</div>
							{items.map((item) => (
								<FormField
									key={item.id}
									control={form.control}
									name="items"
									render={({ field }) => {
										return (
											<FormItem
												key={item.id}
												className="flex flex-row items-center gap-2"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(item.id)}
														className="bg-background"
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([...field.value, item.id])
																: field.onChange(
																		field.value?.filter(
																			(value) => value !== item.id,
																		),
																	);
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal text-sm">
													{item.label}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
