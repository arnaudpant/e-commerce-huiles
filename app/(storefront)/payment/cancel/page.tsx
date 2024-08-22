import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelRoute() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XCircle className="w-12 h-12 rounded-full bg-red-500/30 p-2" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h3 className="text-lg leading-6 font-medium">
                            Paiement annulé
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Une erreur est survenue avec votre paiement.
                        </p>
                        <Button asChild className="w-full mt-5 sm:mt-6"><Link href="/">Accueil</Link></Button>
                    </div>
                </div>
            </Card>
        </section>
    );
}