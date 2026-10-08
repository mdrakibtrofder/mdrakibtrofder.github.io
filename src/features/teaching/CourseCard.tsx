import { BookOpen } from "lucide-react";
import ExternalLink from "@/components/common/ExternalLink";
import Tag from "@/components/common/Tag";
import { getIcon } from "@/lib/icons";
import type { Course } from "@/types";

const CourseCard = ({ course }: { course: Course }) => {
  const Icon = getIcon(course.icon, BookOpen);
  return (
    <article className="surface surface-hover flex h-full flex-col p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-academic-soft text-academic">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-medium text-muted-foreground">{course.code}</span>
            <Tag tone={course.type === "Theory" ? "academic" : "outline"}>{course.type}</Tag>
          </div>
          <h4 className="mt-1 font-semibold leading-snug">{course.title}</h4>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
      {course.url && (
        <ExternalLink href={course.url} className="mt-4 text-academic">
          Course material
        </ExternalLink>
      )}
    </article>
  );
};

export default CourseCard;
