import { ReactNode } from "react";
import DashboardNavigation from "../components/dashboard/DashboardNavigation";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { CircleUser, MenuIcon } from "lucide-react";
// import { unstable_noStore as noStore } from "next/cache";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
    getKindeServerSession,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    // noStore()
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.id !== "kp_c1eaeaf06ad04886870c4f0a12e182d1") {
        return redirect("/");
    }

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="sticky top-0 h-16 flex items-center justify-between gap-4 border-b bg-white">
                <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href="/dashboard"><p className="text-primary">Dashboard</p></Link>
                    <DashboardNavigation />
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="shrink-0 md:hidden"
                            variant="outline"
                            size="icon"
                        >
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-6 text-lg font-medium">
                            <DashboardNavigation />
                        </nav>
                    </SheetContent>
                </Sheet>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full"
                        >
                            <CircleUser className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <LogoutLink>Déconnexion</LogoutLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="my-5">{children}</main>
        </div>
    );
}
