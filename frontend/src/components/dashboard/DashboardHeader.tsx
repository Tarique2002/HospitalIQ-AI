import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          {greeting}, Admin 👋
        </h1>

        <p className="mt-2 text-slate-500 text-lg">
          Welcome back to HospitalIQ AI
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-white border shadow-sm px-5 py-4">

        <CalendarDays
          size={22}
          className="text-blue-600"
        />

        <div>
          <p className="text-sm text-slate-500">
            Today's Date
          </p>

          <p className="font-semibold text-slate-800">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

      </div>

    </div>
  );
}