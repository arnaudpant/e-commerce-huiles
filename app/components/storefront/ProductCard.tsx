import { ProductType } from "@/app/lib/type";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
    item: {
        id: string;
        name: string;
        description: string;
        information: string;
        composition: string;
        utilisation: string;
        status: string;
        price50: number;
        price100: number;
        price250: number;
        images: string[];
        category: string;
        stock: boolean;
    };
};

export function ProductCard({ item }: Props) {
    return (
        <div className="rounded-lg">
            <Carousel>
                <CarouselContent className="w-full mx-auto">
                    {item.images.map((imgUrl, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[330px]">
                                <Image
                                    src={imgUrl}
                                    alt="Image produit"
                                    fill
                                    className="object-cover object-center w-full h-full rounded-lg"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-16" />
                <CarouselNext className="mr-16" />
            </Carousel>

            <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold text-xl">{item.name}</h1>
                <div className="flex flex-col gap-y-1">
                    {item.price50 && (
                        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
                            {item.price50}€/50ml
                        </h3>
                    )}
                    {item.price100 && (
                        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
                            {item.price100}€/100ml
                        </h3>
                    )}
                    {item.price250 && (
                        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
                            {item.price250}€/250ml
                        </h3>
                    )}
                </div>
            </div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{item.description}</p>
            <Button asChild className="w-full mt-5"><Link href={`/product/${item.id}`}>Commander</Link></Button>
        </div>
    );
}
