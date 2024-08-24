import { Charts } from "../components/dashboard/Charts";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSales } from "../components/dashboard/RecenSales";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import prisma from "../lib/db";

// async function getData() {
//     const now = new Date();
//     const seventDaysAgo = new Date();
//     seventDaysAgo.setDate(now.getDate() - 7);
   
//     const data = await prisma.order.findMany({
//         where: {
//             createdAt: {
//                 gte: seventDaysAgo,
//             },
//         },
//         select: {
//             amount: true,
//             createdAt: true,
//         },
//         orderBy: {
//             createdAt: "asc",
//         },
//     });

//     const result = data.map((item) => ({
//         date: new Intl.DateTimeFormat("fr-FR").format(item.createdAt),
//         revenus: item.amount / 100,
//     }));

//     return result;
// }
export default async function Dasboard() {
    //const data = await getData()
    return (
        <>
            <DashboardStats />
            {/* <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                        Transactions récentes de votre boutique:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Charts data={data}  />
                </CardContent>
            </Card> */}
            <RecentSales />
        </>
    );
}
