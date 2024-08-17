"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageUrlType = {
    images: string[];
};

export function ImageSlider({ images }: ImageUrlType) {
    const [mainImageIndex, setMainImageIndex] = useState<number>(0);
    const handlePreviousIndex = () => {
        setMainImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    const handleNextIndex = () => {
        setMainImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    const handleImageClick = (index: number) => {
        setMainImageIndex(index);
    };

    return (
        <div className="grid gap-6 md:gap-3 items-start">
            <div className="relative overflow-hidden rounded-lg">
                <Image
                    height={600}
                    width={600}
                    src={images[mainImageIndex]}
                    alt="image produit"
                    className="object-cover h-[600px] w-[600px]"
                />

                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button onClick={handlePreviousIndex} size="icon">
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button onClick={handleNextIndex} size="icon">
                        <ChevronRight className="w-8 h-8" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className=
                            "relative overflow-hidden cursor-pointer"
                        
                        onClick={() => handleImageClick(index)}
                    >
                        <Image
                            height={100}
                            width={100}
                            src={image}
                            alt="image produit"
                            className="object-cover h-[100px] w-[100px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
