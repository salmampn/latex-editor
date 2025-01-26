import React from "react";
import "katex/dist/katex.min.css";
import katex from "katex";

interface PreviewProps {
	latex: string;
}

const Preview: React.FC<PreviewProps> = ({ latex }) => {
	const renderLatex = () => {
		try {
			const plainText = latex.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
			return {
				__html: katex.renderToString(plainText, { throwOnError: false }),
			};
		} catch (error) {
			const errorMessage = (error as Error).message;
			return {
				__html: `<span class='text-red-500'>Error: ${errorMessage}</span>`,
			};
		}
	};

	return (
		<div
			className='p-4 prose max-w-none'
			dangerouslySetInnerHTML={renderLatex()}
		/>
	);
};

export default Preview;
