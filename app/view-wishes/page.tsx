"use client";

import Loader from "@/component/loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type wish = {
    id: number;
    name: string;
    message: string;
};

export default function ViewWishes() {
    // const response = await fetch(
    //     "https://sam-s-birthdayapi-production.up.railway.app/api/v1/birthday-wish"
    // );
    // const json = await response.json();
    // const wishes: wish[] = json.data;
    const [id, setId] = useState<number>(1);
    const getMessage = async (id: number) => {
        const response = await fetch(
            `https://sam-s-birthdayapi-production.up.railway.app/api/v1/birthday-wish?page=${id}`
        );
        const json = await response.json();
        const wishes: wish[] = json.data;
        return wishes;
    };
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["message", id],
        queryFn: () => getMessage(id),
    });

    return (
        <section className="pt-36 pb-10 px-4 min-h-screen flex flex-col items-center justify-center xl:px-[220px] bg-[#FCFBFA]">
            <div className="container mx-auto">
                <div className="flex flex-col justify-center sm:flex-row flex-wrap gap-7">
                    {isPending && (
                        <Loader
                            fill="#6A0DAD"
                            className="text-[#6A0DAD] w-10 h-10 animate-spin"
                            role="status"
                            aria-label="Loading"
                        />
                    )}
                    {isError && (
                        <span className="text-3xl text-red-500 text-center">
                            {error.message}
                        </span>
                    )}
                    {data?.map((wish) => (
                        <div key={wish.id} className="w-[302px]">
                            <div>
                                <div className="h-[235px] drop-shadow-2xl drop-shadow-[#0000000D] px-7 py-7 flex justify-center bg-white rounded-t-2xl rounded-br-2xl custom-clip">
                                    <p className="text-black text-sm">
                                        {wish.message}
                                    </p>
                                </div>

                                <h2 className="text-black text-center">
                                    {wish.name}
                                </h2>
                            </div>
                        </div>
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
