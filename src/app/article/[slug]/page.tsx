import Article from "../../../components/Article";

interface PageProps {
	params: {
		slug: string;
	};
}

async function getArticleContent(slug: string) {
	try {
		// Replace with your Apps Script web app URL
		const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL;

		const response = await fetch(
			`${APPS_SCRIPT_URL}?slug=${encodeURIComponent(slug)}`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch article");
		}

		const data = await response.json();
		return data.content;
	} catch (error) {
		console.error("Error fetching article:", error);
		// Fallback to static content if the fetch fails
		const { articles } = await import("../../../constants/articles");
		return articles[0];
	}
}

export default async function ArticlePage({ params }: PageProps) {
	const articleContent = await getArticleContent(params.slug);

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="max-w-4xl mx-auto p-4">
				{articleContent && (
					<div className="transform transition-all duration-300 ease-in-out">
						<Article content={articleContent} />
					</div>
				)}
			</div>
		</div>
	);
}
