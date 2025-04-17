"use client";
import { useEffect, useState, type FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const [input, setInput] = useState<string | number>("");
	const [content, setContent] = useState<string | number>("");
	const [output, setOutput] = useState("");
	const [replaceAll, setReplaceAll] = useState<boolean>(false);
	const [showRemark, setShowRemark] = useState(false);
	const [remark, setRemark] = useState("");
	//const regex101 = /<svg\b[^>]*>([\s\S]*?)<\/svg>/gi;
	const clean_up_data = /data-block-id="[^"]*"|data-pm-slice="[^"]*"/g;
	const handleChangeRegex = (regex: string, allOrNot?: string) => {
		setInput(regex);
		if (!allOrNot) {
			setRemark("default: " + Date.now().toString());
			setShowRemark(true);
			setOutput(content.toString().replace(clean_up_data, ""));
			console.log(
				"default current value: ",
				content.toString().replace(clean_up_data, "")
			);
			return;
		}
		if (allOrNot === "true") {
			setRemark("Replace All: " + Date.now().toString());
			setShowRemark(true);
			setOutput(content.toString().replaceAll(clean_up_data, ""));
			console.log(
				"Replace All current value: ",
				content.toString().replaceAll(clean_up_data, "")
			);
			return;
		}
		setRemark("Replace Globally: " + Date.now().toLocaleString());
		setShowRemark(true);
		setOutput(content.toString().replace(clean_up_data, ""));
		console.log(
			"Replace Globally current value: ",
			content.toString().replace(clean_up_data, "")
		);
		return;
	};

	useEffect(() => {
		if (showRemark) {
			setTimeout(() => {
				setShowRemark(false);
			}, 5000);
		}
	}, [showRemark]);

	return (
		<div className="w-full flex flex-row p-5 gap-5">
			<div className="flex flex-col gap-2 min-w-[500px]">
				<div className="flex flex-row gap-1">
					<input
						type="checkbox"
						value={replaceAll.toString()}
						onChange={() => {
							const value = (!replaceAll).toString();
							console.log(value);
							setReplaceAll(!replaceAll);
							handleChangeRegex(input.toString(), value);
						}}
					/>
					Replace All
				</div>
				<input
					onChange={(e) => handleChangeRegex(e.target.value)}
					placeholder="Paste your regex here"
					className="focus:outline-none py-2 w-full max-w-[500px] border px-2"
				/>
				<textarea
					onChange={(e) => {
						setContent(e.target.value);
						handleChangeRegex(input.toString());
					}}
					placeholder="Paste your data here"
					rows={5}
					className="focus:outline-none py-2 w-full max-w-[500px] border px-2"
				/>
				{showRemark && <p>Remarks: {remark}</p>}
			</div>
			Output:
			<div className=" border-2 p-5 rounded-lg w-full relative">
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
	);
};
export default page;
