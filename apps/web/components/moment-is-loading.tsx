import { cn } from "@/utils/util";

type MomentIsLoadingProps = {
    className?: string;
    length?: number;
};

export default function MomentIsLoading({
    className,
    length = 12,
}: MomentIsLoadingProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 mt-5 md:mt-10 gap-5 md:grid-cols-3 animate-pulse",
                className
            )}
        >
            {Array.from({ length }).map((_, index) => (
                <div
                    key={index}
                    className="h-[400px] w-full sm:w-[340px] rounded-lg bg-white shadow-sm"
                />
            ))}
        </div>
    );
}
