import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
	return (
		<main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16 sm:px-8">
			<section className="relative z-10 mx-auto w-full max-w-xl text-center">
				<div className="mx-auto mb-6 flex w-fit flex-col items-center gap-3 sm:flex-row sm:gap-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						width={512}
						height={512}
						className="not-motion-reduce:slide-in-from-top-8 fade-in-70 sm:fade-in-40 not-motion-reduce:sm:slide-in-from-left-8 not-motion-reduce:sm:slide-in-from-top-0 size-24 animate-in duration-500 ease-in"
						viewBox="0 0 512 512"
					>
						<title>BlendCN Logo</title>
						<defs>
							<symbol id="b" viewBox="0 0 1024 1024">
								<path fill="none" strokeWidth={0} d="M0 0h1024v1024H0z" />
								<path
									fill="#d64545"
									strokeWidth={0}
									d="m620.53 416.73-82.66 82.66c-14.28 14.28-37.44 14.28-51.72 0l-83.86-83.86h.6c-60.43-60.43-60.43-158.41 0-218.84s151.2-60.35 211.98-6.46c66.91 59.32 68.89 163.27 5.66 226.5Z"
								/>
								<path
									fill="#3baf75"
									strokeWidth={0}
									d="M670.26 494.32 555.43 516.2c-19.84 3.78-32.86 22.93-29.08 42.77l22.19 116.5.34-.5c15.99 83.95 97.01 139.04 180.97 123.05 80.84-15.4 134.92-91.1 124.54-171.66-11.44-88.69-96.28-148.78-184.12-132.04Z"
								/>
								<path
									fill="#3f7dff"
									strokeWidth={0}
									d="M350.06 495.12 464.89 517c19.84 3.78 32.86 22.93 29.08 42.77l-22.19 116.5-.34-.5c-15.99 83.95-97.01 139.04-180.97 123.05-80.84-15.4-134.92-91.1-124.54-171.66 11.44-88.69 96.28-148.78 184.12-132.04Z"
								/>
							</symbol>
							<symbol id="a" viewBox="0 0 1024 1024">
								<rect
									width={1024}
									height={1024}
									fill="#231f20"
									strokeWidth={0}
									rx={203.26}
									ry={203.26}
								/>
							</symbol>
						</defs>
						<use
							xlinkHref="#a"
							width={1024}
							height={1024}
							transform="scale(.5)"
						/>
						<use
							xlinkHref="#b"
							width={1024}
							height={1024}
							transform="scale(.5)"
						/>
					</svg>
					<h1 className="font-bold text-xl tracking-wide sm:text-3xl">
						404 - Page not found
					</h1>
				</div>
				<p className="mx-auto mb-8 max-w-prose text-pretty text-base text-muted-foreground">
					The page you’re looking for doesn’t exist or moved.
				</p>
				<Button asChild variant={"link"} className="text-blue-500">
					<Link href="/">Return home</Link>
				</Button>
			</section>
		</main>
	);
}
