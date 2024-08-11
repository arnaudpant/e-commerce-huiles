import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BannerRoute() {
    return (
        <form>
            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">
                    Nouvelle bannière
                </h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Détails bannière</CardTitle>
                    <CardDescription>Créez votre bannière ici</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-3">
                            <Label>Nom</Label>
                            <Input
                                type="text"
                                placeholder="Titre de votre bannière"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <UploadDropzone endpoint="bannerImageRoute" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center my-5">
                    <SubmitButtons text="Créer la bannière" />
                </CardFooter>
            </Card>
        </form>
    );
}