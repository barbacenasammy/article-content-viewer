import ArticlePage from "./ArticlePage";

interface PageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

async function getArticleContent() {
	// In a real application, this would be an API call or database query
	// For now, we'll import the article directly
	const { articles } = await import("../../constants/articles");
	return articles[0];
}

export default async function Page({ searchParams }: PageProps) {
	// Fetch article content on the server side
	const articleContent = await getArticleContent();

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
			<ArticlePage article={articleContent} />
		</div>
	);
}
