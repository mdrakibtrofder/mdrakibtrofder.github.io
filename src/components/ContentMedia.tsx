
import { Youtube, MapPin, PenTool, Hash, BookOpen, Presentation, Code, Globe, ExternalLink } from "lucide-react";

interface ContentMediaProps {
  vlogs: {
    youtube: string;
    google_maps: string;
  };
  writings: string[];
  technical: {
    blog: string;
    youtube: string;
    medium: string;
  };
}

const ContentMedia = ({ vlogs, writings, technical }: ContentMediaProps) => {
  return (
    <div className="space-y-24 py-24 px-4 bg-background">
      
      {/* Vlogs & Local Guide */}
      <section id="vlogs" className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Vlogs & Local Guide
            </h2>
            <p className="text-muted-foreground text-lg">
              Exploring the world, sharing experiences through travel vlogs, and contributing as a Google Top Local Guide.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a 
              href={vlogs.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-600/10 text-red-500 border border-red-600/20 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center"
            >
              <Youtube className="w-5 h-5 mr-2" /> YouTube Channel
            </a>
            <a 
              href={vlogs.google_maps} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-600/20 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center"
            >
              <MapPin className="w-5 h-5 mr-2" /> Google Local Guide
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative rounded-3xl overflow-hidden aspect-video bg-secondary/30 border border-white/5 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <span className="text-red-500 font-bold text-sm tracking-widest uppercase mb-2">Platform</span>
                    <h3 className="text-2xl font-bold text-white mb-4">Sharing Journeys on YouTube</h3>
                    <p className="text-white/70 line-clamp-2 mb-6">Join my vlog journey where I capture the essence of different places and cultures.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80" alt="Vlog thumbnail" className="absolute inset-0 -z-10 object-cover group-hover:scale-110 transition-transform duration-700 opacity-40" />
            </div>
            <div className="group relative rounded-3xl overflow-hidden aspect-video bg-secondary/30 border border-white/5 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <span className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-2">Community</span>
                    <h3 className="text-2xl font-bold text-white mb-4">Google Maps Top Contributor</h3>
                    <p className="text-white/70 line-clamp-2 mb-6">Helping millions of people find the best places through detailed reviews and photos.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" alt="Map thumbnail" className="absolute inset-0 -z-10 object-cover group-hover:scale-110 transition-transform duration-700 opacity-40" />
            </div>
        </div>
      </section>

      {/* Writings */}
      <section id="writings" className="max-w-6xl mx-auto py-12">
        <div className="bg-gradient-to-br from-secondary/40 to-background border border-white/5 rounded-[40px] p-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
                    <PenTool className="w-8 h-8 mr-4 text-emerald-400" /> Writings
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Exploring thoughts, life, and daily inspirations through personal blogging.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {writings.map((url, i) => {
                    const domain = new URL(url).hostname;
                    const name = domain.split('.')[0];
                    return (
                        <a 
                            key={i} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-secondary/40 hover:bg-secondary/60 border border-white/5 hover:border-emerald-500/30 p-8 rounded-3xl transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                <BookOpen className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 capitalize">{name.replace(/-/g, ' ')}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{domain}</p>
                            <div className="flex items-center text-emerald-400 text-sm font-medium">
                                Read Blog <ExternalLink className="w-3.5 h-3.5 ml-2" />
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
      </section>

      {/* Technical Content */}
      <section id="technical-content" className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-6">
                Knowledge Sharing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Content</h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
                Demystifying complex programming concepts through tutorials, blogs, and detailed case studies.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-secondary/20 border border-white/5 rounded-3xl p-8 hover:bg-secondary/30 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6">
                    <Code className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Programming with Trofder Blog</h3>
                <p className="text-muted-foreground mb-8 text-sm">Dedicated platform for technical articles, coding patterns, and software engineering deep-dives.</p>
                <a href={technical.blog} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                    Visit Blog <Globe className="w-4 h-4 ml-2" />
                </a>
            </div>

            <div className="bg-secondary/20 border border-white/5 rounded-3xl p-8 hover:bg-secondary/30 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-red-600/10 flex items-center justify-center mb-6">
                    <Youtube className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Technical YouTube</h3>
                <p className="text-muted-foreground mb-8 text-sm">Visual tutorials on full-stack development, AWS, Python, and system architecture.</p>
                <a href={technical.youtube} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center px-6 py-2.5 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
                    Watch Tutorials <Youtube className="w-4 h-4 ml-2" />
                </a>
            </div>

            <div className="bg-secondary/20 border border-white/5 rounded-3xl p-8 hover:bg-secondary/30 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-6">
                    <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Medium Articles</h3>
                <p className="text-muted-foreground mb-8 text-sm">Professional tech articles and research summaries shared with the global developer community.</p>
                <a href={technical.medium} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center px-6 py-2.5 rounded-full bg-zinc-800 text-white font-medium hover:bg-zinc-950 transition-colors border border-white/10">
                    Read Medium <ExternalLink className="w-4 h-4 ml-2" />
                </a>
            </div>
        </div>
      </section>

    </div>
  );
};

export default ContentMedia;
