import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play, Filter } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom'

const projects = [
  {
    title: 'Architect - AI Orchestrated Socratic Mentor',
    description: 'A full-stack AI orchestration platform that transforms project ideas into implementations via a three-phase Socratic Loop: Planner, Librarian, and Mentor — using LangGraph for multi-agent orchestration.',
    image: '',
    category: 'RAG',
    technologies: ['Python', 'LangGraph', 'FastAPI', 'Qdrant', 'Next.js 15', 'Supabase', 'Groq', 'Gemini'],
    status: 'Completed',
    highlights: [
      'Built a full-stack AI orchestration platform that transforms project ideas into implementations via a three-phase Socratic Loop (Planner → Librarian → Mentor), using LangGraph for multi-agent orchestration and Groq (LLaMA 3.3-70B) with Gemini fallback.',
      'Engineered a RAG pipeline with Qdrant vector search and Gemini text-embedding-004 to retrieve and synthesize documentation, delivering Perplexity-style cited responses tailored to specific tech stacks.',
      'Deployed a production system using Next.js 15 and FastAPI, utilizing Supabase (PostgreSQL + RLS) for secure auth and per-user data isolation with Google and GitHub OAuth integration.'
    ],
    demoUrl: 'https://architect-ochre.vercel.app',
    githubUrl: 'https://github.com/TheUsefulNerd/Architect',
    color: 'blue',
  },
  {
    title: 'AI Support Triage Agent',
    description: 'A multi-domain support triage agent processing tickets across HackerRank, Claude, and Visa — built for HackerRank Orchestrate 2026. Ranked 66 out of 1309 participants.',
    image: '',
    category: 'Agentic AI',
    technologies: ['Python', 'LangChain', 'BM25', 'Pydantic', 'FastAPI'],
    status: 'Completed',
    highlights: [
      'Built a multi-domain support triage agent processing tickets across HackerRank, Claude, and Visa using a 5-module pipeline - Safety → BM25 Retriever → LLM Classifier → Pydantic Validator → Responder.',
      'Implemented a 12-signal deterministic risk scorer that pre-escalates high-risk tickets (fraud, outages, injections) before the LLM is called, reducing hallucination risk and API cost.',
      'Achieved zero-hallucination output using Pydantic validation, query expansion synonyms, and a post-processing URL interceptor grounded strictly in the retrieved corpus.'
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'pink',
  },
  {
    title: 'ShopKeeper AI - Agentic Retail System',
    description: 'A 9-agent retail automation system orchestrated via LangGraph where agents coordinate exclusively through structured state — no natural language between agents.',
    image: '',
    category: 'Agentic AI',
    technologies: ['Python', 'LangGraph', 'FastAPI', 'Supabase', 'Redis', 'PostgreSQL', 'Next.js 15'],
    status: 'In Progress',
    highlights: [
      'Building a 9-agent retail automation system orchestrated via LangGraph where agents coordinate exclusively through structured state - no natural language between agents - with a strict separation between LLM agents (Sales, Recommendation, Supplier, Post-Purchase) and deterministic agents (Inventory, Payment, Fulfillment, Loyalty).',
      'Engineered a custom auth system from scratch using bcrypt + python-jose + Google OAuth 2.0 with JWT role payloads, Redis-backed refresh token blocklist, and a 19-table Supabase Postgres schema with UUID primary keys, Alembic migrations, and circular FK resolution via use_alter.',
      'Designed a three-layer observability stack - WebSocket event stream for real-time agent activity, LangSmith for LangGraph trace archival, and OpenTelemetry for distributed request tracing across FastAPI, Redis, and Supabase - surfaced live inside a businessman dashboard with per-agent trace viewer.'
    ],
    demoUrl: '#',
    githubUrl: 'https://github.com/TheUsefulNerd/ShopKeeper-AI',
    color: 'purple',
  }
];

const categories = [
  'All',
  'Agentic AI',
  'RAG',
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const getColorClasses = (color: string) => {
    const colors = {
      purple:
        'from-purple/20 to-purple/5 border-purple/30 hover:border-purple/50',
      blue: 'from-blue/20 to-blue/5 border-blue/30 hover:border-blue/50',
      pink: 'from-pink/20 to-pink/5 border-pink/30 hover:border-pink/50',
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const getStatusColor = (status: string) =>
    status === 'Completed'
      ? 'bg-green-600/10 text-green-700 border-green-600/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30'
      : 'bg-yellow-600/10 text-yellow-700 border-yellow-600/20 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30';

  const isValidImage = (src: string) =>
    src && !src.includes('/api/placeholder');

  return (
    <>
    <SEO title="Projects | Advait Joshi" description="Portfolio projects showcasing machine learning, agentic orchestration, and RAG systems." />
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="curtain-reveal">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Featured <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-xl text-foreground-muted max-w-3xl leading-relaxed">
                A showcase of my work spanning machine learning, agentic orchestration, and RAG systems.
              </p>
            </div>
            <a
              href="https://drive.google.com/file/d/1_tN3lFRTE-CPvXKdJnqyi-5P2DcLxo4O/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button
                variant="ghost"
                className="text-foreground-muted hover:text-foreground text-sm font-medium underline-offset-4 hover:underline"
              >
                My Resume
              </Button>
            </a>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Filter className="w-5 h-5 text-foreground-muted mr-2 mt-2" />
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark'
                    : 'border-border hover:bg-card-hover'
                }
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <Card
                key={i}
                className={`overflow-hidden bg-gradient-to-br ${getColorClasses(
                  project.color
                )} hover:scale-105 transition-all duration-300 group`}
              >
                <div className="h-48 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-background-secondary to-background-tertiary">
                  {isValidImage(project.image) ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-foreground-muted opacity-50">
                      {project.title
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                  )}

                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                    {project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background/50 backdrop-blur-sm"
                        >
                          <Play className="w-4 h-4 mr-1" /> Demo
                        </Button>
                      </a>
                    )}
                    {project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background/50 backdrop-blur-sm"
                        >
                          <Github className="w-4 h-4 mr-1" /> Code
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-foreground leading-tight">
                      {project.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(
                        project.status
                      )} border text-xs`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <p className="text-foreground-muted text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-1">
                      {project.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="text-xs text-foreground-muted flex items-start space-x-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple to-pink mt-1.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="text-xs bg-background/30 border-border hover:bg-background/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    {project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full hover:bg-card-hover"
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Live Demo
                        </Button>
                      </a>
                    )}
                    {project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full hover:bg-card-hover"
                        >
                          <Github className="w-3 h-3 mr-2" />
                          Source
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center mb-16">
            <Card className="p-8 bg-gradient-to-r from-purple/5 to-pink/5 border-purple/20">
              <h2 className="text-2xl font-semibold mb-4">
                Interested in Collaboration?
              </h2>
              <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
                I'm always excited to work on innovative projects that push the
                boundaries of technology. Let's build something amazing together!
              </p>
              <Link to="/portfolio/contact">
                <Button className="bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark">
                  Get In Touch
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Projects;
