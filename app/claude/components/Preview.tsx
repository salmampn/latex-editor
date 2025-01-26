"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import katex from "katex";
import "katex/dist/katex.min.css";

const Preview = ({ latex }) => {
	const previewRef = useRef(null);

	useEffect(() => {
		if (previewRef.current) {
			try {
				// Split content by \begin{document} to handle multiple pages
				const pages = latex.split("\\begin{document}").slice(1);

				const processedContent = pages
					.map((page) => {
						const cleanPage = page
							.replace(/\\end{document}/g, "")
							.replace(
								/\\section{([^}]*)}/g,
								'<h1 class="text-3xl font-bold my-4">$1</h1>'
							)
							.replace(
								/\\subsection{([^}]*)}/g,
								'<h2 class="text-2xl font-semibold my-3">$1</h2>'
							)
							.replace(/\$(.*?)\$/g, '<span class="math-inline">$1</span>')
							.replace(/\\\[(.*?)\\\]/g, '<div class="math-display">$1</div>');

						return `<div class="page my-8">${cleanPage}</div>`;
					})
					.join("");

				previewRef.current.innerHTML = processedContent;

				// Render math expressions
				const mathElements = previewRef.current.querySelectorAll(
					".math-inline, .math-display"
				);
				mathElements.forEach((element) => {
					katex.render(element.textContent || "", element, {
						throwOnError: false,
						displayMode: element.classList.contains("math-display"),
					});
				});
			} catch (error) {
				console.error("KaTeX rendering error:", error);
			}
		}
	}, [latex]);

	return (
		<div className='flex flex-col h-full'>
			<h2 className='text-2xl font-bold mb-4'>Preview</h2>
			<Card className='flex-1 p-4 overflow-auto'>
				<div
					ref={previewRef}
					className='latex-preview prose max-w-none'
				/>
			</Card>
		</div>
	);
};

export { Preview };
