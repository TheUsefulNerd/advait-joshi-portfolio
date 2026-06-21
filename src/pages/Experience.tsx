import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Building } from 'lucide-react';

const experiences = [
  {
    title: 'AI Engineer Intern',
    company: 'DRDO – RCI',
    location: 'Hyderabad',
    duration: 'Aug 2025 - Oct 2025',
    type: 'Completed',
    description: 'Built multi-route RAG chatbot for the DRDO intranet with separate "General" and "Document" modes.',
    achievements: [
      'Built a conversation memory system backed by PostgreSQL to persist user sessions and message history.',
      'Deployed quantized LLaMA 3.2 1B models using llama.cpp - 3x faster inference.',
      'Implemented retrieval pipeline using LangChain, ChromaDB, and reranking, and proposed database-integrated "third route" for secure intranet-wide retrieval.'
    ],
    skills: ['Python', 'LangChain', 'ChromaDB', 'PostgreSQL', 'llama.cpp', 'RAG Pipelines'],
    color: 'blue'
  },
  {
    title: 'MLE Intern',
    company: 'Techpeek',
    location: 'Banglore(Remote)',
    duration: 'Sep 2025 - Oct 2025',
    type: 'Completed',
    description: 'Engineered an enterprise AI platform for law firms by adapting the open-source ActivityWatch framework into a multi-tenant product.',
    achievements: [
      'Designed complex data flows and architectures between frontend and backend to integrate Small Language Models (SLMs) for automated document intelligence and workflow automation.',
      'Engineered a Project Management module with full database integration, allowing users to track projects, billing, and progress in real-time.',
      'Refactored system architectures to align with enterprise standards, focusing on scalability and seamless AI integration.'
    ],
    skills: ['Python', 'Flask', 'SLMs', 'SQLite', 'Frontend Development'],
    color: 'purple'
  },
  {
    title: 'Research Intern(Part-Time)',
    company: 'IIT Kanpur',
    location: 'Remote',
    duration: 'Jun 2025 - Present',
    type: 'Current',
    description: 'Contributing to the development of legal AI systems, focusing on optimizing document generation and retrieval accuracy using vanilla models.',
    achievements: [
      'Streamlined open-source workflows to improve system reliability and cross-platform performance.'
    ],
    skills: ['Python', 'LLMs', 'Document AI', 'Research'],
    color: 'pink'
  }
];

import { Footer } from '@/components/Footer';

const Experience = () => {
  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'from-purple/20 to-purple/5 border-purple/30',
      blue: 'from-blue/20 to-blue/5 border-blue/30',
      pink: 'from-pink/20 to-pink/5 border-pink/30'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Current': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Research': return 'bg-blue/20 text-blue border-blue/30';
      default: return 'bg-purple/20 text-purple border-purple/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="curtain-reveal">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-20 gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Professional <span className="gradient-text">Experience</span>
              </h1>
              <p className="text-xl text-foreground-muted max-w-3xl leading-relaxed">
                A journey through diverse internships and research opportunities across leading organizations and prestigious institutions.
              </p>
            </div>
            <a
              href="https://drive.google.com/file/d/1_tN3lFRTE-CPvXKdJnqyi-5P2DcLxo4O/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button variant="ghost" className="text-foreground-muted hover:text-foreground text-sm font-medium underline-offset-4 hover:underline">
                My Resume
              </Button>
            </a>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple via-blue to-pink transform md:-translate-x-0.5" />

            {/* Experience Cards */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-purple to-pink rounded-full border-4 border-background transform md:-translate-x-1/2 z-10" />

                  {/* Card */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <Card className={`p-6 bg-gradient-to-br ${getColorClasses(exp.color)} hover:scale-105 transition-all duration-300`}>
                      
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {exp.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-foreground-muted mb-2">
                            <Building className="w-4 h-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getTypeColor(exp.type)} border`}>
                          {exp.type}
                        </Badge>
                      </div>

                      {/* Duration and Location */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground-muted">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-foreground-muted mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-foreground-muted flex items-start space-x-2">
                              <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple to-pink mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                        {exp.notes && (
                        <p className="text-xs mb-4 leading-relaxed">
                          {exp.notes}
                        </p>
                      )}

                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-background/50 border-border hover:bg-background/70">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Experience;