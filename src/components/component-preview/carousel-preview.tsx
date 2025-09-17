import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";

const tags = Array.from({ length: 5 }, (_, i) => i + 1);

export function CarouselPreview() {
	return (
		<ComponentAccordionGroup title="Carousel" className="flex-col flex-nowrap">
			<ComponentAccordionSubGroup title="Example">
				<div className="pl-10">
					<Carousel className="w-full max-w-xs">
						<CarouselContent>
							{tags.map((num) => (
								<CarouselItem key={num}>
									<div className="p-1">
										<Card>
											<CardContent className="flex aspect-square items-center justify-center p-6">
												<span className="font-semibold text-4xl">{num}</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Sizes">
				<div className="pl-10">
					<Carousel
						opts={{
							align: "start",
						}}
						className="w-full max-w-sm"
					>
						<CarouselContent>
							{tags.map((num) => (
								<CarouselItem key={num} className="md:basis-1/2 lg:basis-1/3">
									<div className="p-1">
										<Card>
											<CardContent className="flex aspect-square items-center justify-center p-6">
												<span className="font-semibold text-3xl">{num}</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Spacing">
				<div className="pl-10">
					<Carousel className="w-full max-w-sm">
						<CarouselContent className="-ml-1">
							{tags.map((num) => (
								<CarouselItem
									key={num}
									className="pl-1 md:basis-1/2 lg:basis-1/3"
								>
									<div className="p-1">
										<Card>
											<CardContent className="flex aspect-square items-center justify-center p-6">
												<span className="font-semibold text-2xl">{num}</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Orientation" className="mb-6">
				<div className="pt-10">
					<Carousel
						opts={{
							align: "start",
						}}
						orientation="vertical"
						className="w-full max-w-xs"
					>
						<CarouselContent className="-mt-1 h-[200px]">
							{tags.map((num) => (
								<CarouselItem key={num} className="pt-1 md:basis-1/2">
									<div className="p-1">
										<Card>
											<CardContent className="flex items-center justify-center p-6">
												<span className="font-semibold text-3xl">{num}</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}
