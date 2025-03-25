"use client";

import styled from "styled-components";

const ArticleContainer = styled.article`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 400px;
	margin: 2rem 0;
`;

interface ArticleProps {
	content: string;
}

export default function Article({ content }: ArticleProps) {
	const createMarkup = () => {
		// Process the content to handle images with placeholders
		const processedContent = content.replace(
			/<img[^>]*src="([^"]*)"[^>]*>/g,
			(match, src) => {
				return `<div class="relative w-full h-[400px] my-8">
          <img
            src="${src}"
            alt="${src.split("/").pop()?.split(".")[0] || "Article image"}"
            class="object-cover rounded-lg shadow-lg"
            onError="this.onerror=null; this.src='/placeholder.jpg';"
          />
        </div>`;
			}
		);

		return { __html: processedContent };
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="bg-white rounded-xl shadow-xl p-8">
				<div
					className="prose prose-lg max-w-none mx-auto"
					dangerouslySetInnerHTML={createMarkup()}
				/>
				<style>{`
					.prose {
						max-width: 800px;
						margin: 0 auto;
						width: 100%;
					}
					.prose h1 {
						@apply text-4xl font-bold mb-8 text-gray-900 text-center w-full;
						line-height: 1.2;
						display: block;
						text-align: center;
					}
					.prose h2 {
						@apply text-2xl font-semibold mt-12 mb-6 text-gray-800;
						line-height: 1.3;
					}
					.prose p {
						@apply text-gray-700 leading-relaxed mb-6 text-lg;
						line-height: 1.8;
					}
					.prose ul {
						@apply list-disc list-inside mb-8 bg-gray-50 p-6 rounded-lg;
					}
					.prose li {
						@apply text-gray-700 mb-3 text-lg;
					}
					.prose img {
						@apply w-full h-full object-cover rounded-xl shadow-xl;
						transition: transform 0.3s ease;
					}
					.prose img:hover {
						transform: scale(1.02);
					}
					.prose a {
						@apply text-blue-600 hover:text-blue-800 underline transition-colors duration-200;
					}
					.prose strong {
						@apply text-gray-900 font-semibold;
					}
					.prose em {
						@apply text-gray-700 italic;
					}
					.prose blockquote {
						@apply border-l-4 border-blue-500 pl-4 italic text-gray-700 my-8;
					}
				`}</style>
			</div>
		</div>
	);
}
