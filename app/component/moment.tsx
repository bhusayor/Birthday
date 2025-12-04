import Image from "next/image";

interface sectionProps {
    id: number;
    img: string;
}

const thirdSection: sectionProps[] = [
    {
        id: 1,
        img: "/images/IMG3-1.webp",
    },
    {
        id: 2,
        img: "/images/IMG3-2.webp",
    },
    {
        id: 3,
        img: "/images/IMG3-3.webp",
    },
    {
        id: 4,
        img: "/images/IMG3-4.webp",
    },
    {
        id: 5,
        img: "/images/IMG3-5.webp",
    },
    {
        id: 6,
        img: "/images/IMG3-6.webp",
    },
];

export default function Moment() {
    return (
        <section className="pt-10 md:pt-20 px-4 xl:px-[220px]">
            <div className="container mx-auto">
                <h1 className="text-center text-black text-3xl md:text-4xl font-bold">
                    Moments With Samuel 📸
                </h1>
                <div className="pt-7 md:pt-14">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="w-full h-[888px]">
                            <Image
                                className="w-full h-full object-cover object-center"
                                src="/images/IMG1-1.webp"
                                width={600}
                                height={500}
                                alt="sam's Image"
                            />
                        </div>
                        <div>
                            <div className="w-full h-[432px]">
                                <Image
                                    className="w-full h-full object-cover object-top"
                                    src="/images/IMG1-2.webp"
                                    width={600}
                                    height={500}
                                    alt="sam's Image"
                                />
                            </div>
                            <div className="w-full mt-6 h-[432px]">
                                <Image
                                    className="w-full h-full object-cover object-center"
                                    src="/images/IMG1-3.webp"
                                    width={600}
                                    height={500}
                                    alt="sam's Image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-6 gap-6 md:grid-cols-2">
                    <div>
                        <div className="w-full h-[432px]">
                            <Image
                                className="w-full h-full object-cover object-center"
                                src="/images/IMG2-1.webp"
                                width={491}
                                height={432}
                                alt="sam's Image"
                            />
                        </div>
                        <div className="w-full mt-6 h-[432px]">
                            <Image
                                className="w-full h-full object-cover object-center"
                                src="/images/IMG2-2.webp"
                                width={491}
                                height={432}
                                alt="sam's Image"
                            />
                        </div>
                    </div>
                    <div className="w-full h-[888px]">
                        <Image
                            className="w-full h-full object-cover object-center"
                            src="/images/IMG2-3.webp"
                            width={489}
                            height={886}
                            alt="sam's Image"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-5 gap-5 md:grid-cols-3">
                    {thirdSection.map((item) => (
                        <figure key={item.id}>
                            <Image
                                className="w-full h-full"
                                src={item.img}
                                width={320}
                                height={360}
                                alt="sam's Image"
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
