import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

async function getData() {
    const data = await prisma.order.findMany({
        select: {
            amount: true,
            id: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true,
                    adresse: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10
    });
    return data;
}

export async function RecentSales() {
    const data = await getData();
    return (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
            <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                        Transactions récentes de votre boutique
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Ventes récentes</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden sm:flex h-9 w-9">
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">John DOE</p>
                            <p className="text-sm to-muted-foreground">
                                test@test.fr
                            </p>
                        </div>
                        <p className="ml-auto font-medium">35€</p>
                    </div>
                </CardContent>
                <CardContent className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden sm:flex h-9 w-9">
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">John DOE</p>
                            <p className="text-sm to-muted-foreground">
                                test@test.fr
                            </p>
                        </div>
                        <p className="ml-auto font-medium">35€</p>
                    </div>
                </CardContent>
                <CardContent className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden sm:flex h-9 w-9">
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">John DOE</p>
                            <p className="text-sm to-muted-foreground">
                                test@test.fr
                            </p>
                        </div>
                        <p className="ml-auto font-medium">35€</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
