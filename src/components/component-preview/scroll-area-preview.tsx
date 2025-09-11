import Image from "next/image";
import * as React from "react";
import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

export function ScrollAreaPreview() {
	return (
		<ComponentAccordionGroup title="Scroll-area">
			<ComponentAccordionSubGroup title="Example">
				<ScrollArea className="h-72 w-48 rounded-md border">
					<div className="p-4">
						<h4 className="mb-4 font-medium text-sm leading-none">Tags</h4>
						{Array.from({ length: 50 })
							.map((_, i, a) => `v1.2.0-beta.${a.length - i}`)
							.map((tag) => (
								<React.Fragment key={tag}>
									<div className="text-sm">{tag}</div>
									<Separator className="my-2" />
								</React.Fragment>
							))}
					</div>
				</ScrollArea>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Horizontal Scrolling">
				<ScrollAreaHorizontalDemo />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

interface Artwork {
	artist: string;
	art: string;
}

const works: Artwork[] = [
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

function ScrollAreaHorizontalDemo() {
	return (
		<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
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
	);
}
