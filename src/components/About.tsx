
const About = () => {
  return (
    <div className="py-12 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-lg p-6 border border">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">Research Interest</h3>
              <p className="text-muted-foreground leading-relaxed">
                I am particularly interested in AI-based software system reconstruction and automated architecture analysis. During my research internship at SEMERU Lab, William & Mary, I explored the capabilities and limitations of LLMs in software structure recovery, system mapping, and intelligent code-level reasoning.
              </p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-6 border border">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">Professional Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                As an Associate Software Engineer at Streams Tech Ltd., I focused on building ML-integrated web systems, scalable backend architectures, and automated DevOps pipelines. My work spanned microservice development, cloud-native infrastructure, and AI-driven solutions that streamline workflows and strengthen system
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-lg p-6 border border-emerald-400/20">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">Core Expertise</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>ML-Integrated Web Development</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Microservice & Backend Architecture</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>DevOps Pipeline Automation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Cloud and On Premise Infrastructure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Containerization & Orchestration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Geospatial & Large-Scale Data Processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>AI-Driven Software Analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
