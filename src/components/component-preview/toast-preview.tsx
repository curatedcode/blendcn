import { toast } from "sonner";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Button } from "~/components/ui/button";

export function ToastPreview() {
	return (
		<ComponentAccordionGroup title="Toast">
			<ComponentAccordionSubGroup title="Success">
				<Button
					variant="outline"
					onClick={() =>
						toast.success("Event has been created", {
							description: "Sunday, December 03, 2023 at 9:00 AM",
							action: {
								label: "Undo",
								onClick: () => console.log("Undo"),
							},
						})
					}
				>
					Show Toast
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Error">
				<Button
					variant="outline"
					onClick={() =>
						toast.error("Unable to process payment!", {
							description: "Please try again",
						})
					}
				>
					Show Toast
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Info">
				<Button
					variant="outline"
					onClick={() => toast.info("You have an (1) unread message")}
				>
					Show Info Toast
				</Button>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
