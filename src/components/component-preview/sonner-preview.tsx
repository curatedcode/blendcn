import { toast } from "sonner";
import {
	ComponentGroup,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";

export function SonnerPreview() {
	return (
		<ComponentGroup title="Sonner" id="sonner-component">
			<ComponentGroupPreview>
				<Button
					variant="outline"
					onClick={() =>
						toast("Event has been created", {
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
			</ComponentGroupPreview>
		</ComponentGroup>
	);
}
