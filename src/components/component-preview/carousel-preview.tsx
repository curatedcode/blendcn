/** biome-ignore-all lint/suspicious/noArrayIndexKey: order never changes */
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";

export function CarouselPreview() {
	return (
		<ComponentGroup title="Carousel" id="carousel-component">
			<ComponentGroupPreview className="px-13">
				<Carousel className="w-full max-w-sm">
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index}>
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<span className="font-semibold text-4xl">
												{index + 1}
											</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</ComponentGroupPreview>
			<ComponentGroupExamples className="flex flex-col">
				<ComponentGroupExample title="Sizes" className="px-13">
					<Carousel
						opts={{
							align: "start",
						}}
						className="w-full max-w-sm"
					>
						<CarouselContent>
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem
									key={index}
									className="basis-[90%] md:basis-1/2 lg:basis-1/3"
								>
									<div className="p-1">
										<Card>
											<CardContent className="flex aspect-square items-center justify-center p-6">
												<span className="font-semibold text-3xl">
													{index + 1}
												</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</ComponentGroupExample>
				<ComponentGroupExample title="Spacing" className="px-13">
					<Carousel className="w-full max-w-sm">
						<CarouselContent className="-ml-1">
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem
									key={index}
									className="basis-[90%] pl-1 md:basis-1/2 lg:basis-1/3"
								>
									<div className="p-1">
										<Card>
											<CardContent className="flex aspect-square items-center justify-center p-6">
												<span className="font-semibold text-2xl">
													{index + 1}
												</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</ComponentGroupExample>
				<ComponentGroupExample title="Orientation" className="py-16">
					<Carousel
						opts={{
							align: "start",
						}}
						orientation="vertical"
						className="w-full max-w-sm"
					>
						<CarouselContent className="-mt-1 h-[150px]">
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem key={index} className="pt-1 md:basis-1/2">
									<div className="p-1">
										<Card>
											<CardContent className="flex items-center justify-center p-6">
												<span className="font-semibold text-3xl">
													{index + 1}
												</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}
