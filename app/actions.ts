"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/type";
import { revalidatePath } from "next/cache";


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
            littledescription: submission.value.littledescription,
            information: submission.value.information,
            composition: submission.value.composition,
            utilisation: submission.value.utilisation,
            status: submission.value.status,
            price50: submission.value.price50,
            price100: submission.value.price100,
            price2: submission.value.price2,
            price5: submission.value.price5,
            option250: submission.value.option250 === true ? true : false,
            vedette: submission.value.vedette === true ? true : false,
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
            littledescription: submission.value.littledescription,
            information: submission.value.information,
            composition: submission.value.composition,
            utilisation: submission.value.utilisation,
            status: submission.value.status,
            price50: submission.value.price50,
            price100: submission.value.price100,
            price2: submission.value.price2,
            price5: submission.value.price5,
            option250: submission.value.option250 === true ? true : false,
            vedette: submission.value.vedette === true ? true : false,
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

export async function createBanner(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user === null || user.id !== "kp_c1eaeaf06ad04886870c4f0a12e182d1") {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: bannerSchema,
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    await prisma.banner.create({
        data: {
            title: submission.value.title,
            imageString: submission.value.imageString
        }
    })

    redirect("/dashboard/banner")
}

export async function deleteBanner(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user === null || user.id !== "kp_c1eaeaf06ad04886870c4f0a12e182d1") {
        return redirect("/")
    }

    await prisma.banner.delete({
        where: {
            id: formData.get("bannerId") as string
        }
    })

    redirect("/dashboard/banner")
}


/** 
** 50ml  
*/ 
export async function addIten50(productId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user) {
        return redirect("/")
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price50: true,
            price100: true,
            price2: true,
            price5: true,
            images: true,
        },
        where: {
            id: productId
        }
    })

    if (!selectedProduct) {
        throw new Error("Pas de produit avec cet ID")
    }

    let myCart = {} as Cart

    /** Creation d'une Cart si non existante */
    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    price50: selectedProduct.price50,
                    price100: selectedProduct.price100,
                    price2: selectedProduct.price2,
                    price5: selectedProduct.price5,
                    name: selectedProduct.name,
                    id: selectedProduct.id,
                    imageString: selectedProduct.images[0],
                    quantity50: 1,
                    quantity100: 0,
                    quantity2: 0,
                    quantity5: 0,
                }
            ]
        }
    }
    else /** Sinon Cart existante */ {
        let itemFound = false
        /** Si produit deja dans la Cart = quantity +1 */
        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true
                item.quantity50 += 1
            }
            return item
        })
        /** Si produit non dans la Cart = Ajout en quantity 1 */
        if (!itemFound) {
            myCart.items.push({
                price50: selectedProduct.price50,
                price100: selectedProduct.price100,
                price2: selectedProduct.price2,
                price5: selectedProduct.price5,
                name: selectedProduct.name,
                id: selectedProduct.id,
                imageString: selectedProduct.images[0],
                quantity50: 1,
                quantity100: 0,
                quantity2: 0,
                quantity5: 0
            })
        }
    }
    await redis.set(`cart-${user.id}`, myCart)
    revalidatePath("/", "layout")
}

/** 
** 100ml  
*/
export async function addIten100(productId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user) {
        return redirect("/")
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price50: true,
            price100: true,
            price2: true,
            price5: true,
            images: true,
        },
        where: {
            id: productId
        }
    })

    if (!selectedProduct) {
        throw new Error("Pas de produit avec cet ID")
    }

    let myCart = {} as Cart

    /** Creation d'une Cart si non existante */
    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    price50: selectedProduct.price50,
                    price100: selectedProduct.price100,
                    price2: selectedProduct.price2,
                    price5: selectedProduct.price5,
                    name: selectedProduct.name,
                    id: selectedProduct.id,
                    imageString: selectedProduct.images[0],
                    quantity50: 0,
                    quantity100: 1,
                    quantity2: 0,
                    quantity5: 0,
                }
            ]
        }
    }
    else /** Sinon Cart existante */ {
        let itemFound = false
        /** Si produit deja dans la Cart = quantity +1 */
        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true
                item.quantity100 += 1
            }
            return item
        })
        /** Si produit non dans la Cart = Ajout en quantity 1 */
        if (!itemFound) {
            myCart.items.push({
                price50: selectedProduct.price50,
                price100: selectedProduct.price100,
                price2: selectedProduct.price2,
                price5: selectedProduct.price5,
                name: selectedProduct.name,
                id: selectedProduct.id,
                imageString: selectedProduct.images[0],
                quantity50: 0,
                quantity100: 1,
                quantity2: 0,
                quantity5: 0
            })
        }
    }
    await redis.set(`cart-${user.id}`, myCart)
    revalidatePath("/", "layout")
}

