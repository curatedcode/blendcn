import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonPreview() {
	return (
		<ComponentGroup title="Skeleton" id="skeleton-component">
			<ComponentGroupPreview>
				<div className="flex items-center space-x-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Card">
					<div className="flex flex-col space-y-3">
						<Skeleton className="h-[125px] w-[250px] rounded-xl" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}
