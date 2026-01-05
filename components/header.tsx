import Image from "next/image";

export default function Header() {
    return (
        <section className="pt-36 px-4 xl:px-[220px]">
            <div className="mx-auto container">
                <h1 className="text-black text-center font-bold text-3xl md:text-4xl">
                    Happy Birthday Sam!
                </h1>
                <p className="text-[#999999] text-center pt-4 text-3xl">
                    Celebrating a life of joy and achievements.
                </p>
                <figure className="pt-7 xl:pt-14">
                    <video controls autoPlay muted loop preload="none">
                        <source src="/Sam omidiji.mp4" type="video/mp4" />
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                    </video>
                </figure>
                <section className="pt-14 gap-8 grid grid-cols-1 md:grid-cols-2 items-center justify-center lg:gap-16">
                    <div>
                        <h1 className="text-gray-900 font-medium text-3xl md:text-4xl">
                            About Sam Omidiji
                        </h1>
                        <div className="text-[#484242] font-light text-lg  mt-5 space-y-5">
                            <p>
                                Sam Omidiji's journey is a testament to
                                diligence and compassion. Not only has he
                                excelled in his studies and career, but he has
                                also fostered a spirit of unity and generosity
                                in every community he joins.
                            </p>
                            <p>
                                Whether spearheading charity drives, mentoring
                                youth, or developing innovative ideas at work,
                                Sam's accomplishments continue to inspire those
                                around him daily.
                            </p>
                            <p>
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
