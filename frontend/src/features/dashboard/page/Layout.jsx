import React from "react";
import { Link } from "react-router-dom";

import PopupProduct from "../component/PopupProduct";
import { useState } from "react";

function Layout() {

    const [open, setOpen] = useState(false)


    const handleStartGame = async () => {
        setOpen(true)

    }
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#040817] text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,81,168,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(56,81,168,0.13)_1px,transparent_1px)] bg-[size:42px_42px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,0.6)_64%,rgba(2,6,23,0.92)_100%)]" />
            </div>

            <section className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-10 sm:px-8 sm:py-14">
                <div className="w-full max-w-2xl text-center">
                    <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-indigo-300/70 sm:text-xs">
                        <span className="h-px w-10 bg-indigo-400/35 sm:w-14" />
                        Negotiation Arena
                        <span className="h-px w-10 bg-indigo-400/35 sm:w-14" />
                    </div>

                    <h1 className="mt-3 font-display text-7xl uppercase tracking-[0.08em] text-yellow-400 sm:text-8xl lg:text-9xl">
                        Haggle
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-indigo-200/75 sm:text-base">
                        Face a live AI seller with hidden constraints.
                        <br className="hidden sm:block" />
                        Outmaneuver, outwit, and lock in the lowest price.
                        <br className="hidden sm:block" />
                        Your score lands on the global leaderboard.
                    </p>

                    <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3">
                        <button
                            onClick={handleStartGame}
                   
                            className="w-full rounded-md border border-yellow-300/80 bg-yellow-400 px-6 py-3 font-display text-xl uppercase tracking-[0.25em] text-slate-950 transition hover:bg-yellow-300"
                        >
                            Start Negotiation
                        </button>


                        <Link
                            to="/leaderboard"
                            className="w-full rounded-md border border-indigo-600/40 bg-indigo-950/25 px-6 py-2.5 text-center font-display text-sm uppercase tracking-[0.3em] text-indigo-300 transition hover:border-indigo-400/70 hover:text-indigo-200"
                        >
                            View Leaderboard
                        </Link>
                    </div>

                    <div className="mt-10 border-t border-indigo-500/25 pt-6 sm:mt-12 sm:pt-7">
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
                            <div>
                                <p className="font-display text-3xl text-yellow-400 sm:text-4xl">2,847</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-indigo-300/60 sm:text-xs">
                                    Deals Closed
                                </p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-yellow-400 sm:text-4xl">38%</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-indigo-300/60 sm:text-xs">
                                    Avg Discount
                                </p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-yellow-400 sm:text-4xl">4</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-indigo-300/60 sm:text-xs">
                                    Products
                                </p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-yellow-400 sm:text-4xl">7</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-indigo-300/60 sm:text-xs">
                                    Max Rounds
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="absolute inset-x-0 bottom-0 border-t border-indigo-600/30 bg-[#030512]/90 px-3 py-2">
                <p className="truncate text-[10px] uppercase tracking-[0.18em] text-indigo-200/55 sm:text-xs">
                    ShadowBidder closed Apex Chronos at $2,830 | PriceSlayer got Chrome Void for -49% off list | New record: -49% off Chrome Void
                </p>
            </div>

            {
                open ? <PopupProduct  onClose={() => setOpen(false)} /> : null
            }
        </main>
    );
}

export default Layout;
