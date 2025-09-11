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
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

export function SelectPreview() {
	return (
		<ComponentAccordionGroup title="Select">
			<ComponentAccordionSubGroup title="Default">
				<Select>
					<SelectTrigger className="w-[180px] bg-background">
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
							<SelectItem value="blueberry">Blueberry</SelectItem>
							<SelectItem value="grapes">Grapes</SelectItem>
							<SelectItem value="pineapple">Pineapple</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Scrollable">
				<SelectScrollable />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Form">
				<SelectForm />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function SelectScrollable() {
	return (
		<Select>
			<SelectTrigger className="w-82 bg-background">
				<SelectValue placeholder="Select a timezone" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>North America</SelectLabel>
					<SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
					<SelectItem value="cst">Central Standard Time (CST)</SelectItem>
					<SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
					<SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
					<SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
					<SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Europe & Africa</SelectLabel>
					<SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
					<SelectItem value="cet">Central European Time (CET)</SelectItem>
					<SelectItem value="eet">Eastern European Time (EET)</SelectItem>
					<SelectItem value="west">
						Western European Summer Time (WEST)
					</SelectItem>
					<SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
					<SelectItem value="eat">East Africa Time (EAT)</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Asia</SelectLabel>
					<SelectItem value="msk">Moscow Time (MSK)</SelectItem>
					<SelectItem value="ist">India Standard Time (IST)</SelectItem>
					<SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
					<SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
					<SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
					<SelectItem value="ist_indonesia">
						Indonesia Central Standard Time (WITA)
					</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Australia & Pacific</SelectLabel>
					<SelectItem value="awst">
						Australian Western Standard Time (AWST)
					</SelectItem>
					<SelectItem value="acst">
						Australian Central Standard Time (ACST)
					</SelectItem>
					<SelectItem value="aest">
						Australian Eastern Standard Time (AEST)
					</SelectItem>
					<SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
					<SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>South America</SelectLabel>
					<SelectItem value="art">Argentina Time (ART)</SelectItem>
					<SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
					<SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
					<SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

function SelectForm() {
	const schema = z.object({
		email: z
			.string({
				error: "Please select an email to display.",
			})
			.email(),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="bg-background">
										<SelectValue placeholder="Select a verified email to display" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="m@example.com">m@example.com</SelectItem>
									<SelectItem value="m@google.com">m@google.com</SelectItem>
									<SelectItem value="m@support.com">m@support.com</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								You can manage email addresses in your{" "}
								{/** biome-ignore lint/a11y/useValidAnchor: This is just a demo not an actual link */}
								<a href="#">email settings</a>.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
