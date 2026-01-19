"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Header() {
    const title = useRef(null);
    const subtitle = useRef(null);
    useGSAP(() => {
        gsap.from([title.current, subtitle.current], {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
        });
    });

    return (
        <section className="pt-36 px-4 xl:px-55">
            <div className="mx-auto container">
                <h1
                    ref={title}
                    className="text-black text-center font-bold text-3xl md:text-4xl"
                >
                    Happy Birthday Sam!
                </h1>
                <p
                    ref={subtitle}
                    className="text-[#999999] text-xl text-center pt-4 sm:text-3xl"
                >
                    Celebrating a life of joy and achievements.
                </p>
                <figure className="pt-7 xl:pt-14">
                    <video
                        autoPlay
                        controls
                        muted
                        className="h-100 object-cover sm:h-full w-full"
                        loop
                        preload="none"
                    >
                        <source src="/Sam omidiji.mp4" type="video/mp4" />
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                    </video>
                </figure>
            </div>
        </section>
    );
}
