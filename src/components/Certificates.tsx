
import { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Grid2X2, 
  List, 
  Calendar, 
  Building2, 
  ExternalLink,
  ChevronDown,
  Award,
  Image as ImageIcon,
  Clock,
  ArrowUpDown
} from "lucide-react";
import { format, parse } from "date-fns";
import certificateData from "../../public/certificates/certificate_details.json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Certificate {
  id: string;
  type: string;
  issued_to: string;
  organization: string;
  course_name: string;
  signed_by: string;
  issued_date: string;
  credential_id: string | null;
  is_sensitive_certificate: boolean;
  image: string | null;
}

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(12);

  const parseDate = (dateStr: string) => {
    if (!dateStr || dateStr === "N/A") return new Date(0);
    
    // Try multiple formats
    const formats = [
      "MMM d, yyyy",
      "MMMM d, yyyy",
      "d MMMM, yyyy",
      "dd/MM/yy",
      "MM/dd/yyyy",
      "yyyy",
      "d MMM yyyy",
      "MMM yyyy",
      "dd.MM.yyyy"
    ];

    for (const f of formats) {
      try {
        const d = parse(dateStr, f, new Date());
        if (!isNaN(d.getTime())) return d;
      } catch (e) {
        // ignore
      }
    }

    // Manual fallback for odd cases
    if (dateStr.match(/^\d{4}$/)) return new Date(parseInt(dateStr), 0, 1);
    
    return new Date(0);
  };

  const filteredAndSortedCertificates = useMemo(() => {
    let result = (certificateData as Certificate[]).filter(cert => !cert.is_sensitive_certificate);

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(cert => 
        cert.course_name.toLowerCase().includes(lowerQuery) ||
        cert.organization.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedOrg !== "All") {
      result = result.filter(cert => cert.organization.includes(selectedOrg));
    }

    if (selectedType !== "All") {
      result = result.filter(cert => cert.type.toLowerCase().includes(selectedType.toLowerCase()));
    }

    result.sort((a, b) => {
      const dateA = parseDate(a.issued_date);
      const dateB = parseDate(b.issued_date);
      return sortBy === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return result;
  }, [searchQuery, selectedOrg, selectedType, sortBy]);

  const organizations = useMemo(() => {
    const orgs = new Set((certificateData as Certificate[]).map(c => {
      // Extract main org name for filtering
      if (c.organization.includes("Google")) return "Google";
      if (c.organization.includes("IBM")) return "IBM";
      if (c.organization.includes("Michigan")) return "University of Michigan";
      if (c.organization.includes("HackerRank")) return "HackerRank";
      if (c.organization.includes("Coursera")) return "Coursera";
      if (c.organization.includes("Ministry")) return "Ministry of Education";
      return c.organization.split(",")[0];
    }));
    return ["All", ...Array.from(orgs).sort().slice(0, 15)]; // Limit to 15 major ones or manually curate
  }, []);

  const types = ["All", "Course", "Participation", "Achievement", "Honour", "Excellence"];

  const currentCertificates = filteredAndSortedCertificates.slice(0, visibleCount);

  return (
    <section id="certificates" className="relative py-24 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-emerald-950/5 to-background -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1 border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
            Credentials & Achievements
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight">
            Certification <span className="text-emerald-400 italic">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl">
            A comprehensive collection of professional certifications, academic honors, and skill assessments acquired throughout my technical journey.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-background/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 mb-12 shadow-2xl sticky top-20 z-10 mx-auto max-w-5xl ring-1 ring-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-1 md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates..."
                className="pl-10 bg-secondary/20 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedOrg} onValueChange={setSelectedOrg}>
              <SelectTrigger className="bg-secondary/20 border-none">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map(org => (
                  <SelectItem key={org} value={org}>{org}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-secondary/20 border-none">
                <Award className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Certificate Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-secondary/20 border-none flex-1">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-md bg-secondary/20 p-1">
                <Button 
                  variant={view === "grid" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setView("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={view === "list" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="flex justify-between items-center mb-6 text-sm text-muted-foreground px-2">
          <p>Showing {Math.min(visibleCount, filteredAndSortedCertificates.length)} of {filteredAndSortedCertificates.length} certificates</p>
          {(searchQuery || selectedOrg !== "All" || selectedType !== "All") && (
            <Button 
              variant="link" 
              className="h-auto p-0 text-primary" 
              onClick={() => {
                setSearchQuery("");
                setSelectedOrg("All");
                setSelectedType("All");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Content */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCertificates.map((cert) => (
              <Dialog key={cert.id}>
                <DialogTrigger asChild>
                  <Card className="group overflow-hidden border-none bg-background hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full ring-1 ring-border/50 hover:ring-primary/30">
                    <div className="relative aspect-[4/3] bg-secondary/10 overflow-hidden">
                      {cert.image ? (
                        <img 
                          src={cert.image} 
                          alt={cert.course_name}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                        <Button variant="secondary" size="sm" className="gap-2 bg-emerald-400 text-emerald-950 hover:bg-emerald-300 border-none">
                          View details
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                         <Badge className="bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] py-0 px-2 uppercase font-bold tracking-wider">
                           {cert.organization.split(" ")[0]}
                         </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4 flex-grow">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{cert.type}</span>
                        <div className="flex items-center text-muted-foreground text-[11px]">
                          <Clock className="w-3 h-3 mr-1" />
                          {cert.issued_date}
                        </div>
                      </div>
                      <CardTitle className="text-sm line-clamp-2 leading-snug group-hover:text-emerald-400 transition-colors">
                        {cert.course_name}
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 border-t border-white/5 mt-auto flex items-center justify-between">
                       <span className="text-xs text-muted-foreground font-medium truncate max-w-[150px]">
                         {cert.organization}
                       </span>
                       <Award className="h-4 w-4 text-emerald-500/40 group-hover:text-emerald-400 transition-colors" />
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex flex-col md:flex-row gap-6 mt-4">
                      <div className="flex-1 space-y-4">
                        <DialogTitle className="text-2xl font-bold">{cert.course_name}</DialogTitle>
                        <DialogDescription className="text-base text-muted-foreground flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {cert.organization}
                        </DialogDescription>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground">Type</h4>
                            <p className="text-sm">{cert.type}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground">Date</h4>
                            <p className="text-sm">{cert.issued_date}</p>
                          </div>
                          <div className="space-y-1 col-span-2">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground">Signed By</h4>
                            <p className="text-sm">{cert.signed_by || "N/A"}</p>
                          </div>
                          {cert.credential_id && (
                            <div className="space-y-1 col-span-2">
                              <h4 className="text-xs font-semibold uppercase text-muted-foreground">Credential ID</h4>
                              <p className="text-sm font-mono break-all">{cert.credential_id}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="md:w-1/2 rounded-xl overflow-hidden border shadow-lg bg-secondary/20 aspect-[4/3] flex items-center justify-center">
                        {cert.image ? (
                          <img src={cert.image} alt="Certificate detail" className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="h-20 w-20 text-muted-foreground/20" />
                        )}
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {currentCertificates.map((cert) => (
              <Card key={cert.id} className="group hover:bg-secondary/20 transition-all border-none ring-1 ring-border/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-semibold truncate group-hover:text-emerald-400 transition-colors">{cert.course_name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{cert.organization} • {cert.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium">{cert.issued_date}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2 gap-1 text-emerald-400 hover:text-emerald-300">
                          Details
                        </Button>
                      </DialogTrigger>
                       <DialogContent className="max-w-4xl">
                         {/* Re-using detail content */}
                         <div className="flex flex-col md:flex-row gap-6 mt-4">
                            {/* Copy content from above or componentize it */}
                            <div className="flex-1 space-y-4">
                              <DialogTitle className="text-2xl font-bold">{cert.course_name}</DialogTitle>
                              <p className="text-base text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                {cert.organization}
                              </p>
                              <div className="grid grid-cols-2 gap-4 pt-4">
                                <p className="text-sm"><span className="block font-bold text-[10px] text-muted-foreground uppercase">Date</span> {cert.issued_date}</p>
                                <p className="text-sm"><span className="block font-bold text-[10px] text-muted-foreground uppercase">Type</span> {cert.type}</p>
                              </div>
                            </div>
                            <div className="md:w-1/2 aspect-[4/3]">
                              {cert.image && <img src={cert.image} alt="Detail" className="w-full h-full object-contain" />}
                            </div>
                         </div>
                       </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredAndSortedCertificates.length && (
          <div className="mt-16 flex justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="gap-2 px-8 rounded-full border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 group text-emerald-400"
            >
              Load more certificates
              <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}

        {filteredAndSortedCertificates.length === 0 && (
          <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border/50">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No certificates found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedOrg("All");
                  setSelectedType("All");
                }}
            >
              Reset all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
