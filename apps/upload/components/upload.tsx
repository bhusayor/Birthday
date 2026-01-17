"use client";

import { DocumentUpload, Gallery } from "iconsax-reactjs";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);

    const submitMoment = async (file: File) => {
        const formData = new FormData();
        formData.append("imageUrl", file);
        const response = await fetch(
            "https://birthday-api-production-88e6.up.railway.app/api/v1/moment",
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        return response.json();
    };

    const { mutate, isPending } = useMutation({
        mutationFn: submitMoment,
        onSuccess: () => {
            toast.success("Upload successful!", {
                style: {
                    background: "#6A0DAD",
                    color: "#fff",
                },
            });
            setFile(null);
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

    const handleFileSelect = (selectedFile: File) => {
        if (isPending) return;
        if (selectedFile.size > 50 * 1024 * 1024) {
            toast.error("File must be under 50MB");
            return;
        }

        setFile(selectedFile);
        mutate(selectedFile);
    };

    return (
        <section className="h-svh flex flex-col items-center justify-center">
            <div className="container mx-auto">
                <div className="bg-white max-w-125 mx-auto rounded-3xl p-6">
                    <div className="flex items-center gap-2">
                        <DocumentUpload size="20" color="#000000" />
                        <h1 className="text-[#0F0F0F] font-semibold">
                            Upload Files
                        </h1>
                    </div>
                    <p className="text-black font-normal text-sm">
                        Share your moment of Sam Omidiji
                    </p>

                    <div className="mt-4 border border-[#D2D6DB] border-dashed rounded-2xl">
                        <label
                            htmlFor="myfile"
                            className="py-32 max-w-34.75 cursor-pointer flex flex-col justify-center items-center mx-auto"
                        >
                            <Gallery size="40" color="#6A0DAD" variant="Bulk" />
                            <p className="text-[#4D5761] text-center text-sm font-normal">
                                {isPending
                                    ? "uploading.."
                                    : " Click to choose image"}
                            </p>
                            <input
                                className="hidden"
                                type="file"
                                accept="image/png, image/jpeg"
                                id="myfile"
                                name="myfile"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleFileSelect(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-[#4D5761] font-medium text-xs">
                            Supported formats: jpg, png.
                        </p>
                        <p className="text-[#4D5761] font-medium text-xs">
                            Max: 50MB
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
