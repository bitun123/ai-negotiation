import React, { useState } from "react";
import Navbar from "../component/Navbar";
import Leaderboard from "./Leaderboard";
import { usePage } from "../hooks/usePage";


function GameDashboard() {


    const { product, loading, error, handleMakeOffer, id } = usePage();

    const [offer, setoffer] = useState("")
    const [message, setmessage] = useState("")
    console.log(id)


    const messages = [
        {
            id: 1,
            side: "left",
            text: "You're looking at the APEX CHRONOS - listed at $4,200. This is a premium item. What's your opening offer?",
        },
    ];


    const handleOffer = async (e) => {
        e.preventDefault()
        let gameId = product.id
        await handleMakeOffer(gameId, offer)
    }

    return (
        <main className="w-full min-h-screen bg-[#060916] p-2 text-slate-100 sm:px-4 sm:py-4">
            <Navbar />
            <section className="w-full flex lg:flex-row flex-col p-4 justify-around">
                <div className="w-full lg:w-[60%] flex flex-col gap-4 ">

                    <div className="h-[32rem] rounded-2xl border border-indigo-900/40 bg-[#0b0f22] p-3 shadow-[0_20px_80px_-45px_rgba(2,6,23,0.9)] sm:p-4">
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
                                            className={`max-w-[90%] rounded-xl border px-4 py-3 text-lg leading-relaxed sm:max-w-[84%] sm:text-2xl ${isLeft
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
                                <span className="text-yellow-400">Round 1 of 5 begins.</span>

                            </div>


                        </div>
                    </div>

                    <form className="rounded-2xl border border-indigo-900/40 bg-[#0b0f22] p-3 sm:p-4 flex justify-between shadow-[0_20px_80px_-45px_rgba(2,6,23,0.9)] gap-3"
                        onSubmit={handleOffer}
                    >

                        <div className="flex items-center gap-3 w-full lg:flex-row  md:flex-row flex-col ">
                            //offer input field
                            <input
                                placeholder="Your Offer......."
                                type="text"
                                value={offer}
                                onChange={(e) => setoffer(e.target.value)}
                                className="w-[20%] rounded-lg border border-indigo-700/55 bg-indigo-950/25 px-3 py-2 text-base font-semibold text-slate-100 placeholder:text-indigo-200/40 focus:outline-none sm:text-lg"
                            />

                            //message input field
                            <input
                                value={message}
                                onChange={(e) => setmessage(e.target.value)}

                                type="text" placeholder="Write Your Message" className=" w-[80%] rounded-lg border border-indigo-700/55 bg-indigo-950/25 px-3 py-2 text-base font-semibold text-slate-100 placeholder:text-indigo-200/40 focus:outline-none sm:text-lg " />
                        </div>
                        <button

                            className="cursor-pointer rounded-lg border border-yellow-300/90 bg-yellow-400 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-yellow-300 active:scale-95"
                        >
                            Make Offer
                        </button>

                    </form>

                </div>
                <div className="w-full lg:w-[40%] lg:h-[20rem] ">
                    <Leaderboard />
                </div>
            </section>
        </main>
    );
}

export default GameDashboard;