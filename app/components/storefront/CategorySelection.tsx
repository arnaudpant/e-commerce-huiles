import Image from "next/image";
import Link from "next/link";
import a01 from "@public/a01.jpeg";
import a02 from "@public/a02.jpeg";
import a03 from "@public/a03.jpeg";

export function CategoriesSelection() {
    return (
        <div className="py-24 sm:py-32">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Boutique par catégories
                </h2>
                <Link
                    href="/products/all"
                    className="text-sm font-semibold text-primary hover:text-primary/80"
                >
                    Parcourir tous les produits &rarr;
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
                    <Image
                        src={a01}
                        alt="Image tous les produits"
                        className="object-cover object-center"
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
                    <div className="p-6 flex items-end">
                        <Link href="/products/all">
                            <h3 className="text-white font-semibold">
                                Tous les produits
                            </h3>
                            <p className="mt-1 text-sm text-white">Boutique</p>
                        </Link>
                    </div>
                </div>

                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
                    <Image
                        src={a02}
                        alt="Image huile vegetale"
                        className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <Link href="/products/huileVegetale">
                            <h3 className="text-white font-semibold">
                                Huile végétale
                            </h3>
                            <p className="mt-1 text-sm text-white">Boutique</p>
                        </Link>
                    </div>

                    <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
                        <Image
                            src={a03}
                            alt="Image beurre vegetal"
                            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
                        />
                        <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
                        <div className="p-6 flex items-end sm:absolute sm:inset-0">
                            <Link href="/products/graisseVegetalePure">
                                <h3 className="text-white font-semibold">
                                    Graisse végétale
                                </h3>
                                <p className="mt-1 text-sm text-white">
                                    Boutique
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
