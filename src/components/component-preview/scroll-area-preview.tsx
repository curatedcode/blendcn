import { Image } from "@unpic/react";
import * as React from "react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

export function ScrollAreaPreview() {
	return (
		<ComponentGroup title="Scroll Area" id="scroll-area-component">
			<ComponentGroupPreview>
				<ScrollArea className="h-72 w-48 rounded-md border">
					<div className="p-4">
						<h4 className="mb-4 font-medium text-sm leading-none">Tags</h4>
						{tags.map((tag) => (
							<React.Fragment key={tag}>
								<div className="text-sm">{tag}</div>
								<Separator className="my-2" />
							</React.Fragment>
						))}
					</div>
				</ScrollArea>
			</ComponentGroupPreview>
			<ComponentGroupExamples className="block">
				<ComponentGroupExample title="Horizontal Scrolling">
					<ScrollArea className="w-full max-w-96 whitespace-nowrap rounded-md border">
						<div className="flex w-max space-x-4 p-4">
							{works.map((artwork) => (
								<figure key={artwork.artist} className="shrink-0">
									<div className="overflow-hidden rounded-md">
										<Image
											src={artwork.art}
											alt={`Photo by ${artwork.artist}`}
											className="aspect-[3/4] h-fit w-fit object-cover"
											width={300}
											height={400}
										/>
									</div>
									<figcaption className="pt-2 text-muted-foreground text-xs">
										Photo by{" "}
										<span className="font-semibold text-foreground">
											{artwork.artist}
										</span>
									</figcaption>
								</figure>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}

const tags = Array.from({ length: 50 }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const works: {
	artist: string;
	art: string;
}[] = [
	{
		artist: "Ornella Binni",
		art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
	},
	{
		artist: "Tom Byrom",
		art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
	},
	{
		artist: "Vladimir Malyavko",
		art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
	},
];
