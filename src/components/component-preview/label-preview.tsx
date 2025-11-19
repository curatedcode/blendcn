import {
	ComponentGroup,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

export function LabelPreview() {
	return (
		<ComponentGroup title="Label" id="label-component">
			<ComponentGroupPreview>
				<div>
					<div className="flex items-center space-x-2">
						<Checkbox id="terms" />
						<Label htmlFor="terms">Accept terms and conditions</Label>
					</div>
				</div>
			</ComponentGroupPreview>
		</ComponentGroup>
	);
}
