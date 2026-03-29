import React from "react";
import Navbar from "../component/Navbar";
import Leaderboard from "./Leaderboard";

function GameDashboard() {
	const messages = [
		{
			id: 1,
			side: "left",
			text: "You're looking at the APEX CHRONOS - listed at $4,200. This is a premium item. What's your opening offer?",
		},
	];



	return (
		<main className="w-full min-h-screen bg-[#060916] p-2 text-slate-100 sm:px-4 sm:py-4">
			<Navbar />
			<section className="w-full flex lg:flex-row flex-col p-4 justify-around">
                <div className="w-full lg:w-[60%] flex flex-col gap-4 ">

				<div className="rounded-2xl border border-indigo-900/40 bg-[#0b0f22] p-3 shadow-[0_20px_80px_-45px_rgba(2,6,23,0.9)] sm:p-4">
					<div className="space-y-3 sm:space-y-4">
						{messages.map((message) => {
							const isLeft = message.side === "left";

							return (
								<div
									key={message.id}
									className={`flex items-end gap-2 ${isLeft ? "justify-start" : "justify-end"}`}
								>
									{isLeft ? (
										<span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo-700/60 bg-indigo-900/50 text-[10px] text-yellow-300">
											AI
										</span>
									) : null}

									<div
										className={`max-w-[90%] rounded-xl border px-4 py-3 text-lg leading-relaxed sm:max-w-[84%] sm:text-2xl ${
											isLeft
												? "border-indigo-800/45 bg-[#090d1f] text-slate-100"
												: "border-yellow-500/35 bg-[#241f15] text-slate-100"
										}`}
									>
										{message.text}
									</div>

									{!isLeft ? (
										<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo-700/60 bg-indigo-900/50 text-[10px]">
											You
										</span>
									) : null}
								</div>
							);
						})}

						<div className="mx-auto w-full rounded-lg border border-sky-700/45 bg-sky-900/20 px-3 py-3 text-center text-base font-medium text-sky-300 sm:max-w-[94%] sm:text-xl">
							<span className="text-yellow-400">Round 1 of 7 begins.</span>
							<span className="mx-1">You have 6 tactics.</span>
							<span>Get the lowest price possible.</span>
						</div>

						<div className="h-[270px] sm:h-[320px]" />
					</div>
				</div>

				<div className="rounded-2xl border border-indigo-900/40 bg-[#0b0f22] p-3 sm:p-4">
				

					<div className="mt-3">
						<label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300/70 sm:text-sm">
							Offer $
						</label>
						<input
							type="text"
							defaultValue="3276"
							className="w-full rounded-lg border border-indigo-700/55 bg-indigo-950/25 px-3 py-2 text-base font-semibold text-slate-100 placeholder:text-indigo-200/40 focus:outline-none sm:text-lg"
						/>
					</div>

				

					<div className="mt-4 flex flex-col justify-end gap-2 sm:flex-row">
			
						<button
							type="button"
							className="rounded-lg border border-yellow-300/90 bg-yellow-400 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-yellow-300"
						>
							Make Offer 
						</button>
					</div>
				</div>
                </div>
                <div className="w-full lg:w-[40%] lg:h-[30rem] ">
                    <Leaderboard  />
                </div>
			</section>
		</main>
	);
}

export default GameDashboard;