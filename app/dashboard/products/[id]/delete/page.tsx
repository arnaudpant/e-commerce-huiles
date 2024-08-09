import { deleteProduct } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";

export default function DeleteRoute({params}: {params: {id: string}}) {
    return (
        <div className="h-[800px] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Etes-vous certain ?</CardTitle>
                    <CardDescription>
                        Cette action est irréversible. Elle surpprimera
                        définitivement ce produit et toutes les données du
                        serveur
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild>
                        <Link href="/dashboard/products">Annuler</Link>
                    </Button>
                    <form action={deleteProduct}>
                        <input
                            type="hidden"
                            name="productId"
                            value={params.id}
                        />
                        <SubmitButtons text="Continuer" variant="destructive" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
