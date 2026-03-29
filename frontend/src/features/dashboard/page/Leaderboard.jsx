import React from "react";

function Leaderboard() {
	const leaderboardData = [
		{ rank: 1, name: "PriceSlayer", product: "Chrome Void", price: 4350, listPrice: 8500, score: 49 },
		{ rank: 2, name: "SilverTongue", product: "Chrome Void", price: 4620, listPrice: 8500, score: 46 },
		{ rank: 3, name: "NegotiationKing", product: "Forge Pro X", price: 1720, listPrice: 2800, score: 39 },
		{ rank: 4, name: "CoolHandLuke", product: "Forge Pro X", price: 1810, listPrice: 2800, score: 35 },
		{ rank: 5, name: "ShadowBidder", product: "Apex Chronos", price: 2830, listPrice: 4200, score: 33 },
		{ rank: 6, name: "MindGamer", product: "Apex Chronos", price: 2950, listPrice: 4200, score: 30 },
		{ rank: 7, name: "TheHaggler", product: "Forge Pro X", price: 1970, listPrice: 2800, score: 30 },
		{ rank: 8, name: "DealMaker_X", product: "Apex Chronos", price: 3100, listPrice: 4200, score: 26 },
		{ rank: 9, name: "IronMind_99", product: "Velox GT-R", price: 52400, listPrice: 62000, score: 15 },
		{ rank: 10, name: "TacticFox", product: "Chrome Void", price: 5300, listPrice: 8500, score: 38 },
		{ rank: 11, name: "PulseCloser", product: "Velox GT-R", price: 55800, listPrice: 62000, score: 10 },
		{ rank: 12, name: "EchoBid", product: "Forge Pro X", price: 2050, listPrice: 2800, score: 27 },
	];

	return (
		<main className="min-h-screen bg-[#050814] px-3 py-2 text-slate-100 sm:px-6 ">
			<section className="mx-auto w-full max-w-6xl h-full flex-col gap-6">
				<div className="mb-2 flex items-start justify-between gap-3">
					<div>
						<h1 className=" text-yellow-300 text-2xl ">Leaderboard</h1>
					</div>
					<button
						type="button"
						className="rounded-lg border border-indigo-700/70 bg-indigo-950/50 px-4 py-2 text-sm text-indigo-300 transition hover:border-indigo-500/80 hover:text-indigo-200"
					>
						Home
					</button>
				</div>

				<div className="overflow-auto no-scrollbar rounded-2xl border border-indigo-900/50 bg-[#0c1126]/85 shadow-[0_28px_80px_-35px_rgba(2,6,23,0.9)] ">
					<div className="min-w-245 h-[42rem]">
						<div className="flex items-center border-b border-indigo-900/40 bg-[#0a0f21] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/45 sm:text-sm">
							<span className="w-22.5 shrink-0">Rank</span>
							<span className="min-w-0 flex-[2.1]">Negotiator</span>
							<span className="min-w-0 flex-[1.2]">Product</span>
							<span className="min-w-0 flex-1">Price / List</span>
							<span className="min-w-0 flex-1">Score</span>
						</div>

						{leaderboardData.map((row) => {
							const isTopThree = row.rank <= 3;
							const priceLabel = `$${row.price.toLocaleString()}`;
							const listLabel = `$${row.listPrice.toLocaleString()}`;
							const rankLabel = row.rank <= 3 ? `${row.rank}` : `#${row.rank}`;

							return (
								<article
									key={row.rank}
									className={`flex items-center border-t border-indigo-900/35 px-6 py-4 ${
										isTopThree ? "bg-indigo-950/35" : "bg-[#0c1126]/80"
									}`}
								>
									<div className="w-22.5 shrink-0 text-lg font-bold text-indigo-300 sm:text-2xl">{rankLabel}</div>

									<div className="min-w-0 flex-[2.1]">
										<p className="truncate text-xl font-semibold text-slate-100 sm:text-2xl">{row.name}</p>
										<p className="truncate text-base uppercase tracking-wide text-indigo-400/75 sm:text-lg">{row.product}</p>
									</div>

									<div className="min-w-0 flex-[1.2] truncate text-lg uppercase text-indigo-400/75 sm:text-xl">{row.product}</div>

									<div className="min-w-0 flex-1">
										<p className="text-xl font-bold text-emerald-400 sm:text-2xl">{priceLabel}</p>
										<p className="truncate text-lg text-indigo-300/35 sm:text-xl">/ {listLabel}</p>
									</div>

									<div className="min-w-0 flex-1">
										<p className="text-xl font-bold text-emerald-400 sm:text-2xl">-{row.score}%</p>
										<div className="mt-2 h-1.5 w-full rounded-full bg-indigo-900/55">
											<div className="h-full rounded-full bg-emerald-400" style={{ width: `${row.score}%` }} />
										</div>
									</div>
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