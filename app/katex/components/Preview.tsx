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
			// Replace newlines (\n) with LaTeX line breaks (\\)
			const processedLatex = latex.replace(/\n/g, " \\\\ ");
			return {
				__html: katex.renderToString(processedLatex, {
					throwOnError: false,
					displayMode: true,
				}),
			};
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

			const pageWidth = doc.internal.pageSize.getWidth();
			const pageHeight = doc.internal.pageSize.getHeight();
			const margin = 20;
			const maxWidth = pageWidth - 2 * margin;

			// Add Header
			doc.setFont("Helvetica", "bold");
			doc.setFontSize(14);
			doc.text("My LaTeX Editor using KaTex", margin, 15); // Title
			doc.line(margin, 17, pageWidth - margin, 17); // Horizontal line

			// Add LaTeX Content
			doc.setFont("Courier", "normal");
			doc.setFontSize(12);
			const splitContent = doc.splitTextToSize(latex, maxWidth);

			let cursorY = 30;
			splitContent.forEach((line: string) => {
				if (cursorY + 10 > pageHeight - margin) {
					// Footer
					doc.setFont("Helvetica", "italic");
					doc.setFontSize(10);
					doc.text(
						"Page " + doc.getNumberOfPages(),
						pageWidth - margin - 30,
						pageHeight - 10
					);

					doc.addPage();
					cursorY = margin;
				}
				doc.text(line, margin, cursorY);
				cursorY += 10;
			});

			// Footer for the last page
			doc.setFont("Helvetica", "italic");
			doc.setFontSize(10);
			doc.text(
				"Page " + doc.getNumberOfPages(),
				pageWidth - margin - 30,
				pageHeight - 10
			);

			doc.save("styled-latex-document.pdf");
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
				className='mt-2 self-end'
			>
				Export as PDF
			</Button>
		</div>
	);
};

export default Preview;
