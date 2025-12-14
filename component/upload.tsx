import { DocumentUpload, Gallery } from "iconsax-reactjs";

export default function Upload() {
    return (
        <section className="h-svh flex flex-col items-center justify-center">
            <div className="container mx-auto">
                <div className="bg-white max-w-[500px] mx-auto rounded-3xl p-6">
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
                        <div className="py-32 max-w-[139px] flex flex-col justify-center items-center mx-auto">
                            <Gallery size="40" color="#6A0DAD" variant="Bulk" />
                            <p className="text-[#4D5761] text-center text-sm font-normal">
                                Drag & drop or click to choose image(s)
                            </p>
                        </div>
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
