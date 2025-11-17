
const Education = ({ education }: {
  education: {
    degree: string;
    institute: string;
    duration: string;
    result?: string;
    cgpa?: string;
    achievements: string[];
    logo?: string; // Added logo field
  }[];
}) => {
  return (
    <div className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Education
        </h2>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-slate-800/40 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={edu.logo || "/placeholder.svg"} // Use logo if available, else placeholder
                    alt={`${edu.institute} logo`}
                    className="w-20 h-20 rounded-lg object-contain bg-white/5 p-2 border border-slate-600"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-emerald-400 mb-1">
                        {edu.degree}
                      </h3>
                      <h4 className="text-lg text-white font-medium">
                        {edu.institute}
                      </h4>
                      <p className="text-gray-400">
                        {edu.achievements.join(", ")}
                      </p>
                    </div>
                    
                    <div className="mt-2 md:mt-0 text-left md:text-right">
                      <span className="bg-indigo-400/10 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                        {edu.cgpa ? `CGPA: ${edu.cgpa}`: edu.result}
                      </span>
                      <p className="text-gray-400 mt-2">{edu.duration}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-500/20">
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-400 font-semibold">Academic Performance:</span>
                      <span className="text-white font-bold text-lg">{edu.cgpa ? edu.cgpa : edu.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
