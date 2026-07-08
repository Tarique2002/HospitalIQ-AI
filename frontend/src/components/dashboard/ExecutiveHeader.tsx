import {
  Activity,
  Bell,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function ExecutiveHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 shadow-xl">

      <div className="flex flex-col lg:flex-row justify-between gap-8">

        {/* Left */}

        <div>

          <p className="text-blue-300 font-medium">
            HospitalIQ AI
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Good Morning, Tarique 👋
          </h1>

          <p className="text-slate-300 mt-3">
            {today}
          </p>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

            <div className="flex items-center gap-2 text-blue-300">

              <Activity size={20} />

              <span>Hospital Health</span>

            </div>

            <h2 className="text-3xl font-bold mt-3">
              94%
            </h2>

          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

            <div className="flex items-center gap-2 text-green-300">

              <ShieldCheck size={20} />

              <span>AI Status</span>

            </div>

            <h2 className="text-3xl font-bold mt-3">
              Active
            </h2>

          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

            <div className="flex items-center gap-2 text-yellow-300">

              <Bell size={20} />

              <span>Alerts</span>

            </div>

            <h2 className="text-3xl font-bold mt-3">
              5
            </h2>

          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

            <div className="flex items-center gap-2 text-cyan-300">

              <Clock3 size={20} />

              <span>Last Sync</span>

            </div>

            <h2 className="text-xl font-semibold mt-3">
              Just Now
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}