import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import {
  Brain, Shield, Code2, Github, Linkedin, Mail,
  MapPin, Zap, GraduationCap, Calendar, Award,
  BookOpen, Send, Phone
} from 'lucide-react';

const RESUME_URL =
  'https://drive.google.com/file/d/1_tN3lFRTE-CPvXKdJnqyi-5P2DcLxo4O/view?usp=sharing';

const highlights = [
  {
    icon: Brain,
    title: 'AI & ML Engineering',
    description:
      'Exploring the frontiers of LLMs through RAG, interpretability research, and hands-on chatbot development.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Software Engineering',
    description:
      'Building backend systems, managing databases, and integrating security in offline RAG setups.',
    color: 'blue',
  },
];



const interests = [
  'Agentic Systems', 'RAG Pipelines', 'Multi-Agent Orchestration',
  'LLM Inference Optimization', 'Backend Engineering', 'Vector Databases',
  'Distributed Systems', 'Developer Tooling',
];

const goals = [
  'Ship reliable, production-grade agentic AI systems',
  'Specialize in LLM inference optimization and cost-efficient serving',
  'Contribute to open-source AI infrastructure tooling',
  'Land an AI Engineer / MLE role at a product-focused team',
  'Build systems that hold up under real-world load, not just demos',
];

const topSkills = [
  { name: 'Python', level: 95 },
  { name: 'FastAPI', level: 90 },
  { name: 'LangGraph/LangChain', level: 92 },
  { name: 'RAG Pipelines', level: 98 },
  { name: 'PostgreSQL/Supabase', level: 88 },
  { name: 'React.js/Next.js', level: 90 },
  { name: 'Docker', level: 85 },
  { name: 'Git', level: 95 },
];

const education = {
  degree: 'B.Tech CSE (Data Science)',
  institution: 'Swami Vivekananda Institute of Technology (SVIT)',
  location: 'Hyderabad, India',
  duration: '2023 – 2027',
  gpa: '8.14/10.0',
  coursework: ['Data Structures & Algorithms', 'Database Management Systems', 'Introduction to Data Science', 'Software Engineering', 'Statistics & Probability'],
};

const certifications = [
  { title: 'Deep Learning — IIT Ropar', issuer: 'NPTEL', date: 'Nov 2024' },
  { title: 'Postman API Fundamentals Student Expert', issuer: 'Postman', date: 'July 2024' },
  { title: 'Advanced AI Bootcamp', issuer: 'Swecha Telangana', date: 'June 2024' },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/TheUsefulNerd' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/advaitszone' },
  { name: 'Email', icon: Mail, href: 'mailto:advaitszone@gmail.com' },
];

const contactMethods = [
  { title: 'Email', value: 'advaitszone@gmail.com', href: 'mailto:advaitszone@gmail.com', icon: Mail, color: 'purple' },
  { title: 'Phone', value: '+91 9515445545', href: 'tel:+919515445545', icon: Phone, color: 'blue' },
  { title: 'Location', value: 'Hyderabad, India', href: '#', icon: MapPin, color: 'pink' }
];

