"use client";

import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const box = useRef(null);
    const title = useRef(null);
    const subtitle1 = useRef(null);
    const subtitle2 = useRef(null);
    const subtitle3 = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: box.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(title.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
            }).from(
                [subtitle1.current, subtitle2.current, subtitle3.current],
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.2,
                },
                "-=0.3"
            );
        },
        { scope: box }
    );

    return (
        <section className="pt-14 px-4 xl:px-[220px]">
            <div className="mx-auto container">
                <section className="gap-8 grid grid-cols-1 md:grid-cols-2 items-center justify-center lg:gap-16">
                    <div ref={box}>
                        <h1
                            ref={title}
                            className="text-gray-900 font-medium text-3xl md:text-4xl"
                        >
                            About Sam Omidiji
                        </h1>
                        <div className="text-[#484242] font-light text-lg  mt-5 space-y-5">
                            <p ref={subtitle1}>
                                Sam Omidiji's journey is a testament to
                                diligence and compassion. Not only has he
                                excelled in his studies and career, but he has
                                also fostered a spirit of unity and generosity
                                in every community he joins.
                            </p>
                            <p ref={subtitle2}>
                                Whether spearheading charity drives, mentoring
                                youth, or developing innovative ideas at work,
                                Sam's accomplishments continue to inspire those
                                around him daily.
                            </p>
                            <p ref={subtitle3}>
                                On this special day, we honor all that Sam has
                                achieved and look forward to many more years of
                                joy, progress, and profound impact.
                            </p>
                        </div>
                    </div>
                    <figure className="w-full h-[510px]">
                        <Image
                            className="w-full h-full object-cover object-center"
                            src="/images/aboutImage.webp"
                            width={498}
                            height={510}
                            alt="sam's Image"
                        />
                    </figure>
                </section>
            </div>
        </section>
    );
}
