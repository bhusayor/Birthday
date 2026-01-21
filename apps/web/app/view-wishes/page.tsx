"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import WishesLoading from "@/components/wishes-loading";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

type Wish = {
    id: number;
    name: string;
    message: string;
};

type ApiResponse = {
    data: Wish[];
    pagination: {
        page: number;
        limit: number;
        hasMore: boolean;
    };
};

export default function ViewWishes() {
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
        queryKey: ["wish"],
        queryFn: ({ pageParam = 1 }): Promise<ApiResponse> =>
            fetch(
                `https://birthday-api-production-88e6.up.railway.app/api/v1/birthday-wish?page=${pageParam}&limit=9`,
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
                    className="text-black text-sm sm:text-lg tracking-[2.8px] lg:leading-7.5 font-normal text-center"
                >
                    This page is filled with heartfelt birthday wishes from
                    friends, family, and loved ones. Each message is a
                    reflection of the impact Samuel has made, the joy he brings
                    to others, and the love surrounding him as he celebrates
                    another beautiful year.
                </h3>
                <div className="flex flex-col mt-10 xl:mt-16  justify-center sm:flex-row flex-wrap gap-7">
                    {isPending && <WishesLoading />}
                    {isError && (
                        <span className="text-3xl text-red-500 text-center">
                            {error.message}
                        </span>
                    )}
                    {data?.pages.flatMap((page) =>
                        page.data.map((wish) => (
                            <div
                                data-lenis-prevent
                                key={wish.id}
                                className="w-full sm:w-82.5"
                            >
                                <div>
                                    <div className="h-72 overflow-y-scroll drop-shadow-2xl px-7 pt-7 pb-16 bg-white rounded-t-2xl rounded-br-2xl custom-clip">
                                        <p className="text-black font-nunito text-sm">
                                            {wish.message}
                                        </p>
                                    </div>

                                    <h2 className="text-black font-nunito text-center">
                                        {wish.name}
                                    </h2>
                                </div>
                            </div>
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
                            className="text-[#78716C] font-medium active:scale-95 transition-transform duration-150 text-center cursor-pointer rounded-xl py-3 mt-9 w-fit px-10 bg-[#EAE8E5] text-base"
                        >
                            {isFetchingNextPage ? "loading..." : "Load more"}
                        </button>
                    </section>
                )}
            </div>
        </section>
    );
}
