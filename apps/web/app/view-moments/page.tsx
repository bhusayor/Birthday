"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import MomentIsLoading from "@/components/moment-is-loading";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

type Moment = {
    id: number;
    imageUrl: string;
};

type ApiResponse = {
    data: Moment[];
    pagination: {
        page: number;
        limit: number;
        hasMore: boolean;
    };
};

export default function ViewMoments() {
    const box = useRef(null);
    useGSAP(() => {
        gsap.from(box.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
        });
    });
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["moments"],
        queryFn: ({ pageParam = 1 }): Promise<ApiResponse> =>
            fetch(
                `https://birthday-api-production-88e6.up.railway.app/api/v1/moment?page=${pageParam}&limit=9`,
            ).then((res) => res.json()),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore
                ? lastPage.pagination.page + 1
                : undefined;
        },
    });

    return (
        <section className="pt-36 pb-10 px-4 min-h-screen flex flex-col items-center xl:px-55 bg-[#FCFBFA]">
            <div className="container mx-auto">
                <h3
                    ref={box}
                    className="text-black text-sm font-normal tracking-[2.8px] lg:leading-7.5 sm:text-xl text-center"
                >
                    This gallery captures moments, milestones, and memories that
                    tell the story of Samuel&apos;s journey. Each photo holds a
                    piece of laughter, growth, and experiences that have shaped
                    who he is today. More than pictures, these are memories
                    worth celebrating.
                </h3>
                <div className="flex justify-center sm:flex-row flex-wrap gap-7">
                    {isPending && <MomentIsLoading />}
                    {isError && (
                        <span className="text-3xl text-red-500 text-center">
                            {error.message}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-1 mt-10 xl:mt-16 gap-5 md:grid-cols-3">
                    {data?.pages.flatMap((page) =>
                        page.data.map((item) => (
                            <figure key={item.id} className="max-h-100">
                                <Image
                                    className="w-full h-full object-cover"
                                    src={item.imageUrl}
                                    width={320}
                                    height={360}
                                    alt="Moment"
                                />
                            </figure>
                        )),
                    )}
                </div>
                {hasNextPage && (
                    <section
                        className={`${
                            isPending ? "hidden" : "flex"
                        }  items-center justify-center`}
                    >
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="text-white font-medium text-center active:scale-95 transition-transform duration-150 cursor-pointer rounded-xl py-3 mt-9 w-fit px-10 bg-[#6A0DAD] text-base"
                        >
                            {isFetchingNextPage ? "loading..." : "View more"}
                        </button>
                    </section>
                )}
            </div>
        </section>
    );
}
