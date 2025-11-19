import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v4";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
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
		<ComponentGroup title="Input OTP" id="input-otp-component">
			<ComponentGroupPreview>
				<InputOTP maxLength={6}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Pattern">
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
				</ComponentGroupExample>
				<ComponentGroupExample title="Separator">
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
				</ComponentGroupExample>
				<ComponentGroupExample title="Controlled">
					<InputOTPControlled />
				</ComponentGroupExample>
				<ComponentGroupExample title="Form">
					<InputOTPForm />
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}

function InputOTPControlled() {
	const [value, setValue] = React.useState("");
	return (
		<div className="w-fit space-y-2">
			<InputOTP
				maxLength={6}
				value={value}
				onChange={(value) => setValue(value)}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
			<div className="text-center text-sm">
				{value === "" ? (
					<>Enter your one-time password.</>
				) : (
					<>You entered: {value}</>
				)}
			</div>
		</div>
	);
}

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

function InputOTPForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});
	function onSubmit(data: z.infer<typeof FormSchema>) {
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
					name="pin"
					render={({ field }) => (
						<FormItem>
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
