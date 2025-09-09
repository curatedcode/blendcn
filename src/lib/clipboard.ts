import { canUseDOM } from "~/hooks/can-use-dom";

export async function copyToClipboard(text: string) {
	if (!canUseDOM) {
		return;
	}
	try {
		await navigator.clipboard.writeText(text);
	} catch (_error) {
		console.error("Copying text is only allowed in a secure context");
	}
}
