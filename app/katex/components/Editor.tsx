import React from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Card, CardContent } from "@/components/ui/card";

interface EditorProps {
	latex: string;
	setLatex: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ latex, setLatex }) => {
	return (
		<Card className='h-full'>
			<CardContent>
				<ReactQuill
					value={latex}
					onChange={setLatex}
					modules={{
						toolbar: [
							["bold", "italic", "underline", "strike"],
							[{ script: "sub" }, { script: "super" }],
							["code"],
						],
					}}
					formats={["bold", "italic", "underline", "strike", "script", "code"]}
					className='h-full'
				/>
			</CardContent>
		</Card>
	);
};

export default Editor;
