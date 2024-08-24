import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import prisma from "@/app/lib/db";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
    const data = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
}

export default async function Products() {
    noStore()
    const data = await getData();
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex items-center gap-2">
                    <Link href="/dashboard/products/create">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Ajouter produit</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Produits</CardTitle>
                    <CardDescription>Gestion des produits</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Prix 50ml</TableHead>
                                <TableHead>Prix 100ml</TableHead>
                                <TableHead>Prix 2ml</TableHead>
                                <TableHead>Prix 5ml</TableHead>
                                <TableHead>250ml</TableHead>
                                <TableHead>Vedette</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-end">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Image
                                            alt="image produit"
                                            src={item.images[0]}
                                            height={64}
                                            width={64}
                                            className="rounded-md object-cover h-16 w-16"
                                        />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.stock ? "En stock" : "Epuisé"}
                                    </TableCell>
                                    <TableCell>
                                        {item.price50 !== 0
                                            ? `${item.price50}€`
                                            : "X"}
                                    </TableCell>
                                    <TableCell>
                                        {item.price100 !== 0
                                            ? `${item.price100}€`
                                            : "X"}
                                    </TableCell>
                                    <TableCell>
                                        {item.price2 !== 0
                                            ? `${item.price2}€`
                                            : "X"}
                                    </TableCell>
                                    <TableCell>
                                        {item.price5 !== 0
                                            ? `${item.price5}€`
                                            : "X"}
                                    </TableCell>
                                    <TableCell>
                                        {item.option250 ? "250ml" : "X"}
                                    </TableCell>
                                    <TableCell>
                                        {item.vedette ? "O" : "N"}
                                    </TableCell>
                                    <TableCell>
                                        {new Intl.DateTimeFormat(
                                            "fr-FR"
                                        ).format(item.createdAt)}
                                    </TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell className="text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Action
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/dashboard/products/${item.id}`}
                                                    >
                                                        Modifier
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/dashboard/products/${item.id}/delete`}
                                                    >
                                                        Supprimer
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
