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

export default async function ProductIdRoute({params}: {params : {id: string}}) {

    const data = await getData(params.id);

    return <>
        <div>
            
        </div>
    </>;
}
