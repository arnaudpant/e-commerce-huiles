import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";


export default function OrdersPage() {
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
                            <TableHead>Clients</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">
                                Montant
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <p className="font-medium">John Doe</p>
                            </TableCell>
                            <TableCell>type</TableCell>
                            <TableCell>En cours</TableCell>
                            <TableCell>10/02/2024</TableCell>
                            <TableCell className="text-right">35€</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

