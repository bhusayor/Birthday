"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const nav = [
    {
        id: 1,
        name: "Home",
        path: "/",
    },
    {
        id: 2,
        name: "Gallery",
        path: "/gallery",
    },
    {
        id: 3,
        name: "Wishes",
        path: "/wish",
    },
];

export default function Navbar() {
    const pathname = usePathname();
    return (
        <section className="pt-7 px-4 lg:px-9 fixed inset-x-0 z-40">
            <div className="container mx-auto border border-[#E7E5E4] rounded-lg py-4 bg-[#F1F0EF00] backdrop-blur-lg px-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-black font-normal text-xl">
                        Samuel_Omidiji
                    </Link>
                    <div className="flex gap-5 items-center">
                        {nav.map((item) => (
                            <Link href={item.path} key={item.id}>
                                <h3
                                    className={`font-normal text-sm ${
                                        pathname === item.path
                                            ? "bg-[#F1F1F1] text-[#292524] rounded-2xl px-2.5 py-1.5"
                                            : "text-[#78716C] bg-none p-0"
                                    }`}
                                >
                                    {item.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </section>
    );
}
