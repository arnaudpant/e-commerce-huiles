import { deletedItem } from "@/app/actions";
import { DeleteItemBag } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/type";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BagRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);
    let totalPrice = 0;

    cart?.items.forEach((item) => {
        totalPrice +=
            item.price50 * item.quantity50 +
            item.price100 * item.quantity100 +
            item.price5 * item.quantity5 +
            item.price2 * item.quantity2;
    });

    return (
        <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
            {cart?.items.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <ShoppingBag className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="text-xl font-semibold mt-6 mb-10">
                        Votre panier est vide !
                    </h2>
                    <Button asChild>
                        <Link href="/">Accueil</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-y-10">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-10">
                        Votre panier:
                    </h1>

                    {cart?.items.map((item) => (
                        <div key={item.id} className="flex border-t-2 pt-2">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                                <Image
                                    src={item.imageString}
                                    alt={item.name}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </div>
                            <div className="ml-5 flex justify-between w-full font-medium">
                                <p>{item.name}</p>
                                <div className="flex flex-col h-full justify-between gap-5">
                                    {item.quantity50 > 0 && (
                                        <div className="flex items-center justify-end gap-x-2">
                                            <p>{item.quantity50} x</p>
                                            <p>{item.price50} €</p>
                                        </div>
                                    )}
                                    {item.quantity100 > 0 && (
                                        <div className="flex items-center justify-end gap-x-2">
                                            <p>{item.quantity100} x</p>
                                            <p>{item.price100} €</p>
                                        </div>
                                    )}
                                    {item.quantity2 > 0 && (
                                        <div className="flex items-center justify-end gap-x-2">
                                            <p>{item.quantity2} x</p>
                                            <p>{item.price2} €</p>
                                        </div>
                                    )}
                                    {item.quantity5 > 0 && (
                                        <div className="flex items-center justify-end gap-x-2">
                                            <p>{item.quantity5} x</p>
                                            <p>{item.price5} €</p>
                                        </div>
                                    )}
                                    <div>
                                        <form action={deletedItem}>
                                            <input
                                                type="hidden"
                                                name="productId"
                                                value={item.id}
                                            />
                                            <DeleteItemBag />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-10">
                        <div className="flex items-center justify-end font-medium gap-x-2 text-xl">
                            <p>Total:</p>
                            <p>
                                {new Intl.NumberFormat("fr-FR").format(
                                    totalPrice
                                )}{" "}
                                €
                            </p>
                        </div>
                        <Button size="lg" className="w-full mt-5">
                            Payer
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
