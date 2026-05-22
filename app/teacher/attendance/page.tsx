import { PageIntro } from "@/components/shared/page-intro";
import { AttendanceSection } from "../_components/attendance-section";

export default function TeacherAttendancePage() {
  return (
    <>
      <PageIntro
        title="Mark attendance"
        description="Tap a status for each student, then save the session."
      />
      <AttendanceSection />
    </>
  );
}
