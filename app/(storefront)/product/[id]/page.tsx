import {
    addIten100,
    addIten2,
    addIten5,
    addIten50,
} from "@/app/actions";
import { FeaturedProducts } from "@/app/components/storefront/FeatureProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
    noStore()
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
            price2: true,
            price5: true,
            option250: true,
            vedette: true,
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

    const addProductShoppingCart50 = addIten50.bind(null, data.id);
    const addProductShoppingCart100 = addIten100.bind(null, data.id);
    const addProductShoppingCart2 = addIten2.bind(null, data.id);
    const addProductShoppingCart5 = addIten5.bind(null, data.id);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
                <ImageSlider images={data.images} />
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {data.name}
                    </h1>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {data.price50 !== 0 && (
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-3xl font-medium text-primary ring-1 ring-inset ring-primary/10">
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
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-3xl font-medium text-primary ring-1 ring-inset ring-primary/10">
                                {data.price2}€{" "}
                                <span className="text-sm pl-2">/ 2.5ml</span>
                            </p>
                        )}
                        {data.price5 !== 0 && (
                            <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-3xl font-medium text-primary ring-1 ring-inset ring-primary/10">
                                {data.price5}€{" "}
                                <span className="text-sm pl-2">/ 5ml</span>
                            </p>
                        )}
                    </div>
                    <p className="text-xl text-primary tracking-tight mt-6">
                        Description du produit
                    </p>
                    {data.description.split(`\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 pt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <p className="text-xl text-primary tracking-tight mt-10">
                        Informations du produit
                    </p>
                    {data.information.split(`\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 pt-2" key={index}>
                            {phrase}
                        </p>
                    ))}
                    <div className="mt-5">
                        {data.price50 > 0 && (
                            <form action={addProductShoppingCart50}>
                                <ShoppingBagButton text="+1 bouteille de 50ml" />
                            </form>
                        )}
                        {data.price100 > 0 && (
                            <form action={addProductShoppingCart100}>
                                <ShoppingBagButton text="+1 bouteille de 100ml" />
                            </form>
                        )}
                        {data.price2 > 0 && (
                            <form action={addProductShoppingCart2}>
                                <ShoppingBagButton text="+1 bouteille de 2.5ml" />
                            </form>
                        )}
                        {data.price5 > 0 && (
                            <form action={addProductShoppingCart5}>
                                <ShoppingBagButton text="+1 bouteille de 5ml" />
                            </form>
                        )}
                        {
                            data.option250 && (<p className="pb-2 pt-4 text-xs text-gray-500">* Conditionnement par bouteille de 250ml possible sur demande</p>)
                        }
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24">
                <div>
                    <p className="text-xl text-primary tracking-tight text-gray-700 mt-10">
                        Utilisation du produit
                    </p>
                    {data.utilisation.split(`\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 pt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                </div>
                <div>
                    <p className="text-xl text-primary tracking-tight text-gray-700 mt-10">
                        Composition du produit
                    </p>
                    {data.composition.split(`\n`).map((phrase, index) => (
                        <p className="text-sm text-gray-700 pt-1" key={index}>
                            {phrase}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mt-16">
                <FeaturedProducts />
            </div>
        </>
    );
}
