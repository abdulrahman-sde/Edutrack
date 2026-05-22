import { PageIntro } from "@/components/shared/page-intro";
import { OverviewStats } from "./_components/overview-stats";
import { ClassOverview } from "./_components/class-overview";
import { RecentTeachers } from "./_components/recent-teachers";

export default function AdminOverviewPage() {
  return (
    <>
      <PageIntro
        title="Institution overview"
        description="A snapshot of teachers, students, and classes across the school."
      />
      <div className="space-y-6">
        <OverviewStats />
        <div className="grid gap-6 lg:grid-cols-2">
          <ClassOverview />
          <RecentTeachers />
        </div>
      </div>
    </>
  );
}
