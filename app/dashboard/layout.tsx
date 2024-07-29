import { ReactNode } from "react";
import DashboardNavigation from "../components/dashboard/DashboardNavigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="sticky top-0 h-16 flex items-center justify-between gap-4 border-b bg-white">
                <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <DashboardNavigation />
                </nav>
            </header>
            {children}
        </div>
    );
}
