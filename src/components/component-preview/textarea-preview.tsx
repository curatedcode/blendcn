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
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function TextareaPreview() {
	return (
		<ComponentAccordionGroup title="Textarea">
			<ComponentAccordionSubGroup title="Default">
				<Textarea
					placeholder="Type your message here."
					className="w-84 bg-background"
				/>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Disabled">
				<Textarea
					placeholder="Type your message here."
					className="w-84 bg-background"
					disabled
				/>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Text">
				<div className="flex flex-col gap-2">
					<Textarea
						placeholder="Type your message here."
						id="message-2"
						className="w-84 bg-background"
					/>
					<p className="w-84 text-pretty text-muted-foreground text-sm">
						Your message will be copied to the support team.
					</p>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Button">
				<div className="flex items-start gap-3">
					<Textarea
						placeholder="Type your message here."
						className="w-84 bg-background"
					/>
					<Button variant={"outline"}>Send message</Button>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Label">
				<div className="grid items-center gap-2">
					<Label htmlFor="message">Your message</Label>
					<Textarea
						placeholder="Type your message here."
						id="message"
						className="w-84 bg-background"
					/>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Form">
				<FormDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function FormDemo() {
	const schema = z.object({
		bio: z
			.string()
			.min(10, {
				message: "Bio must be at least 10 characters.",
			})
			.max(160, {
				message: "Bio must not be longer than 30 characters.",
			}),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			bio: "",
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
			>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="w-84 resize-none bg-background"
									{...field}
								/>
							</FormControl>
							<FormDescription className="w-84 text-pretty">
								You can <span>@mention</span> other users and organizations.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-fit self-end">
					Submit
				</Button>
			</form>
		</Form>
	);
}
