import { Link } from "@tanstack/react-router";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";

export function DefaultNotFoundComponent() {
	return (
		<div className="relative flex min-h-screen items-center justify-center px-6 py-16 sm:px-8">
			<section className="relative z-10 mx-auto w-full max-w-xl text-center">
				<div className="mx-auto mb-6 flex w-fit flex-col items-center gap-3 sm:flex-row sm:gap-6">
					<Logo className="fade-in-40 zoom-in-40 spin-in-180 size-24 animate-in duration-500 ease-in motion-reduce:animate-none" />
					<h1 className="font-bold text-xl tracking-wide sm:text-3xl">
						404 - Page not found
					</h1>
				</div>
				<p className="mx-auto mb-8 max-w-prose text-pretty text-base text-muted-foreground">
					The page you’re looking for doesn’t exist or moved.
				</p>
				<Button asChild variant={"link"} className="text-blue-500">
					<Link to="/">Return home</Link>
				</Button>
			</section>
		</div>
	);
}
