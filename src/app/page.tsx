import Link from "next/link";

async function getArticles() {
	try {
		// Replace with your Apps Script web app URL
		const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

		const response = await fetch(`${APPS_SCRIPT_URL}?action=getAll`);

		if (!response.ok) {
			throw new Error("Failed to fetch articles");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching articles:", error);
		// Fallback to static content if the fetch fails
		return [{ slug: "sample-article", title: "Sample Article" }];
	}
}

export default async function Home() {
	const articles = await getArticles();

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Hero Section */}
			<section className="py-20 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl font-bold text-gray-900 mb-6">
						Article Viewer
					</h1>
					<p className="text-xl text-gray-600 mb-8">
						A powerful tool for viewing and managing articles with a clean,
						modern interface.
					</p>
				</div>
			</section>

			{/* Articles Section */}
			<section className="py-16 px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						Available Articles
					</h2>
					<div className="grid gap-6">
						{articles.map((article) => (
							<Link
								key={article.slug}
								href={`/article/${article.slug}`}
								className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
								<h3 className="text-xl font-semibold text-gray-900">
									{article.title}
								</h3>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						Features
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-900 mb-3">
								Clean Interface
							</h3>
							<p className="text-gray-600">
								Modern and intuitive design for the best reading experience.
							</p>
						</div>
						<div className="p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-900 mb-3">
								Easy Navigation
							</h3>
							<p className="text-gray-600">
								Simple and efficient way to browse through articles.
							</p>
						</div>
						<div className="p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-900 mb-3">
								Responsive Design
							</h3>
							<p className="text-gray-600">
								Works perfectly on all devices, from desktop to mobile.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
