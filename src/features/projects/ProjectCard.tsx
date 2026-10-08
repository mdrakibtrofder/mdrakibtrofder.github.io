import { Github, Globe } from "lucide-react";
import Tag from "@/components/common/Tag";
import type { Project } from "@/types";

const ProjectCard = ({ project }: { project: Project }) => {
  const isRepo = project.url?.includes("github.com/");
  return (
    <article className="surface surface-hover flex h-full flex-col p-5">
      <p className="eyebrow text-engineering">{project.type.replace(/ Project$/, "")}</p>
      <h3 className="mt-1.5 text-lg font-semibold leading-snug">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <Tag key={t} className="font-mono text-[11px]">
            {t}
          </Tag>
        ))}
      </div>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-engineering underline-offset-4 hover:underline"
        >
          {isRepo ? <Github className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
          {isRepo ? "Source code" : "Open project"}
        </a>
      )}
    </article>
  );
};

export default ProjectCard;
