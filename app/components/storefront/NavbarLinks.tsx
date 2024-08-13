import Link from "next/link";

export const navbarLinks = [
    {
        id: 0,
        name: "Accueil",
        href: "/",
    },
    {
        id: 1,
        name: "Toutes les huiles",
        href: "/products/all",
    },
    {
        id: 2,
        name: "Huile végétale",
        href: "/products/huile-vegetale",
    },
    {
        id: 3,
        name: "Graisse végétale pure",
        href: "/products/graisse-vegetale-pure",
    },
    {
        id: 4,
        name: "Huile végétale composée",
        href: "/products/huile-vegetale-composee",
    },
    {
        id: 5,
        name: "Huile aromatique",
        href: "/products/huile-aromatique",
    },
    {
        id: 6,
        name: "Huile essentielle",
        href: "/products/huile-essentielle",
    },
];

export function NavbarLinks(){
    return (
        <div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
            {navbarLinks.map((item) => (
                <Link href={item.href} key={item.id} className="font-medium">{item.name}</Link>
            ))}

        </div>
    )
}