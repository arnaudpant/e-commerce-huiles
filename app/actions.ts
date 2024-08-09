"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";


export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user === null || user.id !== "kp_c1eaeaf06ad04886870c4f0a12e182d1") {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: productSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const flatUrlsImages = submission.value.images.flatMap((urlString) => urlString.split(",").map((url) => url.trim()))

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            information: submission.value.information,
            composition: submission.value.composition,
            utilisation: submission.value.utilisation,
            status: submission.value.status,
            price50: submission.value.price50,
            price100: submission.value.price100,
            price250: submission.value.price250 ?? 0,
            images: flatUrlsImages,
            category: submission.value.category,
            stock: submission.value.stock === true ? true : false,
        }
    })

    redirect("/dashboard/products")
} 

export async function editProduct(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user === null || user.id !== "kp_c1eaeaf06ad04886870c4f0a12e182d1") {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: productSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const productId = formData.get("productId") as string
    const flatUrlsImages = submission.value.images.flatMap((urlString) => urlString.split(",").map((url) => url.trim()))

    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            information: submission.value.information,
            composition: submission.value.composition,
            utilisation: submission.value.utilisation,
            status: submission.value.status,
            price50: submission.value.price50,
            price100: submission.value.price100,
            price250: submission.value.price250 ?? 0,
            images: flatUrlsImages,
            category: submission.value.category,
            stock: submission.value.stock === true ? true : false,
        }
    })

    redirect("/dashboard/products")
}

export async function deleteProduct(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user === null || user.id !== "kp_c1eaeaf06ad04886870c4f0a12e182d1") {
        return redirect("/")
    }

    await prisma.product.delete({
        where: {
            id: formData.get("productId") as string
        }
    })

    redirect("/dashboard/products")
}