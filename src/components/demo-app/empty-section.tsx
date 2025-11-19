import { IconCloud } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "~/components/ui/empty";
import { cn } from "~/lib/utils";

export function EmptySection({ className }: { className?: string }) {
	return (
		<Empty className={cn("max-h-[500px] border shadow-sm", className)}>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconCloud className="size-8 text-primary" />
				</EmptyMedia>
				<EmptyTitle>Cloud Storage Empty</EmptyTitle>
				<EmptyDescription>
					Upload files to your cloud storage to access them anywhere.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant={"secondary"}>Upload Files</Button>
			</EmptyContent>
		</Empty>
	);
}
