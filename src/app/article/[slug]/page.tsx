import { Metadata } from "next";
import ArticlePage from "./ArticlePage";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

function cleanSlugForTitle(slug: string): string {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const resolvedParams = await params;
	const title = cleanSlugForTitle(resolvedParams.slug);

	return {
		title: `${title} | Article Viewer`,
		description: `Read our article about ${title}`,
		openGraph: {
			title: `${title} | Article Viewer`,
			description: `Read our article about ${title}`,
			type: "article",
		},
	};
}

async function getArticleContent(slug: string) {
	try {
		// Replace with your Apps Script web app URL
		const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL;

		const response = await fetch(
			`${APPS_SCRIPT_URL}?action=getBySlug&slug=${encodeURIComponent(slug)}`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch article");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching article:", error);
		// Fallback to static content if the fetch fails
		const { articles } = await import("../../../constants/articles");
		return { content: articles[0], title: cleanSlugForTitle(slug) };
	}
}

export default async function Page({ params }: PageProps) {
	const resolvedParams = await params;
	const articleData = await getArticleContent(resolvedParams.slug);

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
			<ArticlePage article={articleData.content} />
		</div>
	);
}
