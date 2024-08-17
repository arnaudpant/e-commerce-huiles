import { addIten } from "@/app/actions";
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
    const addProductShoppingCart = addIten.bind(null, data.id)

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
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-3xl font-medium text-primary ring-1 ring-inset ring-primary/10">
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
                    {/* <div className="mt-3 flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </div> */}
                    <p className="text-xl text-primary tracking-tight mt-6">
                        Description du produit
                    </p>
                    {data.description.split(`\r\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 mt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <p className="text-xl text-primary tracking-tight mt-10">
                        Informations du produit
                    </p>
                    {data.information.split(`\r\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 mt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <p className="text-xl text-primary tracking-tight text-gray-700 mt-10">
                        Composition du produit
                    </p>
                    {data.composition.split(`\r\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 mt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <form action={addProductShoppingCart}>
                        <Button size="lg" className="w-full mt-10">
                            <ShoppingBag className="mr-4 h-5 w-5" />
                            Ajouter au panier
                        </Button>
                    </form>
                </div>
            </div>

            <div className="mt-16">
                <FeaturedProducts />
            </div>
        </>
    );
}
