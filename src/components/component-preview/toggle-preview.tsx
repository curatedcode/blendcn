import { BookmarkIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Toggle } from "~/components/ui/toggle";

export function TogglePreview() {
	return (
		<ComponentGroup title="Toggle" id="toggle-component">
			<ComponentGroupPreview>
				<Toggle
					aria-label="Toggle bookmark"
					size="sm"
					variant="outline"
					className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
				>
					<BookmarkIcon />
					Bookmark
				</Toggle>
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Outline">
					<Toggle variant="outline" aria-label="Toggle italic">
						<ItalicIcon />
					</Toggle>
				</ComponentGroupExample>
				<ComponentGroupExample title="With Text">
					<Toggle aria-label="Toggle italic">
						<ItalicIcon />
						ItalicIcon
					</Toggle>
				</ComponentGroupExample>
				<ComponentGroupExample title="Small">
					<Toggle size="sm" aria-label="Toggle italic">
						<ItalicIcon />
					</Toggle>
				</ComponentGroupExample>
				<ComponentGroupExample title="Large">
					<Toggle size="lg" aria-label="Toggle italic">
						<ItalicIcon />
					</Toggle>
				</ComponentGroupExample>
				<ComponentGroupExample title="Disabled">
					<Toggle aria-label="Toggle italic" disabled>
						<UnderlineIcon className="h-4 w-4" />
					</Toggle>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}
