import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Article Editor",
	description: "Edit and preview your articles",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				data-new-gr-c-s-check-loaded="14.1228.0"
				data-gr-ext-installed=""
				className={`${inter.className} bg-gray-50`}>
				<ClientLayout>
					<main className="min-h-screen">{children}</main>
				</ClientLayout>
			</body>
		</html>
	);
}
