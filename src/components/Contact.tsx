
import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "mdrakibtrofder@gmail.com",
      href: "mailto:mdrakibtrofder@gmail.com",
      color: "text-emerald-400"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+8801939649428",
      href: "tel:+8801939649428",
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
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, 
            and collaborations in DevOps, cloud infrastructure, and software engineering.
          </p>
          <p className="text-gray-400">
            Feel free to reach out through any of the following channels:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : '_self'}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
              className="bg-slate-800/40 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`${contact.color} group-hover:scale-110 transition-transform`}>
                  {contact.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{contact.label}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {contact.value}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
        
      </div>
      
      <div className="mt-16 text-center">
        <div className="border-t border-slate-700 pt-8">
          <p className="text-gray-500">
            © 2024 Md. Rakib Trofder
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
