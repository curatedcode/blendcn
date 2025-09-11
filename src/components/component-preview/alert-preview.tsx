import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function AlertPreview() {
	return (
		<ComponentAccordionGroup title="Alert">
			<ComponentAccordionSubGroup title="Simple">
				<Alert>
					<CheckCircle2Icon />
					<AlertTitle>Success! Your changes have been saved</AlertTitle>
					<AlertDescription>
						This is an alert with icon, title and description.
					</AlertDescription>
				</Alert>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Without a Description">
				<Alert>
					<PopcornIcon />
					<AlertTitle>
						This Alert has a title and an icon. No description.
					</AlertTitle>
				</Alert>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Destructive">
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertTitle>Unable to process your payment.</AlertTitle>
					<AlertDescription>
						<p>Please verify your billing information and try again.</p>
						<ul className="list-inside list-disc text-sm">
							<li>Check your card details</li>
							<li>Ensure sufficient funds</li>
							<li>Verify billing address</li>
						</ul>
					</AlertDescription>
				</Alert>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
