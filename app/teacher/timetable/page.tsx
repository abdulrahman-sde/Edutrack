import { PageIntro } from "@/components/shared/page-intro";
import { TeacherTimetable } from "../_components/teacher-timetable";

export default function TimetablePage() {
  return (
    <>
      <PageIntro title="My Timetable" description="Your weekly class schedule at a glance." />
      <TeacherTimetable />
    </>
  );
}
