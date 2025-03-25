"use client";

import { useState } from "react";
import ArticleCard from "./ArticleCard";

interface Article {
	title: string;
	slug: string;
}

export interface PaginatedResponse {
	page: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	data: Article[];
}

interface ArticlesSectionProps {
	initialArticles: Article[];
}

export default function ArticlesSection({
	data,
	page: initialPage,
	pageSize: initialPageSize,
	totalItems: initialTotalItems,
	totalPages: initialTotalPages,
}: PaginatedResponse) {
	const [articles, setArticles] = useState<Article[]>(data);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(initialTotalPages);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMoreArticles = async () => {
		if (isLoading || currentPage >= totalPages) return;

		setIsLoading(true);
		try {
			const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL;
			const nextPage = currentPage + 1;
			const response = await fetch(
				`${APPS_SCRIPT_URL}?action=getPaginated&page=${nextPage}&pageSize=${initialPageSize}`
			);

			if (!response.ok) throw new Error("Failed to fetch more articles");

			const data: PaginatedResponse = await response.json();
			setArticles((prev) => [...prev, ...data.data]);
			setTotalPages(data.totalPages);
			setCurrentPage(nextPage);
		} catch (error) {
			console.error("Error fetching more articles:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="py-16 px-4">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
					Available Articles
				</h2>
				<div className="grid gap-6">
					{articles.map((article) => (
						<ArticleCard
							key={article.slug}
							title={article.title}
							slug={article.slug}
						/>
					))}
				</div>
				{currentPage < totalPages && (
					<div className="text-center mt-8">
						<button
							onClick={fetchMoreArticles}
							disabled={isLoading}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
							{isLoading ? "Loading..." : "See More"}
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
