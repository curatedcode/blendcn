import { useColorContext } from "~/components/color-context";
import { ColorTextField } from "~/components/color-field/color-text-field";
import { Label } from "~/components/ui/label";

export function ColorPickerSection() {
	const {
		accentValue,
		setAccentValue,
		grayValue,
		setGrayValue,
		bgValue,
		setBgValue,
	} = useColorContext();

	return (
		<div className="flex max-w-xl xs:flex-row flex-col gap-3">
			<div className="flex flex-col gap-2">
				<Label htmlFor="accent" className="ml-1">
					Accent
				</Label>
				<ColorTextField
					id="accent"
					value={accentValue}
					onValueChange={setAccentValue}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="gray" className="ml-1">
					Gray
				</Label>
				<ColorTextField
					id="gray"
					value={grayValue}
					onValueChange={setGrayValue}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="background" className="ml-1">
					Background
				</Label>
				<ColorTextField
					id="background"
					value={bgValue}
					onValueChange={setBgValue}
				/>
			</div>
		</div>
	);
}
