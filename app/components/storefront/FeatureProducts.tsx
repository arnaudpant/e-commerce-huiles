import prisma from "@/app/lib/db";
import { ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

async function getData() {
    const data = await prisma.product.findMany({
        where: {
            status: "published",
            stock: true,
        },
        select: {
            id: true,
            name: true,
            description: true,
            littledescription: true,
            information: true,
            composition: true,
            utilisation: true,
            status: true,
            price50: true,
            price100: true,
            price5: true,
            price2: true,
            option250: true,
            images: true,
            category: true,
            stock: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
    });
    return data;
}

export function FeaturedProducts() {
    
    return (
        <>
            <h2 className="text-xl font-extrabold tracking-tight">
                Articles en vedette
            </h2>
            <Suspense fallback={<LoadingRows />}>
                <LoadingFeaturedProducts />
            </Suspense>
        </>
    );
}

async function LoadingFeaturedProducts() {
    const data = await getData();
    return (
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {data.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}
        </div>
    );
}

function LoadingRows() {
    return (
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
        </div>
    );
}
