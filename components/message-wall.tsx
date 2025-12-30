"use client";

import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import WishesLoading from "./wishes-loading";

type wish = {
    id: number;
    name: string;
    message: string;
};

export default function MessageWall() {
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
                    <h1 className="text-black font-medium mt-9 text-3xl">
                        Birthday Message for Samuel
                    </h1>
                    <div className="mt-10 flex items-center justify-between">
                        <ArrowLeft
                            size="32"
                            color="#0000004D"
                            className="cursor-pointer"
                        />
                        <ArrowRight
                            size="32"
                            color="#000000"
                            className="cursor-pointer"
                        />
                    </div>
                    <Link
                        href="/view-wishes"
                        className="text-white font-medium block text-center rounded-xl py-3 mt-9 w-full bg-[#6A0DAD] text-base"
                    >
                        View more
                    </Link>
                </div>

                <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                                    <p className="text-black text-sm">
                                        {wish.message}
                                    </p>
                                </div>

                                <h2 className="text-black text-center mt-2">
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
