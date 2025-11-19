import {
	BoldIcon,
	BookmarkIcon,
	HeartIcon,
	ItalicIcon,
	StarIcon,
	UnderlineIcon,
} from "lucide-react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export function ToggleGroupPreview() {
	return (
		<ComponentGroup title="Toggle Group" id="toggle-group-component">
			<ComponentGroupPreview>
				<ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
					<ToggleGroupItem
						value="star"
						aria-label="Toggle star"
						className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
					>
						<StarIcon />
						Star
					</ToggleGroupItem>
					<ToggleGroupItem
						value="heart"
						aria-label="Toggle heart"
						className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
					>
						<HeartIcon />
						Heart
					</ToggleGroupItem>
					<ToggleGroupItem
						value="bookmark"
						aria-label="Toggle bookmark"
						className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
					>
						<BookmarkIcon />
						Bookmark
					</ToggleGroupItem>
				</ToggleGroup>
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Outline">
					<ToggleGroup type="multiple" variant="outline">
						<ToggleGroupItem value="bold" aria-label="Toggle bold">
							<BoldIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Toggle italic">
							<ItalicIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="strikethrough"
							aria-label="Toggle strikethrough"
						>
							<UnderlineIcon className="h-4 w-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentGroupExample>
				<ComponentGroupExample title="Single">
					<ToggleGroup type="single">
						<ToggleGroupItem value="bold" aria-label="Toggle bold">
							<BoldIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Toggle italic">
							<ItalicIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="strikethrough"
							aria-label="Toggle strikethrough"
						>
							<UnderlineIcon className="h-4 w-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentGroupExample>
				<ComponentGroupExample title="Small">
					<ToggleGroup type="single" size="sm">
						<ToggleGroupItem value="bold" aria-label="Toggle bold">
							<BoldIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Toggle italic">
							<ItalicIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="strikethrough"
							aria-label="Toggle strikethrough"
						>
							<UnderlineIcon className="h-4 w-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentGroupExample>
				<ComponentGroupExample title="Large">
					<ToggleGroup type="multiple" size="lg">
						<ToggleGroupItem value="bold" aria-label="Toggle bold">
							<BoldIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Toggle italic">
							<ItalicIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="strikethrough"
							aria-label="Toggle strikethrough"
						>
							<UnderlineIcon className="h-4 w-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentGroupExample>
				<ComponentGroupExample title="Disabled">
					<ToggleGroup type="multiple" disabled>
						<ToggleGroupItem value="bold" aria-label="Toggle bold">
							<BoldIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Toggle italic">
							<ItalicIcon className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="strikethrough"
							aria-label="Toggle strikethrough"
						>
							<UnderlineIcon className="h-4 w-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentGroupExample>
				<ComponentGroupExample title="Spacing">
					<ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
						<ToggleGroupItem
							value="star"
							aria-label="Toggle star"
							className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
						>
							<StarIcon />
							Star
						</ToggleGroupItem>
						<ToggleGroupItem
							value="heart"
							aria-label="Toggle heart"
							className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
						>
							<HeartIcon />
							Heart
						</ToggleGroupItem>
						<ToggleGroupItem
							value="bookmark"
							aria-label="Toggle bookmark"
							className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
						>
							<BookmarkIcon />
							Bookmark
						</ToggleGroupItem>
					</ToggleGroup>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}
