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
                "-=0.3",
            );
        },
        { scope: box },
    );

    return (
        <section className="pt-14 px-4 xl:px-55">
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
                                Today we celebrate Sam, a person whose caring
                                heart, diligence, and compassion shine in
                                everything he does. His dedication to excellence
                                has consistently set him apart, from his
                                outstanding academic achievements to the
                                remarkable progress he continues to make in his
                                career.
                            </p>
                            <p ref={subtitle2}>
                                Sam's spirit of unity and generosity brings
                                people together, creating an environment where
                                collaboration and kindness thrive. At work, his
                                innovative ideas and forward-thinking approach
                                reflect not only intelligence, but a deep
                                commitment to making meaningful impact.
                            </p>
                            <p ref={subtitle3}>
                                Sam's accomplishments are more than personal
                                milestones, they are a daily source of
                                inspiration to everyone around him. As he marks
                                another year, we celebrate not just his
                                successes, but the character, purpose, and
                                positivity he brings into the lives of others.
                            </p>
                        </div>
                    </div>
                    <figure className="w-full h-127.5">
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
