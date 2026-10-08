import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Section from "@/components/common/Section";
import { profile } from "@/data";

const ContactSection = () => {
  const { contact, socials } = profile;
  const items = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: Linkedin, label: "LinkedIn", value: "mdrakibtrofder", href: socials.linkedin },
    { icon: Github, label: "GitHub", value: "mdrakibtrofder", href: socials.github },
    { icon: MapPin, label: "Location", value: profile.location },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      description="Students with course questions, collaborators on research, and teams looking for software or DevOps help are all welcome to reach out."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, label, value, href }) => {
          const body = (
            <>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="truncate font-medium">{value}</p>
              </div>
            </>
          );
          return href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="surface surface-hover flex items-center gap-4 p-4"
            >
              {body}
            </a>
          ) : (
            <div key={label} className="surface flex items-center gap-4 p-4">
              {body}
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ContactSection;
