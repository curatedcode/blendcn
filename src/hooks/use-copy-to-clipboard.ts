import * as React from "react";

export function useCopyToClipboard() {
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
