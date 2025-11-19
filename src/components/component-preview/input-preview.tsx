/** biome-ignore-all lint/a11y/useValidAnchor: not used for actual links, only for demo purposes */
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function InputPreview() {
	return (
		<ComponentGroup title="Input" id="input-component">
			<ComponentGroupPreview>
				<Input type="email" placeholder="Email" />
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="File">
					<div className="flex w-full flex-col gap-3 sm:max-w-sm">
						<Label htmlFor="picture">Picture</Label>
						<Input id="picture" type="file" />
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="Disabled">
					<Input disabled type="email" placeholder="Email" />
				</ComponentGroupExample>
				<ComponentGroupExample title="With Label">
					<div className="grid w-full items-center gap-3 sm:max-w-sm">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" placeholder="Email" />
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="With Button">
					<div className="flex w-full items-center gap-2 sm:max-w-sm">
						<Input type="email" placeholder="Email" />
						<Button type="submit" variant="outline">
							Subscribe
						</Button>
					</div>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}
