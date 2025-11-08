// this is where the dashboard will go, kpi and chart and

import { Activity, NotebookTabs, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    Pie,
    PieChart,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { eq_dry } from "../../utils/api";

type json = Record<string, any>;

const checker = (date: string) => {
    const month = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
    };

    const x = date.split(" ");
    const y = `${month[x[1]]}-${x[0]}-${x[2]} ${x[4]} ${x[5]}`;
    const a = new Date(y);
    return a;
};

const dummy_kpis = [
    {
        title: "Highest Recorded Magnitude",
        value: "7.9",
        description: "Highest recorded magnitude was recorded on Brgay 10",
        icon: ShieldAlert,
    },
    {
        title: "Earthquakes",
        value: "10",
        description: "10 Earthquakes recorded",
        icon: NotebookTabs,
    },
    {
        title: "Active Reports",
        value: "5",
        description: "5 Pending Reports",
        icon: Activity,
    },
];

const Index = () => {
    const [dataset, setDataset] = useState<json[]>([]);

    useEffect(() => {
        (async () => {
            const response = await eq_dry();
            const data = [];
            for (const d in response) {
                const _ = checker(d.date_time);
                const __ = new Date().getDate();
                if (__ - _.getDate() < 7) {
                    data.push(d);
                } else {
                    break;
                }
            }
            setDataset(data);
        })();
    }, []);

    return (
        <div className="flex flex-col gap-5 p-5">
            {/* kpis */}
            <div className="flex gap-5">
                {/* kpi */}
                {dummy_kpis.map((kpi, i) => (
                    <KPI
                        key={i}
                        title={kpi.title}
                        value={kpi.value}
                        description={kpi.description}
                        icon={kpi.icon}
                    />
                ))}
            </div>

            {/* charts */}
            <div className="grid grid-cols-4 gap-5 h-full">
                <div className="col-span-3">
                    <EarthquakeTrend data={dataset} />
                </div>
                <div className="col-span-1">
                    <MagnitudeDistribution />
                </div>
            </div>
        </div>
    );
};

const KPI = ({ title, value, description, icon }) => {
    return (
        <div className="flex gap-2 flex-col flex-1 border rounded-md p-5">
            <div className="flex flex-row items-center gap-2">
                <span>
                    <ShieldAlert className="text-red-500 h-7 w-7" />
                </span>
                <span className="text-lg">{value}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-lg">{title}</span>
                <span className="text-sm">{description}</span>
            </div>
        </div>
    );
};

function EarthquakeTrend({ data }: { data: json[] }) {
    const count = []
    const n = 0
    // for (let i in data) {
    //     if () { }
    // }
    return (
        <div className="bg-white p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
                Earthquake Trend (Last 6 Weeks)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#3b82f6"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function MagnitudeDistribution() {
    const data = [
        { name: "0–2", value: 45 },
        { name: "2–4", value: 35 },
        { name: "4–6", value: 15 },
        { name: "6+", value: 5 },
    ];

    const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#ef4444"];

    return (
        <div className="bg-white p-4 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-4">Magnitude Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Index;
