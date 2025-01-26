"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Copy } from "lucide-react";

// const initialLatex = `\\documentclass{article}
// \\begin{document}
// \\section{Welcome to the LaTeX Editor}
// Type your LaTeX code here. The preview will update when you click "Compile".

// \\subsection{Example Math}
// $E = mc^2$

// \\end{document}`;

import { jsPDF } from "jspdf";

const Editor = ({ latex, setLatex, onCompile, isCompiling }) => {
	const exportToPDF = () => {
		const doc = new jsPDF();
		const content = document.querySelector(".latex-preview");
		doc.html(content, {
			callback: function (pdf) {
				pdf.save("latex-document.pdf");
			},
			x: 10,
			y: 10,
		});
	};
	const downloadLatex = () => {
		const blob = new Blob([latex], { type: "text/plain" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "document.tex";
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const copyLatex = () => {
		navigator.clipboard.writeText(latex);
	};

	return (
		<div className='flex flex-col h-full'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl font-bold'>LaTeX Editor</h1>
				<div className='space-x-2'>
					<Button
						onClick={onCompile}
						disabled={isCompiling}
						className='bg-blue-600 hover:bg-blue-700'
					>
						<RefreshCw
							className={`w-4 h-4 mr-2 ${isCompiling ? "animate-spin" : ""}`}
						/>
						Compile
					</Button>
					<Button
						onClick={exportToPDF}
						variant='outline'
					>
						<Download className='w-4 h-4 mr-2' />
						Export PDF
					</Button>
					<Button
						onClick={copyLatex}
						variant='outline'
					>
						<Copy className='w-4 h-4 mr-2' />
						Copy
					</Button>
				</div>
			</div>
			<Card className='flex-1 p-4'>
				<textarea
					value={latex}
					onChange={(e) => setLatex(e.target.value)}
					className='w-full h-full resize-none font-mono text-sm p-2 focus:outline-none'
					spellCheck='false'
				/>
			</Card>
		</div>
	);
};

export { Editor };
