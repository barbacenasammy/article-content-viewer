"use client";
import { useState, type FC } from "react";

interface pageProps {}

const JsonFormatter: FC<pageProps> = () => {
	const [raw, setRaw] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	return (
		<div className="w-full h-screen flex flex-col  items-center">
			<div className="w-full max-w-3xl h-full  p-5 flex flex-col items-center gap-5">
				<input
					value={raw}
					onChange={(e) => {
						const { value = "" } = e.target;
						setRaw(value);
						setOutput(JSON.stringify(value));
					}}
					className="w-full focus:outline-none border border-gray-400 py-2 rounded-md px-5"
				/>
				<div className="border border-gray-500 w-full min-h-[calc(100%-200px)] rounded-md relative">
					{output}
					<img
						onClick={() => navigator.clipboard.writeText(output)}
						src="/copy.png"
						width={16}
						height={16}
						className="absolute top-2 right-2 text-gray-800 hover:scale-110 duration-200 hover:text-green-400"
					/>
				</div>
			</div>
		</div>
	);
};
export default JsonFormatter;
