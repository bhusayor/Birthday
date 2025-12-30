import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/components/query-provider";
import SmoothScroll from "../components/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Happy Birthday Sam!",
    description: " Happy Birthday Sam!!!! More good life.",
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
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
