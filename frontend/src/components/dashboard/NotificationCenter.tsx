import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";

type Notification = {
  title: string;
  type: string;
  time: string;
};

export default function NotificationCenter() {

  const { data, isLoading, isError } = useNotifications();

  if (isLoading)
    return (
      <div className="rounded-3xl bg-white border shadow-sm p-8">
        Loading notifications...
      </div>
    );

  if (isError || !data)
    return (
      <div className="rounded-3xl bg-white border shadow-sm p-8">
        Failed to load notifications.
      </div>
    );

  const icon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <CheckCircle2
            className="text-green-600"
            size={22}
          />
        );

      case "warning":
        return (
          <AlertTriangle
            className="text-yellow-500"
            size={22}
          />
        );

      case "danger":
        return (
          <XCircle
            className="text-red-500"
            size={22}
          />
        );

      default:
        return (
          <Info
            className="text-blue-500"
            size={22}
          />
        );
    }
  };

  return (
    <div className="rounded-3xl bg-white border shadow-sm p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-blue-100 p-3 rounded-xl">

          <Bell
            className="text-blue-600"
            size={28}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Live Notification Center
          </h2>

          <p className="text-slate-500">
            Latest Hospital Activity
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {data.map(
          (
            item: Notification,
            index: number
          ) => (

            <div
              key={index}
              className="flex justify-between items-center p-4 rounded-xl border hover:bg-slate-50 transition"
            >

              <div className="flex items-center gap-4">

                {icon(item.type)}

                <div>

                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.time}
                  </p>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}