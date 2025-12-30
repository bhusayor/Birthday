import { cn } from "@/utils/util";

type WishesIsLoadingProps = {
    className?: string;
    length?: number;
};

export default function WishesLoading({
    className,
    length = 12,
}: WishesIsLoadingProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-pulse gap-4",
                className
            )}
        >
            {Array.from({ length }).map((_, index) => (
                <div
                    key={index}
                    className="h-[235px] w-full sm:w-[302px] drop-shadow-2xl drop-shadow-[#0000000D] bg-white rounded-t-2xl rounded-br-2xl custom-clip"
                ></div>
            ))}
        </div>
    );
}
