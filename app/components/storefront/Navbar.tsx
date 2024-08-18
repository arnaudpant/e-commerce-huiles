import Link from "next/link";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "../ui/button";
import { NavbarMenu } from "./NavbarMenu";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/type";

export async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const cart: Cart | null = await redis.get(`cart-${user?.id}`)
    const totalArticlesInBag = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

    return (
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="text-black font-bold text-xl lg:text-3xl">
                        HuilesVak
                    </h1>
                </Link>
                {user?.id === "kp_c1eaeaf06ad04886870c4f0a12e182d1" ? (
                    <NavbarMenu admin={true} />
                ) : (
                    <NavbarMenu admin={false} />
                )}
            </div>

            <div className="flex items-center">
                {user ? (
                    <>
                        <Link
                            href="/bag"
                            className="group p-2 flex items-center mr-2"
                        >
                            <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                {totalArticlesInBag}
                            </span>
                        </Link>
                        <UserDropdown
                            email={user.email as string}
                            name={user.given_name as string}
                            userImage={
                                user.picture ??
                                `https://avatar.vercel.sh/${user.given_name}`
                            }
                        />
                    </>
                ) : (
                    <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2 gap-1">
                        <Button size="sm" variant="secondary" asChild>
                            <LoginLink>Connexion</LoginLink>
                        </Button>
                        <Button size="sm" asChild>
                            <RegisterLink>Inscription</RegisterLink>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
