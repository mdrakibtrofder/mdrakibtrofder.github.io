import { useMemo, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import Section from "@/components/common/Section";
import { teaching } from "@/data";
import { cn } from "@/lib/utils";
import CourseCard from "./CourseCard";

const ALL = "All semesters";

const TeachingSection = () => {
  const { courses, counseling } = teaching;

  // Semesters in the order they appear in teaching.json (newest first).
  const semesters = useMemo(() => [...new Set(courses.map((c) => c.semester))], [courses]);
  const [active, setActive] = useState(semesters[0] ?? ALL);

  const visible = active === ALL ? courses : courses.filter((c) => c.semester === active);
  const theory = visible.filter((c) => c.type === "Theory").length;

  return (
    <Section
      id="teaching"
      eyebrow="Teaching"
      accent="academic"
      title="Courses"
      description="Undergraduate theory and lab courses I teach at the Department of CSE, BAUST. Several have their own interactive course sites."
    >
      {/* Counseling hours */}
      <div className="mb-8 grid gap-4 rounded-2xl border border-academic/20 bg-academic-soft/60 p-5 sm:grid-cols-2">
        <div className="flex gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-academic" />
          <div>
            <p className="font-semibold">Counseling hours</p>
            {counseling.hours.map((h) => (
              <p key={h} className="text-sm text-muted-foreground">
                {h}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-academic" />
          <div>
            <p className="font-semibold">{counseling.room}</p>
            <p className="text-sm text-muted-foreground">{counseling.institution}</p>
          </div>
        </div>
      </div>

      {/* Semester filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="Semester">
        {[...semesters, ALL].map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={active === s}
            onClick={() => setActive(s)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === s ? "border-academic bg-academic text-white dark:text-slate-950" : "bg-card hover:bg-secondary",
            )}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground">
          {visible.length} courses · {theory} theory · {visible.length - theory} sessional
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course) => (
          <CourseCard key={`${course.semester}-${course.code}`} course={course} />
        ))}
      </div>
    </Section>
  );
};

export default TeachingSection;
