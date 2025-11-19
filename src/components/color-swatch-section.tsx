import { useColorContext } from "~/components/color-context";
import { CustomSwatch } from "~/components/custom-swatch";

export function ColorSwatchSection() {
	const { result } = useColorContext();

	return (
		<div className="grid w-full grid-cols-2 md:w-fit md:grid-cols-12">
			<CustomSwatch
				scale={"primary"}
				step={"1"}
				cssVariable={"var(--primary-1)"}
				solidColor={result.accentScale[0]}
				alphaColor={result.accentScaleAlpha[0]}
				className="md:rounded-tl-md"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"1"}
				cssVariable={"var(--gray-1)"}
				solidColor={result.grayScale[0]}
				alphaColor={result.grayScaleAlpha[0]}
				className="md:col-start-1 md:row-start-2 md:rounded-bl-md"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"2"}
				cssVariable={"var(--primary-2)"}
				solidColor={result.accentScale[1]}
				alphaColor={result.accentScaleAlpha[1]}
				className="md:col-start-2 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"2"}
				cssVariable={"var(--gray-2)"}
				solidColor={result.grayScale[1]}
				alphaColor={result.grayScaleAlpha[1]}
				className="md:col-start-2 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"3"}
				cssVariable={"var(--primary-3)"}
				solidColor={result.accentScale[2]}
				alphaColor={result.accentScaleAlpha[2]}
				className="md:col-start-3 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"3"}
				cssVariable={"var(--gray-3)"}
				solidColor={result.grayScale[2]}
				alphaColor={result.grayScaleAlpha[2]}
				className="md:col-start-3 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"4"}
				cssVariable={"var(--primary-4)"}
				solidColor={result.accentScale[3]}
				alphaColor={result.accentScaleAlpha[3]}
				className="md:col-start-4 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"4"}
				cssVariable={"var(--gray-4)"}
				solidColor={result.grayScale[3]}
				alphaColor={result.grayScaleAlpha[3]}
				className="md:col-start-4 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"5"}
				cssVariable={"var(--primary-5)"}
				solidColor={result.accentScale[4]}
				alphaColor={result.accentScaleAlpha[4]}
				className="md:col-start-5 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"5"}
				cssVariable={"var(--gray-5)"}
				solidColor={result.grayScale[4]}
				alphaColor={result.grayScaleAlpha[4]}
				className="md:col-start-5 md:row-start-2"
			/>

			<CustomSwatch
				scale={"primary"}
				step={"6"}
				cssVariable={"var(--primary-6)"}
				solidColor={result.accentScale[5]}
				alphaColor={result.accentScaleAlpha[5]}
				className="md:col-start-6 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"6"}
				cssVariable={"var(--gray-6)"}
				solidColor={result.grayScale[5]}
				alphaColor={result.grayScaleAlpha[5]}
				className="md:col-start-6 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"7"}
				cssVariable={"var(--primary-7)"}
				solidColor={result.accentScale[6]}
				alphaColor={result.accentScaleAlpha[6]}
				className="md:col-start-7 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"7"}
				cssVariable={"var(--gray-7)"}
				solidColor={result.grayScale[6]}
				alphaColor={result.grayScaleAlpha[6]}
				className="md:col-start-7 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"8"}
				cssVariable={"var(--primary-8)"}
				solidColor={result.accentScale[7]}
				alphaColor={result.accentScaleAlpha[7]}
				className="md:col-start-8 md:row-start-1"
			/>

			<CustomSwatch
				scale={"gray"}
				step={"8"}
				cssVariable={"var(--gray-8)"}
				solidColor={result.grayScale[7]}
				alphaColor={result.grayScaleAlpha[7]}
				className="md:col-start-8 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"9"}
				cssVariable={"var(--primary-9)"}
				solidColor={result.accentScale[8]}
				alphaColor={result.accentScaleAlpha[8]}
				className="md:col-start-9 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"9"}
				cssVariable={"var(--gray-9)"}
				solidColor={result.grayScale[8]}
				alphaColor={result.grayScaleAlpha[8]}
				className="md:col-start-9 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"10"}
				cssVariable={"var(--primary-10)"}
				solidColor={result.accentScale[9]}
				alphaColor={result.accentScaleAlpha[9]}
				className="md:col-start-10 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"10"}
				cssVariable={"var(--gray-10)"}
				solidColor={result.grayScale[9]}
				alphaColor={result.grayScaleAlpha[9]}
				className="md:col-start-10 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"11"}
				cssVariable={"var(--primary-11)"}
				solidColor={result.accentScale[10]}
				alphaColor={result.accentScaleAlpha[10]}
				className="md:col-start-11 md:row-start-1"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"11"}
				cssVariable={"var(--gray-11)"}
				solidColor={result.grayScale[10]}
				alphaColor={result.grayScaleAlpha[10]}
				className="md:col-start-11 md:row-start-2"
			/>
			<CustomSwatch
				scale={"primary"}
				step={"12"}
				cssVariable={"var(--primary-12)"}
				solidColor={result.accentScale[11]}
				alphaColor={result.accentScaleAlpha[11]}
				className="md:col-start-12 md:row-start-1 md:rounded-tr-md"
			/>
			<CustomSwatch
				scale={"gray"}
				step={"12"}
				cssVariable={"var(--gray-12)"}
				solidColor={result.grayScale[11]}
				alphaColor={result.grayScaleAlpha[11]}
				className="md:col-start-12 md:row-start-2 md:rounded-br-md"
			/>
		</div>
	);
}
