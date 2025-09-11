/** biome-ignore-all lint/a11y/useValidAnchor: not used for actual links, only for demo purposes */
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function InputPreview() {
	return (
		<ComponentAccordionGroup title="Input">
			<ComponentAccordionSubGroup title="Default">
				<Input
					type="email"
					placeholder="Email"
					className="w-64 bg-background"
				/>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="File">
				<Input type="file" className="w-64 bg-background" />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Disabled">
				<Input
					disabled
					type="email"
					placeholder="Email"
					className="w-64 bg-background"
				/>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Button">
				<div className="flex items-center gap-3">
					<Input
						type="email"
						placeholder="Email"
						className="w-64 bg-background"
					/>
					<Button type="submit" variant="outline">
						Subscribe
					</Button>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Label">
				<div className="grid items-center gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						placeholder="Email"
						className="w-64 bg-background"
					/>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Form">
				<InputFormDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function InputFormDemo() {
	const schema = z.object({
		username: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: "",
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
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="shadcn"
									className="w-64 bg-background"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
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
