"use client";

import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import WishesLoading from "./wishes-loading";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type wish = {
    id: number;
    name: string;
    message: string;
};

export default function MessageWall() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const title = useRef(null);
    useGSAP(() => {
        gsap.from(title.current, {
            scrollTrigger: {
                trigger: title.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
        });
    });
    const [progress, setProgress] = useState(0);

    const getMessage = async () => {
        const response = await fetch(
            `https://birthday-api-production-88e6.up.railway.app/api/v1/birthday-wish/recent`,
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
        <section id="wish" className="py-10 md:py-20">
            <h1
                ref={title}
                className="text-black font-medium text-3xl md:text-4xl text-center"
            >
                Message wall
            </h1>
            <div className="mt-10 flex flex-col gap-10 sm:flex-row items-center lg:gap-20 pl-4 xl:pl-55">
                <div className="max-w-58.75 w-full">
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="/svgs/apostrophe.svg"
                            alt="illustration"
                            width={20}
                            height={50}
                        />
                        <Image
                            src="/svgs/apostrophe.svg"
                            alt="illustration"
                            width={20}
                            height={50}
                        />
                    </div>
                    <h1 className="text-black font-medium font-outfit mt-6 text-3xl">
                        Birthday Message for Samuel
                    </h1>
                    <div className="mt-8 flex items-center gap-4">
                        <ArrowLeft
                            onClick={moveToStart}
                            size="32"
                            color={"#000000"}
                            className="cursor-pointer w-fit transition-transform duration-150 active:scale-75"
                        />

                        <div className="relative h-0.5 w-full bg-[#00000033] overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-black transition-all duration-200"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                        <ArrowRight
                            onClick={moveToEnd}
                            size="32"
                            color="#000000"
                            className="cursor-pointer w-fit transition-transform duration-150 active:scale-75"
                        />
                    </div>
                    <Link
                        href="/view-wishes"
                        className="text-white active:scale-95 transition-transform duration-150 font-medium block text-center rounded-xl py-3 mt-6 w-full bg-[#6A0DAD] text-base"
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
                    <div
                        data-lenis-prevent
                        className="flex gap-7 w-max px-2 sm:px-0"
                    >
                        {data?.map((wish) => (
                            <div key={wish.id} className="w-75.5 shrink-0">
                                <div className="h-72 overflow-y-scroll drop-shadow-2xl px-7 pt-7 pb-14  bg-white rounded-t-2xl rounded-br-2xl custom-clip">
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
