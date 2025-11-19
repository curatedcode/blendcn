import { ThemeCopyControls } from "~/components/theme-export-dialog";

export function Header() {
	return (
		<div className="flex w-full items-center gap-1.5">
			<h1 className="mx-auto text-center font-semibold text-lg md:mx-0 md:pl-3 md:text-left">
				Components
			</h1>
			<ThemeCopyControls />
		</div>
	);
}
