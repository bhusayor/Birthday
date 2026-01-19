"use client";

import React from "react";
import { ArrowCircleRight } from "iconsax-reactjs";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function SendMessage() {
    const [form, setForm] = useState({
        name: "",
        message: "",
    });
    const submitWish = async (form: { name: string; message: string }) => {
        const response = await fetch(
            "https://birthday-api-production-88e6.up.railway.app/api/v1/birthday-wish",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            },
        );

        if (!response.ok) {
            throw new Error("Failed to submit wish");
        }

        return response.json();
    };

    const { mutate, isPending } = useMutation({
        mutationFn: submitWish,
        onSuccess: () => {
            toast.success("Wish sent successfully!", {
                style: {
                    background: "#6A0DAD",
                    color: "#fff",
                },
            });
            setForm({ name: "", message: "" });
        },
        onError: (error: Error) => {
            toast.error(error.message, {
                style: {
                    background: "#DC2626",
                    color: "#fff",
                },
            });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(form);
    };

    return (
        <section className="h-svh flex flex-col items-center justify-center">
            <div className="container mx-auto">
                <div className="bg-white max-w-125 mx-auto p-6">
                    <h1 className="text-[#0F0F0F] font-semibold text-lg">
                        Your Message to Sam
                    </h1>
                    <p className="text-black font-normal text-sm">
                        Share your birthday wishes
                    </p>
                    <form className="mt-6" action="" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor=""
                                className="text-[#4D5761] text-sm"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                className="mt-1.5 border w-full text-black h-10 placeholder:text-[#6C727E] placeholder:text-sm pl-3.5 border-[#D2D6DB] focus:outline-none rounded-sm"
                                name=""
                                value={form.name}
                                onChange={(e) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }));
                                }}
                                placeholder="ogunmekpon"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 mt-6">
                            <label
                                htmlFor=""
                                className="text-[#4D5761] text-sm"
                            >
                                Message
                            </label>
                            <textarea
                                className="w-full border text-black placeholder:text-[#6C727E] placeholder:text-sm pl-3.5 pt-3.5 border-[#D2D6DB] focus:outline-none rounded-sm"
                                name=""
                                cols={33}
                                rows={5}
                                id=""
                                value={form.message}
                                onChange={(e) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        message: e.target.value,
                                    }));
                                }}
                                placeholder="Your birthday wish"
                            ></textarea>
                        </div>
                        <button
                            aria-label="submit"
                            disabled={isPending}
                            className="bg-[#6A0DAD] mt-5 py-2 active:scale-95 transition-transform duration-150 cursor-pointer rounded-lg flex items-center justify-center w-full gap-2"
                        >
                            <span className="text-sm font-normal">
                                {isPending ? "Sending..." : "Send Message"}
                            </span>
                            <ArrowCircleRight size="16" color="#FFFFFF" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
