import { ThemeCopyControls } from "~/components/theme-copy-controls";

export function Header() {
	return (
		<div className="flex w-full items-center gap-1.5 px-3 md:pb-1 md:pl-3">
			<h1 className="flex h-9 items-center font-semibold text-lg">
				Components
			</h1>
			<ThemeCopyControls />
		</div>
	);
}
