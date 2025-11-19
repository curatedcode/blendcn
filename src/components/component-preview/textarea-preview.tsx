import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function TextareaPreview() {
	return (
		<ComponentGroup title="Textarea" id="textarea-component">
			<ComponentGroupPreview>
				<Textarea placeholder="Type your message here." />
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Disabled">
					<Textarea placeholder="Type your message here." disabled />
				</ComponentGroupExample>
				<ComponentGroupExample title="With Label">
					<div className="grid w-full gap-3">
						<Label htmlFor="message">Your message</Label>
						<Textarea placeholder="Type your message here." id="message" />
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="With Text">
					<div className="grid w-full gap-3">
						<Label htmlFor="message-2">Your Message</Label>
						<Textarea placeholder="Type your message here." id="message-2" />
						<p className="text-muted-foreground text-sm">
							Your message will be copied to the support team.
						</p>
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="With Button">
					<div className="grid w-full gap-2">
						<Textarea placeholder="Type your message here." />
						<Button>Send message</Button>
					</div>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}
