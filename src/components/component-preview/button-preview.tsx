import { ChevronRightIcon, GitBranchIcon, Loader2Icon } from "lucide-react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Button } from "~/components/ui/button";

export function ButtonPreview() {
	return (
		<ComponentAccordionGroup title="Button">
			<ComponentAccordionSubGroup title="Default">
				<Button className="w-44">Button</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Secondary">
				<Button variant={"secondary"} className="w-44">
					Button
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Destructive">
				<Button variant={"destructive"} className="w-44">
					Button
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Outline">
				<Button variant={"outline"} className="w-44">
					Button
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Ghost">
				<Button variant={"ghost"} className="w-44">
					Button
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Link">
				<Button variant={"link"} className="w-44">
					Button
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Icon">
				<div className="flex w-44 justify-center">
					<Button variant={"secondary"} size={"icon"} className="size-8">
						<ChevronRightIcon />
					</Button>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Icon">
				<Button variant={"outline"} className="w-44">
					<GitBranchIcon /> New Branch
				</Button>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Loading">
				<Button disabled className="w-44">
					<Loader2Icon className="animate-spin" />
					Please wait
				</Button>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
