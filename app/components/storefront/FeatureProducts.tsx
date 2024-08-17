import prisma from "@/app/lib/db";
import { ProductCard } from "./ProductCard";

async function getData() {
    const data = await prisma.product.findMany({
        where: {
            status: "published",
        },
        select: {
            id: true,
            name: true,
            description: true,
            information: true,
            composition: true,
            utilisation: true,
            status: true,
            price50: true,
            price100: true,
            price250: true,
            images: true,
            category: true,
            stock: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return data
}

export async function FeaturedProducts() {
    const data = await getData();
    return (
        <>
            <h2 className="text-xl font-extrabold tracking-tight">
                Articles en vedette
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                {data.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </>
    );
}
