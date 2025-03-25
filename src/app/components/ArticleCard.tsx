import Link from "next/link";

interface ArticleCardProps {
	title: string;
	slug: string;
}

export default function ArticleCard({ title, slug }: ArticleCardProps) {
	return (
		<Link
			href={`/article/${slug}`}
			className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
		</Link>
	);
}
