import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Recycle } from "lucide-react";
import Link from "next/link";

export function NoProductsRoute() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <Recycle className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h3 className="text-lg leading-6 font-medium">
                            Désolé nous n&apos;avons aucun produit de ce type
                            disponnible en ce moment
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Revenez plus tard ...
                        </p>
                        <Button asChild className="w-full mt-5 sm:mt-6">
                            <Link href="/">Accueil</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    );
}