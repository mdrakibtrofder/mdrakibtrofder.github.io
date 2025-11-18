
import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";

const Contact = ({ contact, links }: {
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  links: string[];
}) => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: "text-emerald-400"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: "text-blue-400"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "mdrakibtrofder",
      href: "https://github.com/mdrakibtrofder",
      color: "text-purple-400"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "mdrakibtrofder",
      href: "https://www.linkedin.com/in/mdrakibtrofder/",
      color: "text-cyan-400"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: "#",
      color: "text-pink-400"
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        
        <div className="text-center mb-12">
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, 
            and collaborations in DevOps, Machine Learning, AI systems, modern web development,
            cloud infrastructure, and software engineering.
          </p>
          <p className="text-muted-foreground">
            Feel free to reach out through any of the following channels:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((contactItem, index) => (
            <a
              key={index}
              href={contactItem.href}
              target={contactItem.href.startsWith('http') ? '_blank' : '_self'}
              rel={contactItem.href.startsWith('http') ? 'noopener noreferrer' : ''}
              className="bg-secondary/40 rounded-lg p-6 border border hover:border-primary transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`${contactItem.color} group-hover:scale-110 transition-transform`}>
                  {contactItem.icon}
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">{contactItem.label}</h3>
                  <p className="text-muted-foreground group-hover:text-muted-foreground transition-colors">
                    {contactItem.value}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
        
      </div>
      
      <div className="mt-16 text-center">
        <div className="border-t border pt-8">
          <p className="text-muted-foreground">
            © 2024 Md. Rakib Trofder
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
