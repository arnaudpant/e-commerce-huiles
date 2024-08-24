import { Euro, PartyPopper, ShoppingBag, User2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import prisma from "@/app/lib/db";

async function getData(){

    const [user, products, orders] = await Promise.all([
        prisma.user.findMany({
            select: {
                id: true,
            },
        }),
        prisma.product.findMany({
            select: {
                id: true,
            },
        }),
        prisma.order.findMany({
        select: {
            amount: true
        },
    })
    ]);


    return {user, products, orders}
}

export async function DashboardStats(){
    const {user, products, orders} = await getData()

    const totalAmount = orders.reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)
    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Revenus totaux</CardTitle>
                        <Euro className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{new Intl.NumberFormat("fe-FR").format(totalAmount / 100)} €</p>
                        <p className="text-xs text-muted-foreground">
                            Basé sur {orders.length} commandes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total des ventes</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">+{orders.length}</p>
                        <p className="text-xs text-muted-foreground">
                            Total des ventes sur HuilesVak
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Produits</CardTitle>
                        <PartyPopper className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{products.length}</p>
                        <p className="text-xs text-muted-foreground">
                            Nombre de produits créés
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total clients</CardTitle>
                        <User2 className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{user.length}</p>
                        <p className="text-xs text-muted-foreground">
                            Nombre de clients
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}