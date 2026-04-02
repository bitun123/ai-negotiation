import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePage } from "../hooks/usePage";

function Leaderboard() {
    const { quitCurrentGame ,leaderBoard ,handleGetleaderBoard} = usePage()

 

    const handleQuit = async () => {
        alert("Are you sure you want to quit the game? Your current score will not be saved.");
        await quitCurrentGame()

    }

    useEffect(() => {
        handleGetleaderBoard()
    }, [])
 
    return (
        <main className="min-h-screen bg-[#050814] px-3 py-2 text-slate-100 sm:px-6 ">
            <section className="mx-auto w-full max-w-6xl h-full flex-col gap-6">
                <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                        <h1 className=" text-yellow-300 text-2xl ">Leaderboard</h1>
                    </div>
                    <Link to="/">
                        <button
                            onClick={handleQuit}
                            type="button"
                            className="rounded-lg border border-indigo-700/70 bg-indigo-950/50 px-4 py-2 text-sm text-indigo-300 transition hover:border-indigo-500/80 hover:text-indigo-200"
                        >
                            Home
                        </button>
                    </Link>
                </div>

                <div className="overflow-auto no-scrollbar rounded-2xl border border-indigo-900/50 bg-[#0c1126]/85 shadow-[0_28px_80px_-35px_rgba(2,6,23,0.9)] ">
                    <div className="min-w-[860px] h-[35rem]">
                        <div className="grid grid-cols-[90px_1.7fr_1.4fr_1fr_1fr] items-center border-b border-indigo-900/40 bg-[#0a0f21] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/45 sm:text-sm">
                            <span>Rank</span>
                            <span>Name</span>
                            <span>Product</span>
                            <span>Discount</span>
                            <span>Final Price</span>
                        </div>

                        {leaderBoard.map((row, index) => {
                            const rank = index + 1;
                            const isTopThree = rank <= 3;
                            const rankLabel = rank <= 3 ? `${rank}` : `#${rank}`;
                            const finalPriceLabel = row.finalPrice === null ? "No Deal" : `$${row.finalPrice}`;
                            const discountLabel = row.discount || "0%";

                            return (
                                <article
                                    key={`${row.userName}-${row.product}-${index}`}
                                    className={`grid grid-cols-[90px_1.7fr_1.4fr_1fr_1fr] items-center border-t border-indigo-900/35 px-6 py-4 ${isTopThree ? "bg-indigo-950/35" : "bg-[#0c1126]/80"
                                        }`}
                                >
                                    <div className="text-lg font-bold text-indigo-300 sm:text-2xl">{rankLabel}</div>

                                    <div className="min-w-0">
                                        <p className="truncate text-xl font-semibold text-slate-100 sm:text-2xl">{row.userName}</p>
                                    </div>

                                    <div className="min-w-0 truncate text-lg uppercase text-indigo-400/75 sm:text-xl">{row.product}</div>

                                    <div className="min-w-0">
                                        <p className="text-xl font-bold text-emerald-400 sm:text-2xl">{discountLabel}</p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xl font-bold text-emerald-400 sm:text-2xl">{finalPriceLabel}</p>
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