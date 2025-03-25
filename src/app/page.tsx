"use client";

import { useEffect, useState } from "react";
import Article from "../components/Article";
import { articles } from "../constants/articles";

export default function Home() {
	const [content, setContent] = useState("");
	const [mounted, setMounted] = useState(false);
	const [isEditorOpen, setIsEditorOpen] = useState(false);

	useEffect(() => {
		setContent(articles[0]);
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="max-w-4xl mx-auto p-4">
				{content && (
					<div className="transform transition-all duration-300 ease-in-out">
						<Article content={content} />
					</div>
				)}
			</div>

			{/* Floating Editor Widget */}
			<div className="fixed bottom-6 right-6 z-50">
				{/* Editor Button */}
				<button
					onClick={() => setIsEditorOpen(!isEditorOpen)}
					className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					aria-label={isEditorOpen ? "Close editor" : "Open editor"}>
					{isEditorOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					)}
				</button>

				{/* Editor Panel */}
				<div
					className={`fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-xl transition-all duration-300 ease-in-out transform ${
						isEditorOpen
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4 pointer-events-none"
					}`}>
					<div className="p-6">
						<h2 className="text-xl font-bold text-gray-900 mb-4">
							Article Editor
						</h2>
						<div className="relative">
							<textarea
								className="w-full h-48 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
								placeholder="Paste your article HTML here..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
							<div className="text-sm text-gray-500 mt-2">
								{content.length > 0 ? "Article loaded" : "Paste your article"}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
