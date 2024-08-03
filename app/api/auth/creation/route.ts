import {
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db"
import { NextResponse } from "next/server";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if (!user || user === null || !user.id) {
        throw new Error("Erreur avec les données user")
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                adresse: "",
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        })
    }

    return NextResponse.redirect('http://localhost:3000/')
}