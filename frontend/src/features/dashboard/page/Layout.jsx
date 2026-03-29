import React from "react";
import { Link } from "react-router-dom";

function Layout() {


    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute -bottom-56 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_44%)]" />
            </div>

            <section className="relative mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/75 p-4 shadow-[0_0_0_1px_rgba(148,163,184,0.08),0_24px_80px_-28px_rgba(8,47,73,0.95)] backdrop-blur-md sm:rounded-3xl sm:p-6 lg:p-5">
                    <header className="overflow-hidden rounded-xl border border-cyan-300/20 bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 px-4 py-8 text-center shadow-inner shadow-sky-900/30 sm:rounded-2xl sm:px-8 sm:py-10 lg:py-12">
                        <span className="block text-4xl leading-none sm:text-5xl" aria-hidden="true">
                            💰
                        </span>
                        <h1 className="mt-4 font-display text-4xl font-black uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
                            Negotiate
                        </h1>
                        <p className="mt-4 font-sans text-2xl font-light text-slate-200 sm:text-3xl">
                            Master the Art of Deal-Making
                        </p>
                        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-slate-300 sm:text-lg">
                            Face an AI seller with hidden constraints. Use strategy, timing, and
                            persuasion to secure the lowest price.
                        </p>
                    </header>

                    <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
                        <button
                            type="button"
                            className="w-full rounded-xl border border-slate-600/80 bg-slate-900/80 px-4 py-4 font-display text-4xl font-black lowercase tracking-wide text-slate-100 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-slate-800/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:rounded-2xl sm:py-5 sm:text-5xl"
                        >
                            start game
                        </button>

                        <Link to="/leaderboard">
                            <button
                                type="button"
                                className="w-full rounded-xl border border-slate-600/80 bg-slate-900/80 px-4 py-4 font-display text-4xl font-black lowercase tracking-wide text-slate-100 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-slate-800/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:rounded-2xl sm:py-5 sm:text-5xl"
                            >
                                view leaderboard
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Layout;
