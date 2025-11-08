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
import { getData } from "../../utils/data";

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

interface KPIProps {
  title: string;
  value: string | number;
  description: string;
  icon: unknown;
}

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
  const [dataset, setDataset] = useState<json[]>(getData("mapdata") ?? []);
  const [kpi, setKPI] = useState<KPIProps[]>([]);

  useEffect(() => {
    (async () => {
      const response = await eq_dry();
      for (const i in response) {
        if (!response[i]["magnitude"]) {
          response[i]["magnitude"] = 0;
        } else if (response[i]["magnitude"] === null) {
          response[i]["magnitude"] = 0;
        }
      }

      const data = [];
      let today = 0;
      setKPI([]);
      for await (const d of response) {
        const _ = checker(d.date_time);
        const __ = new Date().getDate();
        if (__ === _.getDate()) {
          today++;
        }
        if (__ - _.getDate() < 8) {
          data.push(d);
        } else {
          break;
        }
      }

      setDataset(data);

      response.sort((a, b) => (a.magnitude > b.magnitude ? 1 : -1));

      setKPI([
        {
          title: "Highest Recorded Magnitude",
          description: `Recorded in ${response[response.length - 1]["location"]} - ${response[response.length - 1]["date_time"]}`,
          value: response[response.length - 1]["magnitude"],
          icon: Activity,
        },
        {
          title: "Today's Recorded Earthquakes",
          value: today,
          description: `${today} Earthquakes recorded today`,
          icon: NotebookTabs,
        },
        {
          title: "Active Reports",
          value: "5",
          description: "5 Pending Reports",
          icon: Activity,
        },
      ]);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* kpis */}
      <div className="flex gap-5">
        {/* kpi */}
        {kpi.map((kpi, i) => (
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
  console.log(data);

  const count = [];
  let n = 0;
  let d = checker(data[0].date_time);
  for (const i of data) {
    const t = checker(i.date_time);
    const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
    const e = `${t.getMonth() + 1}-${t.getDate()}-${t.getFullYear()}`;

    if (e === date) {
      n++;
    } else {
      count.push({
        day: date,
        count: n,
      });
      d = checker(i.date_time);
      n = 1;
    }
  }
  return (
    <div className="bg-white p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        Earthquake Trend (Last 7 Days)
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={count}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
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
