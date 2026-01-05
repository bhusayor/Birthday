"use client";

import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import WishesLoading from "./wishes-loading";

type wish = {
    id: number;
    name: string;
    message: string;
};

export default function MessageWall() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const getMessage = async () => {
        const response = await fetch(
            `https://sam-s-birthdayapi-production.up.railway.app/api/v1/birthday-wish/recent`
        );
        const json = await response.json();
        const wishes: wish[] = json.data;
        return wishes;
    };
    const { data, error, isError, isPending } = useQuery({
        queryKey: ["message"],
        queryFn: getMessage,
    });

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el;

            const maxScroll = scrollWidth - clientWidth;
            const percent = maxScroll > 0 ? scrollLeft / maxScroll : 0;

            setProgress(percent);
            setAtStart(scrollLeft <= 0);
            setAtEnd(scrollLeft >= maxScroll - 1);
        };

        handleScroll();
        el.addEventListener("scroll", handleScroll);

        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    const CARD_WIDTH = 302 + 28;

    const moveToEnd = () => {
        scrollRef.current?.scrollBy({
            left: CARD_WIDTH,
            behavior: "smooth",
        });
    };

    const moveToStart = () => {
        scrollRef.current?.scrollBy({
            left: -CARD_WIDTH,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-10 md:py-20">
            <h1 className="text-black font-medium text-3xl md:text-4xl text-center">
                Message wall
            </h1>
            <div className="mt-10 flex flex-col gap-10 sm:flex-row items-center lg:gap-20 pl-4 xl:pl-[220px]">
                <div className="max-w-[235px] w-full">
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="/svgs/apostrophe.svg"
                            alt="illustration"
                            width={34}
                            height={68}
                        />
                        <Image
                            src="/svgs/apostrophe.svg"
                            alt="illustration"
                            width={34}
                            height={68}
                        />
                    </div>
                    <h1 className="text-black font-medium font-outfit mt-9 text-3xl">
                        Birthday Message for Samuel
                    </h1>
                    <div className="mt-10 flex items-center gap-4">
                        <ArrowLeft
                            onClick={atStart ? undefined : moveToStart}
                            size="32"
                            color={atStart ? "#0000004D" : "#000000"}
                            className={`cursor-pointer transition ${
                                atStart ? "opacity-40 cursor-not-allowed" : ""
                            }`}
                        />
                        <div className="relative h-0.5 w-full bg-[#00000033] overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-black transition-all duration-200"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>

                        <ArrowRight
                            onClick={atEnd ? undefined : moveToEnd}
                            size="32"
                            color={atEnd ? "#0000004D" : "#000000"}
                            className={`cursor-pointer transition ${
                                atEnd ? "opacity-40 cursor-not-allowed" : ""
                            }`}
                        />
                    </div>
                    <Link
                        href="/view-wishes"
                        className="text-white font-medium block text-center rounded-xl py-3 mt-9 w-full bg-[#6A0DAD] text-base"
                    >
                        View more
                    </Link>
                </div>

                <div
                    ref={scrollRef}
                    className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {isPending && (
                        <WishesLoading
                            className="flex gap-7 w-max px-2 sm:px-0"
                            length={3}
                        />
                    )}
                    {isError && (
                        <h2 className="text-3xl text-red-500 text-center">
                            {error.message}
                        </h2>
                    )}
                    <div className="flex gap-7 w-max px-2 sm:px-0">
                        {data?.map((wish) => (
                            <div key={wish.id} className="w-[302px] shrink-0">
                                <div className="h-[235px] drop-shadow-2xl px-7 py-7 bg-white rounded-t-2xl rounded-br-2xl custom-clip">
                                    <p className="text-black font-nunito text-sm">
                                        {wish.message}
                                    </p>
                                </div>

                                <h2 className="text-black font-nunito text-center mt-2">
                                    {wish.name}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
