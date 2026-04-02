import React from "react";
import { usePage } from "../hooks/usePage";

function Navbar() {

  const { product ,gameinformation } = usePage();

	return (
		<header className="w-full border border-indigo-900/50 bg-[#0a0e21] px-4 py-4 shadow-[0_16px_40px_-28px_rgba(2,6,23,0.9)] sm:px-6 rounded">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="font-display text-3xl uppercase tracking-[0.22em] text-yellow-400 sm:text-4xl">
					Haggle
				</div>

				<div className="flex flex-wrap items-center gap-2 sm:justify-end">
					<div className="inline-flex items-center gap-2 rounded-md border border-indigo-700/55 bg-indigo-950/35 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-indigo-300 sm:text-sm">
						<span className="h-2 w-2 rounded-full bg-indigo-300" />
						{product ? product.product : "No Active Game"}
					</div>


                    <div className="rounded-md border border-indigo-700/55 bg-indigo-950/35 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-indigo-300 sm:text-sm">
						{`$${product ? product.initialPrice : "0"}`}
					</div>

					<div className="rounded-md border border-yellow-500/60 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-yellow-300 sm:text-sm">
						Round <span>{gameinformation ? gameinformation.currentRound : "0"}/5</span>
					</div>

					

					<button
						type="button"
						className="rounded-md border border-indigo-700/55 bg-indigo-950/35 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-indigo-300 transition hover:border-indigo-500/80 hover:text-indigo-200 sm:text-sm"
					>
						Quit
					</button>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
