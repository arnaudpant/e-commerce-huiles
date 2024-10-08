import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Charts } from "./Charts";

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
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Ventes récentes</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                    {data.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarImage src={item.User?.profileImage} alt="Avatar image" />
                                <AvatarFallback>
                                    {item.User?.firstName
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">
                                    {item.User?.firstName}{" "}
                                    {item.User?.lastName}
                                </p>
                                <p className="text-sm to-muted-foreground">
                                    {item.User?.email}
                                </p>
                            </div>
                            <p className="ml-auto font-medium">{new Intl.NumberFormat('fr-FR').format(item.amount / 100)}€</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
