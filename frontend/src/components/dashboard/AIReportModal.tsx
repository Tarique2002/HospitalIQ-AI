import { X, Download, Brain } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  report: {
    total_revenue: number;
    occupancy: number;
    summary: string;
    recommendations: string[];
  } | null | undefined;
};

export default function AIReportModal({
  open,
  onClose,
  report,
}: Props) {
  if (!open || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">

            <Brain
              className="text-violet-600"
              size={30}
            />

            <div>

              <h2 className="text-3xl font-bold">
                HospitalIQ AI Report
              </h2>

              <p className="text-slate-500">
                Generated just now
              </p>

            </div>

          </div>

          <button onClick={onClose}>

            <X size={28} />

          </button>

        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="rounded-xl bg-slate-100 p-5">
            <p className="text-slate-500">
              Revenue
            </p>

            <h3 className="text-3xl font-bold mt-2">
              ₹ {(report.total_revenue / 10000000).toFixed(2)} Cr
            </h3>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <p className="text-slate-500">
              Occupancy
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {report.occupancy}%
            </h3>
          </div>

        </div>

        <div className="mb-8">

          <h3 className="font-bold text-xl mb-2">
            AI Summary
          </h3>

          <p className="text-slate-700 leading-7">
            {report.summary}
          </p>

        </div>

        <div>

          <h3 className="font-bold text-xl mb-4">
            Recommendations
          </h3>

          <div className="space-y-3">

            {report.recommendations.map(
              (item: string, index: number) => (

                <div
                  key={index}
                  className="rounded-lg bg-green-50 p-4"
                >
                  ✅ {item}
                </div>

              )
            )}

          </div>

        </div>

        <button
          className="
            mt-8
            w-full
            rounded-xl
            bg-violet-600
            text-white
            py-4
            flex
            justify-center
            items-center
            gap-3
          "
        >
          <Download size={20} />

          Download PDF
        </button>

      </div>

    </div>
  );
}