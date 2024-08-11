import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";

export default function BannerRoute() {
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex gap-x-2">
                    <Link href="/dashboard/banner/create">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Ajouter Banner</span>
                    </Link>
                </Button>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banners</CardTitle>
                    <CardDescription>Gérer votre bannière</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead className="texte-end">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <User2 />
                                </TableCell>

                                <TableCell className="font-medium">
                                    Great Product
                                </TableCell>

                                <TableCell className="text-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
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
                                                    href={`/dashboard/products/`}
                                                >
                                                    Supprimer
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
