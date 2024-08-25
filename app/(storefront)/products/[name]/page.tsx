import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productCategoriy: string) {
    switch (productCategoriy) {
        case "all": {
            const data = await prisma.product.findMany({
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
                where: {
                    status: "published",
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                title: "Tous les produits",
                data: data,
            };
        }
        case "huiles": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "huileVegetale",
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                title: "Huiles végétales",
                data: data,
            };
        }
        case "graisses": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "graisseVegetalePure",
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                title: "Graisses végétales",
                data: data,
            };
        }
        case "huilescomposees": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "huileVegetaleComposee",
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                title: "Huiles végétales composées",
                data: data,
            };
        }
        case "huilesaromatiques": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "huileAromatique",
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                title: "Huiles aromatiques",
                data: data,
            };
        }
        case "huilesessentielles": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "huileEssentielle",
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                title: "Huiles essentielles",
                data: data,
            };
        }
        default: {
            return notFound();
        }
    }
}

export default async function CategoriesPage({
    params,
}: {
    params: { name: string };
}) {
    noStore()
    const { data, title } = await getData(params.name);
    data.length === 0 && redirect("/noproducts")
    return (
        <section>
            <h1 className="font-semibold text-3xl my-5">{title}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
