"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "./lib/zodSchemas";

export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user === null || user.id !== "kp_c1eaeaf06ad04886870c4f0a12e182d1") {
        return redirect("/")
    }

    const submission = parseWithZod(formData, {
        schema: productSchema
    })

    if(submission.status !== "success") {
        return submission.reply()
    }
} 