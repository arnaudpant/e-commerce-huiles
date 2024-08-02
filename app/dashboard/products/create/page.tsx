"use client"
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ProductCreateRoute() {
    return (
        <form>
            <div className="flex items-center gap-4">
                <Button variant="outline">
                    <Link href="/dashboard/products">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">
                    Nouveau produit
                </h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Détails du produit</CardTitle>
                    <CardDescription>
                        Ici vous pouvez créer votre produit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>Nom</Label>
                            <Input
                                type="text"
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea placeholder="Description du produit" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Prix</Label>
                            <Input
                                type="number"
                                className="w-full"
                                placeholder="0€"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>En stock</Label>
                            <Switch />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selectionner le status"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">
                                        Brouillon
                                    </SelectItem>
                                    <SelectItem value="published">
                                        En ligne
                                    </SelectItem>
                                    <SelectItem value="archive">
                                        Archive
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
                                toast.success("Téléchargement terminé")
                            }} onUploadError={(res) => {
                                toast.error("Une erreur est survenue")
                            }} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
