"use client";

import Link from "next/link";
import { useState } from "react";
const nav = [
    {
        id: 1,
        name: "Home",
        path: "/",
    },
    {
        id: 2,
        name: "Gallery",
        path: "#gallery",
    },
    {
        id: 3,
        name: "Wishes",
        path: "#wish",
    },
];

export default function Navbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <section className="pt-3 px-4 lg:px-9 fixed inset-x-0 z-40">
            <div className="border border-[#E7E5E4] rounded-lg py-4 w-full backdrop-blur-lg px-4">
                <nav className="flex w-full items-center justify-between">
                    <Link href="/" className="text-black font-normal text-xl">
                        Samuel_Omidiji
                    </Link>
                    {/* desktop navigation menu */}
                    <div className="hidden md:flex gap-5 items-center">
                        {nav.map((item) => (
                            <Link href={item.path} key={item.id}>
                                <h3
                                    onClick={() => setShowMenu(false)}
                                    className="font-normal text-sm text-[#292524]"
                                >
                                    {item.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                    {/* mobile navigation menu */}
                    <div
                        className={`${
                            showMenu ? "flex" : "hidden"
                        } font-outfit absolute top-16 left-0 z-60 h-fit w-full flex-col gap-5 bg-white px-2 py-14 md:top-36 lg:hidden`}
                    >
                        {nav.map((item) => (
                            <Link href={item.path} key={item.id}>
                                <h3
                                    onClick={() => setShowMenu(false)}
                                    className="font-normal text-sm  text-[#292524]"
                                >
                                    {item.name}
                                </h3>
                            </Link>
                        ))}
                    </div>

                    <div
                        onClick={() => setShowMenu(!showMenu)}
                        className="md:hidden"
                    >
                        <div className="relative flex h-1 w-8 flex-col items-center justify-center">
                            <span
                                className={`block h-1 w-6 bg-black
                                 transition-transform ${
                                     showMenu
                                         ? "translate-y-0 rotate-45"
                                         : "-translate-y-1.25"
                                 }`}
                            />
                            <span
                                className={`block h-1 w-6 bg-black 
                                 transition-transform ${
                                     showMenu
                                         ? "translate-y-0 -rotate-45"
                                         : "translate-y-1.25"
                                 }`}
                            />
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
}
