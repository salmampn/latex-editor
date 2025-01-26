import React from "react";
import "katex/dist/katex.min.css";
import katex from "katex";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";

interface PreviewProps {
	latex: string;
}

const Preview: React.FC<PreviewProps> = ({ latex }) => {
	const renderLatex = () => {
		try {
			return { __html: katex.renderToString(latex, { throwOnError: false }) };
		} catch (error) {
			return {
				__html: `<span class='text-red-500'>Error: ${
					(error as Error).message
				}</span>`,
			};
		}
	};

	const exportToPDF = () => {
		try {
			const doc = new jsPDF();

			// Add Title
			doc.setFont("Helvetica", "bold");
			doc.setFontSize(16);
			doc.text("LaTeX Document", 20, 20);

			// Add LaTeX Content
			doc.setFont("Courier", "normal");
			doc.setFontSize(12);

			const pageWidth = doc.internal.pageSize.getWidth();
			const margin = 20;
			const maxWidth = pageWidth - 2 * margin;

			const splitContent = doc.splitTextToSize(latex, maxWidth);

			let cursorY = 30;
			splitContent.forEach((line: string) => {
				if (cursorY + 10 > doc.internal.pageSize.getHeight() - margin) {
					doc.addPage();
					cursorY = margin;
				}
				doc.text(line, margin, cursorY);
				cursorY += 10;
			});

			// Save the PDF
			doc.save("latex-document.pdf");
		} catch (error) {
			console.error("Error exporting to PDF:", error);
		}
	};

	return (
		<div className='flex flex-col h-full'>
			<div
				className='p-4 prose max-w-none bg-gray-100 h-full overflow-y-auto'
				dangerouslySetInnerHTML={renderLatex()}
			/>
			<Button
				onClick={exportToPDF}
				className='mt-2'
			>
				Export as PDF
			</Button>
		</div>
	);
};

export default Preview;
