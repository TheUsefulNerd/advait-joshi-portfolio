import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play, Filter } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom'

const projects = [
  {
    title: 'FloatChat-AI',
    description:
      'Implemented a state-of-the-art object detection system using YOLO architecture for real-time video analysis.',
    image: '/api/placeholder/400/250',
    category: 'RAG',
    technologies: ['Python', 'groq', 'SQL', 'Postgres', 'ChromaDB'],
    status: 'On-going',
    highlights: [
      'Our conversational platform lets anyone explore ARGO ocean data using natural language, eliminating the need for coding or domain expertise.',
      'We automatically ingest ARGO NetCDF files, extract key ocean parameters, and organize them in a structured PostgreSQL database for fast, flexible access.',
      'Advanced AI models interpret user questions and translate them into precise database queries, delivering accurate insights instantly.',
      'Our system combines vector-based search and interactive dashboards, enabling rapid retrieval, intuitive mapping, and easy visualization of ocean profiles.',
      'A core innovation is our use of the Model Context Protocol (MCP), which ensures a scalable, modular architecture that seamlessly integrates AI, vector search, and visualization for future growth.',
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'pink',
  },
  {
    title: 'Song Popularity Prediction',
    description:
      'A complete end-to-end data science project focused on understanding the patterns behind a song’s popularity using real-world audio and platform-level data — and building a predictive model to estimate Spotify stream counts.',
    image: '/Song-Analysis-Project.png',
    category: 'Data Science',
    technologies: ['Python', 'Matplotlib', 'Scikit-learn', 'Pandas', 'Streamlit'],
    status: 'Completed',
    highlights: [
      'Random Forest after log transformation gave the best results (R² ≈ 0.79)',
      'Fully modular multi-page dashboard',
      'Included Business Implications for each graphical and data understanding.',
    ],
    demoUrl: 'https://song-analysis-data-science-project.streamlit.app/',
    githubUrl: 'https://github.com/TheUsefulNerd/Song-Analysis.git',
    color: 'purple',
  },
  {
    title: 'Crypto Mining Simulator',
    description:
      'A fully functional blockchain simulation implemented in Python with Flask. This project simulates core blockchain mechanics such as mining, transaction validation, mempool prioritization, mining rewards, balance tracking, and a dynamic web interface for visualization.',
    image: '/Cryptomining-Simulator.png',
    category: 'Blockchain',
    technologies: ['Python', 'HTML', 'Flask'],
    status: 'Completed',
    highlights: [
      '⛏️ Proof-of-Work Mining with adjustable difficulty',
      '🧾 Transaction Generation with realistic fees and balances',
      '🧺 Mempool to manage pending transactions',
      '💰 Mining Rewards + Fee Accumulation',
      '🧾 Wallet Balance Sheet auto-updates per block',
      '🌐 Web Interface built using Flask',
      '📦 Modular Design using transaction.py, block.py, chain.py, and app.py'
    ],
    demoUrl: 'https://simulation-cryptomining.onrender.com/',
    githubUrl: 'https://github.com/TheUsefulNerd/Simulation-Cryptomining.git',
    color: 'blue',
  },
  {
    title: 'SIH-2025-INTERNAL-HACKATHON',
    description:
      'Created a website to showcase all the information regarding Smart India Hackathon 2025 - Internal Round details.',
    image: '/SIH-2025-IH.png',
    category: 'Web Dev',
    technologies: ['Python', 'Transformers', 'BERT', 'FastAPI', 'Docker'],
    status: 'In Progress',
    highlights: [
      'Clean UI',
    ],
    demoUrl: 'https://sih-2025-internal-hackathon.vercel.app/',
    githubUrl: 'https://github.com/TheUsefulNerd/SIH-2025-INTERNAL-HACKATHON.git',
    color: 'purple',
  },
];

const categories = [
  'All',
  'RAG',
  'Blockchain',
  'Web Dev',
  'Data Science',
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
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';

  const isValidImage = (src: string) =>
    src && !src.includes('/api/placeholder');

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="curtain-reveal">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              A showcase of my work spanning machine learning, blockchain, and
              web development projects.
            </p>
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
              <Link to="/contact">
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
  );
};

export default Projects;
