import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
    const data = await prisma.order.findMany({
        select: {
            amount: true,
            createdAt: true,
            id: true,
            status: true,
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
            createdAt: "desc"
        }
    });
    return data
}

export default async function OrdersPage() {
    noStore()
    const data = await getData()
    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Commandes</CardTitle>
                <CardDescription>Commandes récentes</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Noms</TableHead>
                            <TableHead>Prénoms</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">
                                Montant
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.length > 0 &&
                            data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <p className="font-medium">{item.User?.firstName}</p>
                            </TableCell>
                            <TableCell>{item.User?.lastName}</TableCell>
                            <TableCell>{item.User?.email}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{new Intl.DateTimeFormat("fr-FR").format(item.createdAt)}</TableCell>
                            <TableCell className="text-right">{new Intl.NumberFormat("fr-FR").format(item.amount)}</TableCell>
                        </TableRow>

                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

