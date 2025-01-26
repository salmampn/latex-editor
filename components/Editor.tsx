import React from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface EditorProps {
	latex: string;
	setLatex: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ latex, setLatex }) => {
	return (
		<ReactQuill
			value={latex}
			onChange={setLatex}
			modules={{
				toolbar: [
					["bold", "italic", "underline", "strike"], // Text formatting
					[{ script: "sub" }, { script: "super" }], // Sub/Superscript
					["code"], // Inline code
				],
			}}
			formats={["bold", "italic", "underline", "strike", "script", "code"]}
			className='h-full'
		/>
	);
};

export default Editor;
