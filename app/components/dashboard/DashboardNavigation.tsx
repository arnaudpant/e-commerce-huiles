import Link from "next/link";

const links = [
    {
        name: "Dashboard",
        href: "/dasboard",
    },
    {
        name: "Orders",
        href: "/dasboard/orders",
    },
    {
        name: "Products",
        href: "/dasboard/products",
    },
    {
        name: "Categories",
        href: "/dasboard/categories",
    },
];

const DashboardNavigation = () => {
    return (
        <>
            {
                links.map((link) => (
                    <Link key={link.href} href={link.href}>{link.name}</Link>
                ))
            }
        </>
    );
};

export default DashboardNavigation;
