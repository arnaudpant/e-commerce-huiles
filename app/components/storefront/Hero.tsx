import prisma from "@/app/lib/db";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

async function getData() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
}

export async function Hero() {
    const data = await getData();
    return (
        <>
            {data.map((item) => (
                <div
                    key={item.id}
                    className="relative h-[120px] md:h-[300px] lg:h-[20vh]"
                >
                    <Image
                        alt="banner image"
                        src={item.imageString}
                        fill
                        className="object-cover w-full h-full rounded-xl"
                    />
                    <div className="absolute top-1/3 w-full text-black">
                        <h1 className="text-xl sm:text-2xl text-center md:text-4xl font-bold px-4">
                            {item.title}
                        </h1>
                    </div>
                </div>
            ))}
        </>
    );
}
