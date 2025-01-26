"use client";

import React, { useState } from "react";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";

export default function LatexEditorPage() {
	const [latex, setLatex] = useState("");
	const [isCompiling, setIsCompiling] = useState(false);

	const compileLatex = async () => {
		setIsCompiling(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 100));
		} catch (error) {
			console.error("Compilation error:", error);
		} finally {
			setIsCompiling(false);
		}
	};

	return (
		<div className='w-full h-screen flex flex-col p-4'>
			<div className='flex-1 grid grid-cols-2 gap-4'>
				<Editor
					latex={latex}
					setLatex={setLatex}
					onCompile={compileLatex}
					isCompiling={isCompiling}
				/>
				<Preview latex={latex} />
			</div>
		</div>
	);
}
