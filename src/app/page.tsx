import ArticlesSection, {
	PaginatedResponse,
} from "./components/ArticlesSection";
import Features from "./components/Features";
import Hero from "./components/Hero";

async function getArticles(): Promise<PaginatedResponse> {
	try {
		const PageSizePerQuery = 10;
		// Replace with your Apps Script web app URL
		const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL;

		const response = await fetch(
			`${APPS_SCRIPT_URL}?action=getPaginated&page=1&pageSize=${PageSizePerQuery}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch articles");
		}

		const data = await response.json();
		console.log("data: ", data);
		return data;
	} catch (error) {
		console.error("Error fetching articles:", error);
		return { data: [], page: 1, pageSize: 1, totalItems: 0, totalPages: 0 };
	}
}

export default async function Home() {
	const articles = await getArticles();

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<Hero />
			<ArticlesSection
				data={articles.data}
				page={articles.page}
				pageSize={articles.pageSize}
				totalItems={articles.totalItems}
				totalPages={articles.totalPages}
			/>
			<Features />
		</main>
	);
}
