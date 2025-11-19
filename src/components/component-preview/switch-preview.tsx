import {
	ComponentGroup,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export function SwitchPreview() {
	return (
		<ComponentGroup title="Switch" id="switch-component">
			<ComponentGroupPreview>
				<div className="flex items-center space-x-2">
					<Switch id="airplane-mode" />
					<Label htmlFor="airplane-mode">Airplane Mode</Label>
				</div>
			</ComponentGroupPreview>
		</ComponentGroup>
	);
}
