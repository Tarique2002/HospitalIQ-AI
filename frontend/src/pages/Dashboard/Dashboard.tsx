import { motion } from "framer-motion";
import { useAuthContext } from "../../context/AuthContext";

// Dashboard Components
import HeroHeader from "../../components/dashboard/HeroHeader";
import MetricCards from "../../components/dashboard/MetricCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import AIInsightsPanel from "../../components/dashboard/AIInsightsPanel";
import OccupancyChart from "../../components/dashboard/OccupancyChart";
import AdmissionsChart from "../../components/dashboard/AdmissionsChart";
import DepartmentPerformance from "../../components/dashboard/DepartmentPerformance";
import ForecastPanel from "../../components/dashboard/ForecastPanel";
import AIChatWidget from "../../components/dashboard/AIChatWidget";
import PatientSatisfaction from "../../components/dashboard/PatientSatisfaction";

function FadeUp({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  const { user } = useAuthContext();

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Hero Header */}
      <FadeUp delay={0}>
        <HeroHeader user={user} />
      </FadeUp>

      {/* Metric Cards - Bento Row 1 */}
      <FadeUp delay={0.08}>
        <MetricCards />
      </FadeUp>

      {/* Bento Row 2: Revenue (2/3) + AI Insights (1/3) */}
      <FadeUp delay={0.16}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <AIInsightsPanel />
          </div>
        </div>
      </FadeUp>

      {/* Bento Row 3: Occupancy + Admissions */}
      <FadeUp delay={0.24}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <OccupancyChart />
          <AdmissionsChart />
        </div>
      </FadeUp>

      {/* Bento Row 4: Department Performance (full) */}
      <FadeUp delay={0.32}>
        <DepartmentPerformance />
      </FadeUp>

      {/* Bento Row 5: Forecast + Patient Satisfaction */}
      <FadeUp delay={0.4}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ForecastPanel />
          </div>
          <div>
            <PatientSatisfaction />
          </div>
        </div>
      </FadeUp>

      {/* Bento Row 6: AI Chat Widget (full width) */}
      <FadeUp delay={0.48}>
        <AIChatWidget />
      </FadeUp>
    </div>
  );
}