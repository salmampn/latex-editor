"use client";

import React, { useState } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

const Katex: React.FC = () => {
	const [latex, setLatex] = useState("");

	return (
		<div className='flex flex-col'>
			{/* Header */}
			<header className='flex justify-between items-center p-4 shadow'>
				<h1 className='text-2xl font-bold'>LaTeX Editor using KaTex</h1>
			</header>

			{/* Main Content */}
			<div className='flex-grow flex'>
				{/* Editor */}
				<div className='w-1/2 border-r border-gray-300'>
					<Editor
						latex={latex}
						setLatex={setLatex}
					/>
				</div>

				{/* Preview */}
				<div className='w-1/2'>
					<Preview latex={latex} />
				</div>
			</div>
		</div>
	);
};

export default Katex;
