import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonPreview() {
	return (
		<ComponentAccordionGroup title="Skeleton">
			<ComponentAccordionSubGroup title="Card">
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-[125px] w-[250px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
