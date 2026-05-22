import { PageIntro } from "@/components/shared/page-intro";
import { ReportsView } from "../_components/reports-view";

export default function AdminReportsPage() {
  return (
    <>
      <PageIntro
        title="Performance reports"
        description="Institution-wide academic and attendance performance."
      />
      <ReportsView />
    </>
  );
}
