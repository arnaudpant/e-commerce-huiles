import { deleteBanner } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import Link from "next/link";

export default function DeleteBannerRoute({params}: {params: {id:string}}) {
    return (
        <div className="h-[800px] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Etes-vous certain ?</CardTitle>
                    <CardDescription>
                        Cette action est irréversible. Elle surpprimera
                        définitivement cette bannière et toutes les données du
                        serveur
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild>
                        <Link href="/dashboard/banner ">Annuler</Link>
                    </Button>
                    <form action={deleteBanner}>
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