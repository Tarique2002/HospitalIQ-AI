import {
  TrendingUp,
  Users,
  Bed,
  IndianRupee,
} from "lucide-react";

import { useExecutive } from "../../hooks/useExecutive";


export default function ExecutiveKPIStrip() {

  const { data, isLoading, isError } = useExecutive();

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white border shadow-sm p-6">
        Loading executive KPIs...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl bg-white border shadow-sm p-6">
        Failed to load executive KPIs.
      </div>
    );
  }

  const kpis = [
    {
      title: "Revenue Growth",
      value: `${data.revenue_growth}%`,
      subtitle: "This Month",
      icon: TrendingUp,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },
    {
      title: "Admissions",
      value: `${data.admission_growth}%`,
      subtitle: "Today",
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Occupancy",
      value: `${data.occupancy}%`,
      subtitle: "Healthy",
      icon: Bed,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Avg Revenue",
      value: `₹${Math.round(
        data.avg_revenue_per_patient
      ).toLocaleString("en-IN")}`,
      subtitle: "Per Patient",
      icon: IndianRupee,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      {kpis.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl bg-white border shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {item.value}
              </h2>

              <p className="text-sm text-emerald-600 mt-3">
                ↑ {item.subtitle}
              </p>

            </div>

            <div
              className={`${item.bg} p-4 rounded-2xl`}
            >
              <item.icon
                className={item.color}
                size={28}
              />
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}