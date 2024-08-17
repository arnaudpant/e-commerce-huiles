import Image from "next/image";
import Link from "next/link";
import allProducts from "/public/Bouteilles/Huile vierge de colza 1.jpeg";
import huileVegetale from "/public/Bouteilles/Huile vierge de colza 2.jpeg";
import graisseVegetale from "/public/Bouteilles/Beurre vierge de Noix de Karité.jpeg";

export function CategoriesSelection() {
    return (
        <div className="py-24 sm:py-32">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Boutique
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
                        src={allProducts}
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
                        src={huileVegetale}
                        alt="Image huile vegetale"
                        className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <Link href="/products/huileVegetale">
                            <h3 className="text-white font-semibold">
                                Huiles végétales
                            </h3>
                            <p className="mt-1 text-sm text-white">Boutique</p>
                        </Link>
                    </div>
                </div>

                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
                    <Image
                        src={graisseVegetale}
                        alt="Image beurre vegetal"
                        className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
                    />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <Link href="/products/graisseVegetalePure">
                            <h3 className="text-white font-semibold">
                                Graisses végétales
                            </h3>
                            <p className="mt-1 text-sm text-white">Boutique</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
