"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
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
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "~/components/ui/input-otp";

export function InputOTPPreview() {
	return (
		<ComponentAccordionGroup title="Input OTP">
			<ComponentAccordionSubGroup title="Pattern">
				<PatternDemo />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Separator">
				<InputOTP maxLength={6}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Form">
				<FormDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function PatternDemo() {
	return (
		<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	);
}

function FormDemo() {
	const schema = z.object({
		pin: z.string().min(6, {
			message: "Your one-time password must be 6 characters.",
		}),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			pin: "",
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
					name="pin"
					render={({ field }) => (
						<FormItem className="w-56">
							<FormLabel>One-Time Password</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescription>
								Please enter the one-time password sent to your phone.
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
