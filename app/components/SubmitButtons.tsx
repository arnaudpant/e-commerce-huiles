"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/app/components/ui/button";
import { Loader2 } from "lucide-react";

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
