import Link from "next/link";

export const navbarLinks = [

    {
        id: 1,
        name: "Toutes les huiles",
        href: "/products/all",
    },
    {
        id: 2,
        name: "Huiles végétales",
        href: "/products/huile-vegetale",
    },
    {
        id: 3,
        name: "Graisses végétales pures",
        href: "/products/graisse-vegetale-pure",
    },
    {
        id: 4,
        name: "Huiles végétales composées",
        href: "/products/huile-vegetale-composee",
    },
    {
        id: 5,
        name: "Huiles aromatiques",
        href: "/products/huile-aromatique",
    },
    {
        id: 6,
        name: "Huiles essentielles",
        href: "/products/huile-essentielle",
    },
];

export function NavbarLinks(){
    return (
        <div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
            {navbarLinks.map((item) => (
                <Link href={item.href} key={item.id} className="font-medium text-sm hover:text-primary">{item.name}</Link>
            ))}

        </div>
    )
}