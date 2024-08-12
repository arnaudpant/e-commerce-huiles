"use client";

import { createBanner, createProduct } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function BannerRoute() {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [lastResult, action] = useFormState(createBanner, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
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
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                            />
                            <p className="text-red-500">
                                {fields.title.errors}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Image</Label>
                            <input
                                type="hidden"
                                value={image}
                                key={fields.imageString.key}
                                name={fields.imageString.name}
                                defaultValue={fields.imageString.initialValue}
                            />
                            {image !== undefined ? (
                                <Image
                                    src={image}
                                    alt="Produit en banniere"
                                    width={200}
                                    height={200}
                                    className="h-[200px] w-[200px] object-cover rounded-lg"
                                />
                            ) : (
                                <UploadDropzone
                                    onClientUploadComplete={(res) => {
                                        setImage(res[0].url);
                                        toast.success("Téléchargement terminé");
                                    }}
                                    onUploadError={() => {
                                        toast.error("Une erreur est survenue");
                                    }}
                                    endpoint="bannerImageRoute"
                                />
                            )}
                            <p className="text-red-500">{fields.imageString.errors}</p>
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
