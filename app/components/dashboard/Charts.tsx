'use client'

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type ChartsDataType = {
    data: {
        date: string,
        revenus: number
    }[]
}

const aggregateData = (data: any) => {
    const aggregated = data.reduce((acc: any, curr: any) => {
        if(acc[curr.date]){
            acc[curr.date] += curr.revenus
        } else {
            acc[curr.date = curr.revenus]
        }
        return acc
    }, {})

    return Object.keys(aggregated).map((date) => ({
        date,
        revenus: aggregated[date]
    }))
}


export function Charts({ data }: ChartsDataType) {
    const processData = aggregateData(data)
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    dataKey="revenus"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
