"use client";
import { useState, type FC } from "react";

interface pageProps {}

const SpeechPage: FC<pageProps> = ({}) => {
	const [text, setText] = useState<string>("");
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

	const handleSpeech = () => {
		const utterance = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(utterance);
		setIsSpeaking(true);
		utterance.onend = () => {
			setIsSpeaking(false);
		};
		setText("");
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-5 p-5">
			<h1>Talk to me</h1>
			<textarea
				className="w-full max-w-md h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Enter text to convert to speech"
			/>
			<button onClick={handleSpeech}>
				<svg
					className={`w-6 h-6 text-gray-800  hover:text-green-400 ${
						isSpeaking ? "animate-pulse" : "animate-none"
					} `}
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					viewBox="0 0 24 24">
					<path
						fill-rule="evenodd"
						d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z"
						clip-rule="evenodd"
					/>
					<path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z" />
				</svg>
			</button>
		</div>
	);
};
export default SpeechPage;
