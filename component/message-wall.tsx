import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

export default function MessageWall() {
    return (
        <section className="py-10 md:py-20 px-4 xl:px-[220px]">
            <div className="container mx-auto">
                <h1 className="text-black font-medium text-3xl md:text-4xl text-center">
                    Message wall
                </h1>
                <div className="mt-10">
                    <div className="max-w-[235px]">
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
                </div>
            </div>
        </section>
    );
}
