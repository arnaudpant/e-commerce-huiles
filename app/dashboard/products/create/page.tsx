"use client";
import { createProduct } from "@/app/actions";
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
import { ChevronLeft, Key, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/app/lib/categories";
import { SubmitButtons } from "@/app/components/SubmitButtons";

export default function ProductCreateRoute() {
    const [images, setImages] = useState<string[]>([]);
    const [lastResult, action] = useFormState(createProduct, undefined);
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
                        {/* NOM */}
                        <div className="flex flex-col gap-3">
                            <Label>Nom</Label>
                            <Input
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={fields.name.initialValue}
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
                                defaultValue={fields.description.initialValue}
                                placeholder="Description du produit"
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
                                defaultValue={fields.category.initialValue}
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
                                defaultValue={fields.information.initialValue}
                                placeholder="Information du produit"
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
                                defaultValue={fields.composition.initialValue}
                                placeholder="Composition du produit"
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
                                defaultValue={fields.utilisation.initialValue}
                                placeholder="Utilisation du produit"
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
                                defaultValue={fields.price50.initialValue}
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
                                defaultValue={fields.price50.initialValue}
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
                                defaultValue={fields.price250.initialValue}
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
                                defaultValue={fields.stock.initialValue}
                            />
                        </div>
                        {/* STATUS */}
                        <div className="flex flex-col gap-3">
                            <Label>Status de la publication</Label>
                            <Select
                                key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={fields.status.initialValue}
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
                    <SubmitButtons /> 
                </CardFooter>
            </Card>
        </form>
    );
}
