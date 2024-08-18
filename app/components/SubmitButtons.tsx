"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/app/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";

type SubmitButtonsProps = {
    text: string;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | null;
};

export function SubmitButtons({ text, variant }: SubmitButtonsProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled variant={variant}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Veuillez patienter
                </Button>
            ) : (
                <Button variant={variant} type="submit">
                    {text}
                </Button>
            )}
        </>
    );
}

export function ShoppingBagButton(){
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <Button disabled size="lg" className="w-full mt-10">
                    <Loader2 className="mr-4 h-5 w-5 animate-spin" />
                    Veuillez patienter
                </Button>
            ) : (
                <Button size="lg" className="w-full mt-10" type="submit">
                    <ShoppingBag className="mr-4 h-5 w-5" />
                    Ajouter au panier
                </Button>
            )}
        </>
    );
}

export function DeleteItemBag() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <button disabled className="text-red-600 font-medium text-end">
                    Suppression en cours ...
                </button>
            ) : (
                <button type="submit" className="text-red-600 font-medium text-end hover:bg-gray-100/50 py-1 px-2 rounded-md">
                    Supprimer
                </button>
            )}
        </>
    );
}