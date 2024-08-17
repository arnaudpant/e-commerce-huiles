import { FeaturedProducts } from "@/app/components/storefront/FeatureProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { Button } from "@/app/components/ui/button";
import prisma from "@/app/lib/db";
import { ShoppingBag, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
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
    });
    if (!data) {
        return notFound();
    }
    return data;
}

export default async function ProductIdRoute({
    params,
}: {
    params: { id: string };
}) {
    const data = await getData(params.id);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
                <ImageSlider images={data.images} />
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {data.name}
                    </h1>
                    <div className="flex gap-2 mt-2">
                        {data.price50 !== 0 && (
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-1 ring-inset ring-primary/10">
                                {data.price50}€{" "}
                                <span className="text-sm pl-2">/ 50ml</span>
                            </p>
                        )}
                        {data.price100 !== 0 && (
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-1 ring-inset ring-primary/10">
                                {data.price100}€{" "}
                                <span className="text-sm pl-2">/ 100ml</span>
                            </p>
                        )}
                        {data.price250 !== 0 && (
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-1 ring-inset ring-primary/10">
                                {data.price250}€{" "}
                                <span className="text-sm pl-2">/ 250ml</span>
                            </p>
                        )}
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-base text-gray-700 mt-6">
                        {data.description}
                    </p>
                    <p className="text-base text-gray-700 mt-6">
                        {data.information}
                    </p>
                    <p className="text-base text-gray-700 mt-6">
                        {data.composition}
                    </p>
                    <Button size="lg" className="w-full mt-5">
                        <ShoppingBag className="mr-4 h-5 w-5" />
                        Ajouter au panier
                    </Button>
                </div>
            </div>

            <div className="mt-16">
                <FeaturedProducts />
            </div>
        </>
    );
}
