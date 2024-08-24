import {
    Euro,
    PartyPopper,
    ShoppingBag,
    User2,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSales } from "../components/dashboard/RecenSales";

export default function Dasboard() {
    return (
        <>
        <DashboardStats />
        <RecentSales />
        </>
    );
}
