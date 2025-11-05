import { createRouter } from "@tanstack/react-router";
import { DefaultNotFoundComponent } from "~/components/default-not-found-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultNotFoundComponent: DefaultNotFoundComponent,
	});

	return router;
}