const PortfolioAbout = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Message Sent!', description: "Thank you for reaching out. I'll get back to you soon!" });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="curtain-reveal">

          {/* ── Header with My Resume button ─────────────────────────────── */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-foreground-muted">
                AI Engineer specializing in agentic systems, RAG pipelines, and multi-agent orchestration.
              </p>
            </div>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-foreground-muted hover:text-foreground text-sm font-medium underline-offset-4 hover:underline">
                My Resume
              </Button>
            </a>
          </div>

          {/* ── Highlights Grid ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <Card key={i} className="p-6 text-center bg-card hover:bg-card-hover border-border hover:border-purple/30 hover:scale-105 group transition-all duration-300">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    h.color === 'purple' ? 'bg-purple/20 group-hover:bg-purple/30' :
                    h.color === 'blue' ? 'bg-blue/20 group-hover:bg-blue/30' : 'bg-pink/20 group-hover:bg-pink/30'
                  } transition-all duration-300`}>
                    <Icon className={`w-7 h-7 ${h.color === 'purple' ? 'text-purple' : h.color === 'blue' ? 'text-blue' : 'text-pink'}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{h.title}</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">{h.description}</p>
                </Card>
              );
            })}
          </div>



          {/* ── My Journey ───────────────────────────────────────────────── */}
          <Card className="p-8 bg-card border-border mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-blue" id="journey">My Journey</h2>
            <div className="space-y-4 text-foreground-muted leading-relaxed">
              <p>
                I'm an AI Engineer and incoming 4th-year student at Swami Vivekananda Institute of Technology, Hyderabad, building production-grade agentic systems with a focus on RAG pipelines, multi-agent orchestration, and inference optimization.
              </p>
              <p>
                Past work includes multi-route RAG systems for DRDO, a deterministic support triage agent for HackerRank Orchestrate, and full-stack AI platforms using LangGraph, FastAPI, and Supabase. I care about reliability and speed, not just making things work in demos.
              </p>
              <p>
                Currently looking for AI Engineer and MLE internships.
              </p>
            </div>
          </Card>

          {/* ── Two-column: Skills + Education ───────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            {/* Skills */}
            <Card className="p-8 bg-card border-border" id="skills">
              <h2 className="text-2xl font-semibold mb-6 gradient-text">Top Skills</h2>
              <div className="space-y-4">
                {topSkills.map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs text-foreground-muted">{skill.level}%</span>
                    </div>
                    <div className="relative h-1.5 bg-background-secondary rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple to-blue rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education */}
            <div className="space-y-6" id="education">
              <Card className="p-6 bg-gradient-to-br from-purple/5 to-blue/5 border-purple/30">
                <div className="flex items-start gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-purple mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{education.degree}</h3>
                    <p className="text-blue font-medium text-sm">{education.institution}</p>
                    <div className="flex gap-4 mt-1 text-xs text-foreground-muted">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{education.duration}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{education.location}</span>
                    </div>
                  </div>
                  <div className="ml-auto text-right flex-shrink-0">
                    <div className="text-xs text-foreground-muted">GPA</div>
                    <div className="text-xl font-bold text-purple">{education.gpa}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((c, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-background/50 border-border">{c}</Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-pink" /> Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-foreground">{cert.title}</p>
                        <p className="text-xs text-foreground-muted">{cert.issuer}</p>
                      </div>
                      <Badge variant="outline" className="bg-purple/20 text-purple border-purple/30 text-xs flex-shrink-0 ml-2">
                        {cert.date}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* ── Interests ────────────────────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">
              Areas of <span className="gradient-text">Interest</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {interests.map((interest, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple/10 to-blue/10 border-purple/30 hover:from-purple/20 hover:to-blue/20 transition-all duration-300 hover:scale-105"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* ── Goals ────────────────────────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">
              Future <span className="gradient-text">Goals</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal, i) => (
                <Card key={i} className="p-5 bg-card hover:bg-card-hover border-border hover:border-purple/30 group transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple to-pink mt-1.5 group-hover:scale-150 transition-transform duration-300 flex-shrink-0" />
                    <p className="text-foreground-muted group-hover:text-foreground transition-colors duration-300 text-sm">{goal}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Contact Form ─────────────────────────────────────────────── */}
          <div id="contact" className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-8 bg-card border-border">
                  <div className="flex items-center gap-2 mb-6">
                    <Send className="w-5 h-5 text-purple" />
                    <h3 className="text-xl font-semibold">Send a Message</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange}
                          placeholder="Your full name" className="bg-background-secondary border-border focus:border-purple" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                          placeholder="your.email@example.com" className="bg-background-secondary border-border focus:border-purple" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange}
                        placeholder="What's this about?" className="bg-background-secondary border-border focus:border-purple" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleChange}
                        placeholder="Tell me about your project, idea, or just say hello..." rows={5}
                        className="bg-background-secondary border-border focus:border-purple resize-none" required />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark">
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                </Card>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <Card key={index} className="p-5 bg-card hover:bg-card-hover border-border hover:border-purple/30 transition-all duration-300">
                      <a href={method.href} className="flex items-center gap-3 group">
                        <div className={`p-2 rounded-full transition-all ${
                          method.color === 'purple' ? 'bg-purple/20 group-hover:bg-purple/30' :
                          method.color === 'blue' ? 'bg-blue/20 group-hover:bg-blue/30' : 'bg-pink/20 group-hover:bg-pink/30'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            method.color === 'purple' ? 'text-purple' :
                            method.color === 'blue' ? 'text-blue' : 'text-pink'
                          }`} />
                        </div>
                        <div>
                          <p className="text-xs text-foreground-muted mb-0.5">{method.title}</p>
                          <p className="text-sm font-medium group-hover:text-foreground transition-colors">{method.value}</p>
                        </div>
                      </a>
                    </Card>
                  );
                })}

                <Card className="p-5 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="font-semibold text-green-400 text-sm">Currently Available</span>
                  </div>
                  <p className="text-foreground-muted text-xs leading-relaxed">
                    Open to AI Engineer and MLE internship opportunities.
                  </p>
                </Card>

                <div className="text-center">
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="text-foreground-muted hover:text-foreground text-sm font-medium underline-offset-4 hover:underline">
                      My Resume
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioAbout;
