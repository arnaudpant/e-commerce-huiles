"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/app/components/ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButtons({text}: {text: string}) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Veuillez patienter</Button>
            ) : (
                <Button type="submit">{text}</Button>
            )}
        </>
    );
}
