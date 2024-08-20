import { addIten } from "@/app/actions";
import { FeaturedProducts } from "@/app/components/storefront/FeatureProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
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
            littledescription: true,
            information: true,
            composition: true,
            utilisation: true,
            status: true,
            price50: true,
            price100: true,
            price2: true,
            price5: true,
            option250: true,
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
                        {data.price2 !== 0 && (
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-1 ring-inset ring-primary/10">
                                {data.price2}€{" "}
                                <span className="text-sm pl-2">/ 2.5ml</span>
                            </p>
                        )}
                        {data.price5 !== 0 && (
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-1 ring-inset ring-primary/10">
                                {data.price5}€{" "}
                                <span className="text-sm pl-2">/ 5ml</span>
                            </p>
                        )}
                    </div>
                    <p className="text-xl text-primary tracking-tight mt-6">
                        Description du produit
                    </p>
                    {data.description.split(`\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 mt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <p className="text-xl text-primary tracking-tight mt-10">
                        Informations du produit
                    </p>
                    {data.information.split(`\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 mt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <p className="text-xl text-primary tracking-tight text-gray-700 mt-10">
                        Composition du produit
                    </p>
                    {data.composition.split(`\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 mt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <form action={addProductShoppingCart}>
                        <ShoppingBagButton />
                    </form>
                </div>
            </div>

            <div className="mt-16">
                <FeaturedProducts />
            </div>
        </>
    );
}
