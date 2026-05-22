const About = () => {
  return (
    <div className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate software engineer with a focus on AI-driven solutions and cloud-native architectures.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Research Interest Card */}
          <div className="group relative bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Research Interest</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Particularly interested in <span className="text-emerald-400 font-medium">AI-based software system reconstruction</span> and automated architecture analysis.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                During my research internship at SEMERU Lab, William & Mary, I explored the capabilities and limitations of LLMs in software structure recovery, system mapping, and intelligent code-level reasoning.
              </p>
            </div>
          </div>

          {/* Professional Focus Card */}
          <div className="group relative bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-400">Professional Focus</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                As an <span className="text-blue-400 font-medium">Associate Software Engineer</span> at Streams Tech Ltd., I focused on building ML-integrated web systems, scalable backend architectures, and automated DevOps pipelines.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My work spanned microservice development, and AI-driven solutions that streamline workflows and strengthen systems.
              </p>
            </div>
          </div>

          {/* Core Expertise Card - Full Width */}
          <div className="group relative bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden md:col-span-2">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-purple-400">Core Expertise</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-sm font-medium">ML-Integrated Web Development</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <span className="text-sm font-medium">Microservice Architecture</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                  <span className="text-sm font-medium">DevOps Pipeline Automation</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-sm font-medium">Cloud Infrastructure</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <span className="text-sm font-medium">Containerization</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                  <span className="text-sm font-medium">Geospatial Data Processing</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-sm font-medium">AI-Driven Analysis</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <span className="text-sm font-medium">Large-Scale Data Systems</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
