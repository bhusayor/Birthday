"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import MomentIsLoading from "@/components/moment-is-loading";

type moment = {
    id: number;
    imageUrl: string;
};

export default function ViewMoments() {
    const [id, setId] = useState<number>(1);
    const getMoment = async (id: number) => {
        const response = await fetch(
            `https://sam-s-birthdayapi-production.up.railway.app/api/v1/moment?page=${id}`
        );
        const json = await response.json();
        const moments: moment[] = json.data;
        return moments;
    };
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["moment", id],
        queryFn: () => getMoment(id),
    });

    return (
        <section className="pt-36 pb-10 px-4 min-h-screen flex flex-col items-center xl:px-[220px] bg-[#FCFBFA]">
            <div className="container mx-auto">
                <h3 className="text-black text-sm sm:text-xl text-center">
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
                <div className="grid grid-cols-1 mt-5 md:mt-10 gap-5 md:grid-cols-3">
                    {data?.map((item) => (
                        <figure key={item.id} className="max-h-[400px]">
                            <Image
                                className="w-full h-full object-cover object-top"
                                src={item.imageUrl}
                                width={320}
                                height={360}
                                alt="sam's Image"
                            />
                        </figure>
                    ))}
                </div>
                <section
                    className={`${
                        isPending ? "hidden" : "flex"
                    }  items-center justify-center`}
                >
                    <div
                        onClick={() => setId((prev) => prev + 1)}
                        className="text-white font-medium text-center cursor-pointer rounded-xl py-3 mt-9 w-fit px-10 bg-[#6A0DAD] text-base"
                    >
                        View more
                    </div>
                </section>
            </div>
        </section>
    );
}
