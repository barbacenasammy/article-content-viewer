import Link from "next/link";
import { useState } from "react";

interface ArticleCardProps {
	title: string;
	slug: string;
	isLoading?: boolean;
	activeSlug?: string | null;
}

export default function ArticleCard({
	title,
	slug,
	isLoading,
	activeSlug,
}: ArticleCardProps) {
	const [isClicked, setIsClicked] = useState(false);
	const isActive = activeSlug === slug;
	const isDisabled = isLoading && !isActive;

	const handleClick = () => {
		setIsClicked(true);
	};

	return (
		<Link
			href={`/article/${slug}`}
			onClick={handleClick}
			className={`relative block p-6 bg-white rounded-lg shadow-md transition-all duration-300
				${
					isDisabled
						? "opacity-50 cursor-not-allowed pointer-events-none"
						: "hover:shadow-lg cursor-pointer"
				}
				${
					isActive
						? "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-800 before:via-purple-500 before:to-pink-800 before:animate-gradient-x before:-z-10"
						: ""
				}`}>
			<div className="relative bg-white rounded-lg h-[60px] flex items-center justify-between">
				<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
				{isActive && (
					<div className="h-6 w-6 rounded-full border-4 border-blue-600 border-dashed animate-spin" />
				)}
			</div>
		</Link>
	);
}
