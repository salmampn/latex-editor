// pages/Katex.tsx
"use client";

import React, { useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Katex: React.FC = () => {
	const [latex, setLatex] = useState("\\textbf{Hello, LaTeX!}");

	return (
		<div className='flex flex-col '>
			{/* Header */}
			<header className='flex justify-between items-center p-4'>
				<h1 className='text-2xl font-bold'>LaTeX Editor using KaTex</h1>
			</header>

			{/* Main Content */}
			<div className='flex-grow flex justify-between gap-4 p-4'>
				{/* Editor */}
				<Card className='w-1/2 border-r border-gray-300'>
					<CardHeader>
						<CardTitle>Editor</CardTitle>
					</CardHeader>
					<Editor
						latex={latex}
						setLatex={setLatex}
					/>
				</Card>

				{/* Preview */}
				<Card className='w-1/2'>
					<CardHeader>
						<CardTitle>Preview</CardTitle>
					</CardHeader>
					<Preview latex={latex} />
				</Card>
			</div>
		</div>
	);
};

export default Katex;
