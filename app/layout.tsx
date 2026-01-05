import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Urbanist, Outfit, Nunito } from "next/font/google";
import QueryProvider from "@/components/query-provider";
import SmoothScroll from "../components/smooth-scroll";
import "./globals.css";

const urbanist = Urbanist({
    variable: "--font-urbanist",
    subsets: ["latin"],
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Happy Birthday Sam!",
    description: "Happy Birthday Sam!!!! More good life.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <SmoothScroll>
                <body
                    className={`${urbanist.variable} ${nunito.variable} ${outfit.variable} antialiased`}
                >
                    <QueryProvider>
                        <Navbar />
                        {children}
                        <Footer />
                    </QueryProvider>

                    <Toaster />
                </body>
            </SmoothScroll>
        </html>
    );
}
