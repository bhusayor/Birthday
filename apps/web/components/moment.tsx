"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import MomentIsLoading from "./moment-is-loading";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
interface moment {
    id: number;
    imageUrl: string;
}

export default function Moment() {
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
    const getMoment = async () => {
        const response = await fetch(
            `https://birthday-api-production-88e6.up.railway.app/api/v1/moment/recent`
        );
        const json = await response.json();
        const moment: moment[] = json.data;
        return moment;
    };
    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ["moment"],
        queryFn: getMoment,
    });

    return (
        <section id="gallery" className="pt-10 md:pt-20 px-4 xl:px-55">
            <div className="container mx-auto">
                <h1
                    ref={title}
                    className="text-center text-black text-3xl md:text-4xl font-bold"
                >
                    Moments With Samuel 📸
                </h1>
                {isError && (
                    <p className="text-red-500 mt-4 text-2xl text-center">
                        Internal server error
                    </p>
                )}
                {isPending && <MomentIsLoading length={6} />}
                {isSuccess && (
                    <div className="grid grid-cols-1 pt-7 md:pt-14 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {data?.map((item) => (
                            <figure key={item.id} className="h-108">
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
                )}
                <div className="mt-5">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full h-108">
                            <Image
                                className="w-full h-full object-cover object-center"
                                src="/images/IMG1-1.webp"
                                width={600}
                                height={500}
                                alt="sam's Image"
                            />
                        </div>

                            <div className="w-full h-108">
                                <Image
                                    className="w-full h-full object-cover object-top"
                                    src="/images/IMG1-2.webp"
                                    width={600}
                                    height={500}
                                    alt="sam's Image"
                                />
                            </div>
                            <div className="w-full h-108">
                                <Image
                                    className="w-full h-full object-cover object-center"
                                    src="/images/IMG1-3.webp"
                                    width={600}
                                    height={500}
                                    alt="sam's Image"
                                />
                            </div>
                        <div className="w-full h-108">
                            <Image
                                className="w-full h-full object-cover object-center"
                                src="/images/IMG2-1.webp"
                                width={491}
                                height={432}
                                alt="sam's Image"
                            />
                        </div>
                        <div className="w-full h-108">
                            <Image
                                className="w-full h-full object-cover object-bottom-right"
                                src="/images/IMG2-2.webp"
                                width={491}
                                height={432}
                                alt="sam's Image"
                            />
                        </div>
                        <div className="w-full h-108">
                            <Image
                                className="w-full h-full object-cover object-center"
                                src="/images/IMG2-3.webp"
                                width={491}
                                height={432}
                                alt="sam's Image"
                            />
                        </div>
                    </div>
                </div>
               
                <div className="flex justify-center">
                    <Link
                        href="/view-moments"
                        className="mt-12 bg-[#6A0DAD] text-white active:scale-95 transition-transform duration-150 cursor-pointer text-base py-4 px-14 rounded-xl"
                    >
                        View more
                    </Link>
                </div>
            </div>
        </section>
    );
}
