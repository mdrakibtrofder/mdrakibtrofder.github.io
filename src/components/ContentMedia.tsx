import { Youtube, MapPin, PenTool, BookOpen, Code, ExternalLink, Play, Star, Heart, Share2, Feather } from "lucide-react";

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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Vlogs & Local Guide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring the world through travel vlogs and helping others discover great places as a Google Top Local Guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Card */}
          <a 
            href={vlogs?.youtube} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">YouTube Channel</h3>
                  <p className="text-red-100/80 text-sm">Travel & Life Vlogs</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Join my journey as I explore new places, capture unique cultures, and share authentic experiences through engaging video content.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  Watch Now
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>

          {/* Google Maps Local Guide Card */}
          <a 
            href={vlogs?.google_maps} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Google Local Guide</h3>
                  <p className="text-blue-100/80 text-sm">Top Contributor</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Helping millions discover the best local spots through detailed reviews, photos, and recommendations based on real experiences.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  View Profile
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Writings */}
      <section id="writings" className="max-w-6xl mx-auto py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <PenTool className="w-8 h-8 text-emerald-500" /> Writings
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring thoughts, life, and daily inspirations through personal blogging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Trofder Blog Card */}
          <a 
            href="https://mdrakibtrofder.blogspot.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Feather className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Trofder Blog</h3>
                  <p className="text-violet-100/80 text-sm">Personal Blog</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Thoughts on technology, life experiences, and personal reflections shared through writing.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  Read Now
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>

          {/* Trofder Thoughts Card */}
          <a 
            href="https://trofderthoughts.blogspot.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Trofder Thoughts</h3>
                  <p className="text-amber-100/80 text-sm">Thoughts & Ideas</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Deep dives into ideas, philosophical explorations, and thoughtful discussions on various topics.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  Explore
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>

          {/* Daily Motivation Card */}
          <a 
            href="https://dailymotivationalinsights.blogspot.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-rose-600 to-pink-700 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-rose-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Daily Motivation</h3>
                  <p className="text-rose-100/80 text-sm">Inspiration Blog</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Daily doses of inspiration, motivational insights, and positive energy to fuel your journey.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  Get Inspired
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Technical Content */}
      <section id="technical-content" className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-6">
            Knowledge Sharing
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Technical Content
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Demystifying complex programming concepts through tutorials, blogs, and detailed case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Programming Blog Card */}
          <a 
            href={technical.blog} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Programming Blog</h3>
                  <p className="text-blue-100/80 text-sm">Tech Tutorials</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Dedicated platform for technical articles, coding patterns, and software engineering deep-dives.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  Visit Blog
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>

          {/* Tech YouTube Card */}
          <a 
            href={technical.youtube} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Tech YouTube</h3>
                  <p className="text-red-100/80 text-sm">Video Tutorials</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Visual tutorials on full-stack development, AWS, Python, and system architecture.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  Watch Now
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>

          {/* Medium Card */}
          <a 
            href={technical.medium} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-500/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Medium Articles</h3>
                  <p className="text-slate-100/80 text-sm">Tech Writing</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Professional tech articles and research summaries shared with the global developer community.
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <div className="text-white/90 font-medium text-lg">
                  Read Now
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>
        </div>
      </section>

    </div>
  );
};

export default ContentMedia;
