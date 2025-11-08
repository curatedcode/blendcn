import * as React from "react";

export type UseCopyToClipboardParams = {
	/**
	 * Time in ms to delay the isCopied state to off after is has successfully copied.
	 *
	 * Defaults to (0)
	 */
	delay?: number;
};

export function useCopyToClipboard(args: UseCopyToClipboardParams = {}) {
	const [isCopied, setIsCopied] = React.useState(false);

	const copyToClipboard = React.useCallback((value: string) => {
		const handleCopy = async () => {
			try {
				if (navigator?.clipboard?.writeText) {
					await navigator.clipboard.writeText(value);
					setIsCopied(true);
				} else {
					throw new Error("writeText not supported");
				}
			} catch (_) {
				oldSchoolCopy(value);
				console.error("Navigator not available to copy text");
			}
		};

		handleCopy();
	}, []);

	React.useEffect(() => {
		if (!isCopied || !args.delay) return;
		if (args.delay <= 0) {
			setIsCopied(false);
			return;
		}

		const timer = setTimeout(() => setIsCopied(false), args.delay);

		return () => clearTimeout(timer);
	}, [isCopied, args.delay]);

	return { isCopied, copyToClipboard };
}

function oldSchoolCopy(text: string) {
	const tempTextArea = document.createElement("textarea");
	tempTextArea.value = text;
	document.body.appendChild(tempTextArea);
	tempTextArea.select();
	document.execCommand("copy");
	document.body.removeChild(tempTextArea);
}
