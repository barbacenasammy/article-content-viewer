export default function Features() {
	return (
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
	);
}