/** 
** 2.5ml  
*/
export async function addIten2(productId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user) {
        return redirect("/")
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price50: true,
            price100: true,
            price2: true,
            price5: true,
            images: true,
        },
        where: {
            id: productId
        }
    })

    if (!selectedProduct) {
        throw new Error("Pas de produit avec cet ID")
    }

    let myCart = {} as Cart

    /** Creation d'une Cart si non existante */
    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    price50: selectedProduct.price50,
                    price100: selectedProduct.price100,
                    price2: selectedProduct.price2,
                    price5: selectedProduct.price5,
                    name: selectedProduct.name,
                    id: selectedProduct.id,
                    imageString: selectedProduct.images[0],
                    quantity50: 0,
                    quantity100: 0,
                    quantity2: 1,
                    quantity5: 0,
                }
            ]
        }
    }
    else /** Sinon Cart existante */ {
        let itemFound = false
        /** Si produit deja dans la Cart = quantity +1 */
        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true
                item.quantity2 += 1
            }
            return item
        })
        /** Si produit non dans la Cart = Ajout en quantity 1 */
        if (!itemFound) {
            myCart.items.push({
                price50: selectedProduct.price50,
                price100: selectedProduct.price100,
                price2: selectedProduct.price2,
                price5: selectedProduct.price5,
                name: selectedProduct.name,
                id: selectedProduct.id,
                imageString: selectedProduct.images[0],
                quantity50: 0,
                quantity100: 0,
                quantity2: 1,
                quantity5: 0
            })
        }
    }
    await redis.set(`cart-${user.id}`, myCart)
    revalidatePath("/", "layout")
}

/** 
** 5ml  
*/
export async function addIten5(productId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user) {
        return redirect("/")
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price50: true,
            price100: true,
            price2: true,
            price5: true,
            images: true,
        },
        where: {
            id: productId
        }
    })

    if (!selectedProduct) {
        throw new Error("Pas de produit avec cet ID")
    }

    let myCart = {} as Cart

    /** Creation d'une Cart si non existante */
    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    price50: selectedProduct.price50,
                    price100: selectedProduct.price100,
                    price2: selectedProduct.price2,
                    price5: selectedProduct.price5,
                    name: selectedProduct.name,
                    id: selectedProduct.id,
                    imageString: selectedProduct.images[0],
                    quantity50: 0,
                    quantity100: 0,
                    quantity2: 0,
                    quantity5: 1,
                }
            ]
        }
    }
    else /** Sinon Cart existante */ {
        let itemFound = false
        /** Si produit deja dans la Cart = quantity +1 */
        myCart.items = cart.items.map((item) => {
            if (item.id === productId) {
                itemFound = true
                item.quantity5 += 1
            }
            return item
        })
        /** Si produit non dans la Cart = Ajout en quantity 1 */
        if (!itemFound) {
            myCart.items.push({
                price50: selectedProduct.price50,
                price100: selectedProduct.price100,
                price2: selectedProduct.price2,
                price5: selectedProduct.price5,
                name: selectedProduct.name,
                id: selectedProduct.id,
                imageString: selectedProduct.images[0],
                quantity50: 0,
                quantity100: 0,
                quantity2: 0,
                quantity5: 1
            })
        }
    }
    await redis.set(`cart-${user.id}`, myCart)
    revalidatePath("/", "layout")
}

// DELETE
export async function deletedItem(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user) {
        return redirect("/")
    }

    const productId = formData.get('productId')

    let cart: Cart | null = await redis.get(`cart-${user.id}`)

    if(cart && cart.items) {
        const updateCart: Cart = {
            userId: user.id,
            items: cart.items.filter((item) => item.id !== productId)
        }
        await redis.set(`cart-${user.id}`, updateCart)
    }

    revalidatePath('/bag')
}