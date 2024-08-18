import { ProductCardSkeleton } from "@/app/components/storefront/ProductCardSkeleton";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function LoadingFile() {
    return (
        <div>
            <Skeleton className="h-10 w-56 my-5" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
            </div>
        </div>
    )
}