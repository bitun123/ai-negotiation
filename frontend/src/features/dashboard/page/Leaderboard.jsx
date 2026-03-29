import React from "react";

function Leaderboard() {
	const students = [
		{ rank: 1, name: "Ayan Sahil", price: 210 },
		{ rank: 2, name: "Sujal Sharma", price: 210 },
		{ rank: 3, name: "Niraj Kumar", price: 210 },
		{ rank: 4, name: "Siddhesh Awasare", price: 210 },
		{ rank: 5, name: "Rajiv Kumar", price: 210 },
		{ rank: 6, name: "Niraj Kumar Verma", price: 210 },
		{ rank: 7, name: "Aadi", price: 210 },
		{ rank: 8, name: "Prerna Sharma", price: 210 },
		{ rank: 9, name: "Mehul Jain", price: 205 },
		{ rank: 10, name: "Riya Das", price: 204 },
		{ rank: 11, name: "Aarav Nair", price: 203 },
		{ rank: 12, name: "Ishika Roy", price: 202 },
		{ rank: 13, name: "Kabir Mehta", price: 201 },
		{ rank: 14, name: "Anaya Bose", price: 200 },
		{ rank: 15, name: "Rohan Sethi", price: 199 },
		{ rank: 16, name: "Arshdeep Singh", price: 194.8 },
		{ rank: 17, name: "Sri Charan", price: 192 },
		{ rank: 18, name: "Sujal Rajput", price: 191.8 },
		{ rank: 19, name: "Meval Purohit", price: 184.9 },
		{ rank: 20, name: "Ritam Maty", price: 168.3 },
	];

	return (
		<main className="min-h-screen bg-slate-950 px-3 py-6 text-slate-100 sm:px-6 sm:py-10">
			<section className="mx-auto w-full max-w-7xl rounded-2xl border border-sky-900/40 bg-slate-900 p-4 shadow-[0_20px_80px_-40px_rgba(2,6,23,0.95)] sm:p-6">
				<h1 className="text-xl font-semibold text-slate-100 sm:text-3xl">Leaderboard - Top 20</h1>

				<div className="mt-4 overflow-x-auto rounded-2xl border border-sky-900/40">
					<div className="min-w-130">
						<div className="grid grid-cols-[120px_1fr_120px] items-center bg-slate-950 px-5 py-4 text-sm font-semibold uppercase tracking-wide text-sky-200/70 sm:text-2xl">
							<span className="text-center">Rank</span>
							<span className="text-center">Name</span>
							<span className="text-center">Price</span>
						</div>

						{students.map((student) => {
							const isTopThree = student.rank <= 3;
							const topThreeRowStyles = {
								1: "border-l-4 border-l-cyan-300 bg-gradient-to-r from-cyan-500/20 to-slate-800/95",
								2: "border-l-4 border-l-sky-300 bg-gradient-to-r from-sky-500/15 to-slate-800/95",
								3: "border-l-4 border-l-blue-300 bg-gradient-to-r from-blue-500/10 to-slate-800/95",
							};

							return (
								<article
									key={student.rank}
									className={`grid grid-cols-[120px_1fr_120px] items-center border-t border-sky-900/30 px-5 py-4 ${
										isTopThree ? topThreeRowStyles[student.rank] : "bg-slate-900"
									}`}
								>
									<div
										className={`text-center text-lg font-semibold sm:text-3xl ${
											isTopThree ? "text-cyan-200" : "text-sky-200/70"
										}`}
									>
										{student.rank}
									</div>

									<div className="min-w-0 text-center">
										<p className="truncate text-base font-semibold text-slate-100 sm:text-3xl">{student.name}</p>
									</div>

									<span
										className={`text-center text-base font-bold sm:text-3xl ${
											isTopThree ? "text-cyan-300" : "text-sky-300"
										}`}
									>
										{student.price}
									</span>
								</article>
							);
						})}
					</div>
				</div>
			</section>
		</main>
	);
}

export default Leaderboard;