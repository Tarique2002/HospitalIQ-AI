import {
  Users,
  Bed,
  IndianRupee,
  UserRoundCheck,
  TrendingUp,
} from "lucide-react";

import { useDashboard } from "../../hooks/useDashboard";

export default function KPICards() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white border p-6 shadow-sm">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  const cards = [
    {
      title: "Patients",
      value: data.total_patients.toLocaleString(),
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
      trend: "+4.2%",
    },
    {
      title: "Doctors",
      value: data.total_doctors.toLocaleString(),
      icon: UserRoundCheck,
      bg: "bg-green-100",
      color: "text-green-600",
      trend: "+1.8%",
    },
    {
      title: "Beds",
      value: data.total_beds.toLocaleString(),
      icon: Bed,
      bg: "bg-orange-100",
      color: "text-orange-600",
      trend: "+0%",
    },
    {
      title: "Revenue",
      value: `₹ ${(data.total_revenue / 10000000).toFixed(2)} Cr`,
      icon: IndianRupee,
      bg: "bg-violet-100",
      color: "text-violet-600",
      trend: "+12.5%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            p-6
          "
        >
          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-500 font-medium">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-900">
                {card.value}
              </h2>

            </div>

            <div
              className={`
                ${card.bg}
                p-4
                rounded-2xl
              `}
            >
              <card.icon
                className={card.color}
                size={30}
              />
            </div>

          </div>

          <div className="mt-8 flex items-center gap-2">

            <TrendingUp
              size={18}
              className="text-green-600"
            />

            <span className="text-green-600 font-semibold">
              {card.trend}
            </span>

            <span className="text-slate-400 text-sm">
              vs last month
            </span>

          </div>

        </div>
      ))}
    </div>
  );
}