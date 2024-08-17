"use client";

import { categories } from "@/app/lib/categories";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Link, ChevronLeft, XIcon } from "lucide-react";
import { toast } from "react-toastify";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import Image from "next/image";
import { Switch } from "@/app/components/ui/switch";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { editProduct } from "@/app/actions";
import { productSchema } from "@/app/lib/zodSchemas";

interface DataProps {
    data: {
        id: string;
        name: string;
        description: string;
        information: string;
        composition: string;
        utilisation: string;
        status: "draft" | "published" | "archived";
        price50: number;
        price100: number;
        price250?: number;
        images: string[];
        category: "huileVegetale"| "graisseVegetalePure"| "huileVegetaleComposee"| "huileAromatique"| "huileEssentielle";
        stock: boolean;
    };
}

export function EditForm({data}: DataProps) {
    const [images, setImages] = useState<string[]>(data.images);
    const [lastResult, action] = useFormState(editProduct, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };
    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <input type="hidden" name="productId" value={data.id} />
            <div className="flex items-center gap-4">
                <Button variant="outline">
                    <Link href="/dashboard/products">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">
                    Produit à modifier
                </h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Détails du produit</CardTitle>
                    <CardDescription>
                        Ici vous pouvez modifier votre produit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        {/* NOM */}
                        <div className="flex flex-col gap-3">
                            <Label>Nom</Label>
                            <Input
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={data.name}
                                className="w-full"
                                placeholder="Nom du produit"
                            />
                            <p className="text-red-500">{fields.name.errors}</p>
                        </div>
                        {/* DESCRIPTION */}
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={data.description}
                                placeholder="Description du produit"
                                rows={15}
                            />
                            <p className="text-red-500">
                                {fields.description.errors}
                            </p>
                        </div>
                        {/* CATEGORIES */}
                        <div className="flex flex-col gap-3">
                            <Label>Catégorie</Label>
                            <Select
                                key={fields.category.key}
                                name={fields.category.name}
                                defaultValue={data.category}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selectionner la catégorie"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.name}
                                        >
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">
                                {fields.category.errors}
                            </p>
                        </div>
                        {/* INFORMATIONS */}
                        <div className="flex flex-col gap-3">
                            <Label>Information</Label>
                            <Textarea
                                key={fields.information.key}
                                name={fields.information.name}
                                defaultValue={data.information}
                                placeholder="Information du produit"
                                rows={15}
                            />
                            <p className="text-red-500">
                                {fields.information.errors}
                            </p>
                        </div>
                        {/* COMPOSITION */}
                        <div className="flex flex-col gap-3">
                            <Label>Composition</Label>
                            <Textarea
                                key={fields.composition.key}
                                name={fields.composition.name}
                                defaultValue={data.composition}
                                placeholder="Composition du produit"
                                rows={15}
                            />
                            <p className="text-red-500">
                                {fields.composition.errors}
                            </p>
                        </div>
                        {/* UTILISATION */}
                        <div className="flex flex-col gap-3">
                            <Label>Utilisation</Label>
                            <Textarea
                                key={fields.utilisation.key}
                                name={fields.utilisation.name}
                                defaultValue={data.composition}
                                placeholder="Utilisation du produit"
                                rows={15}
                            />
                            <p className="text-red-500">
                                {fields.utilisation.errors}
                            </p>
                        </div>
                        {/* PRIX 50ml */}
                        <div className="flex flex-col gap-3">
                            <Label>Prix 50ml</Label>
                            <Input
                                key={fields.price50.key}
                                name={fields.price50.name}
                                defaultValue={data.price50}
                                type="number"
                                className="w-full"
                                placeholder="0€"
                            />
                            <p className="text-red-500">
                                {fields.price50.errors}
                            </p>
                        </div>
                        {/* PRIX 100ml */}
                        <div className="flex flex-col gap-3">
                            <Label>Prix 100ml</Label>
                            <Input
                                key={fields.price100.key}
                                name={fields.price100.name}
                                defaultValue={data.price100}
                                type="number"
                                className="w-full"
                                placeholder="0€"
                            />
                            <p className="text-red-500">
                                {fields.price100.errors}
                            </p>
                        </div>
                        {/* PRIX 250ml */}
                        <div className="flex flex-col gap-3">
                            <Label>Prix 250ml</Label>
                            <Input
                                key={fields.price250.key}
                                name={fields.price250.name}
                                defaultValue={data.price250}
                                type="number"
                                className="w-full"
                                placeholder="0€"
                            />
                            <p className="text-red-500">
                                {fields.price250.errors}
                            </p>
                        </div>
                        {/* STOCK */}
                        <div className="flex flex-col gap-3">
                            <Label>En stock</Label>
                            <Switch
                                key={fields.stock.key}
                                name={fields.stock.name}
                                defaultChecked={data.stock}
                            />
                        </div>
                        {/* STATUS */}
                        <div className="flex flex-col gap-3">
                            <Label>Status de la publication</Label>
                            <Select
                                key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={data.status}
                            >
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
                            <p className="text-red-500">
                                {fields.status.errors}
                            </p>
                        </div>
                        {/* IMAGES */}
                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input
                                type="hidden"
                                value={images}
                                key={fields.images.key}
                                name={fields.images.name}
                                defaultValue={fields.images.initialValue as any}
                            />
                            {images.length > 0 ? (
                                <div className="flex gap-5">
                                    {images.map((img, index) => (
                                        <div
                                            className="relative w-[100px] h-[100px]"
                                            key={index}
                                        >
                                            <Image
                                                src={img}
                                                alt="Image de produit"
                                                height={100}
                                                width={100}
                                                className="w-full h-full object-cover border"
                                            />
                                            <button
                                                type="button"
                                                className="absolute -top-3 -right-3 bg-red-500 rounded-lg"
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <XIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        toast.success("Téléchargement terminé");
                                        setImages(res.map((r) => r.url));
                                    }}
                                    onUploadError={(res) => {
                                        toast.error("Une erreur est survenue");
                                    }}
                                />
                            )}
                            <p className="text-red-500">
                                {fields.images.errors}
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center my-5">
                    <SubmitButtons text="Modifier" />
                </CardFooter>
            </Card>
        </form>
    );
}
