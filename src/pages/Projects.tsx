import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play, Filter } from 'lucide-react';

const projects = [
  {
    title: 'AI-Powered Fraud Detection System',
    description: 'Developed an advanced machine learning system to detect fraudulent transactions in real-time using ensemble methods and deep learning.',
    image: '/api/placeholder/400/250',
    category: 'Machine Learning',
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'AWS'],
    status: 'Completed',
    highlights: [
      '99.2% accuracy in fraud detection',
      'Real-time processing capability',
      'Reduced false positives by 45%'
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'purple'
  },
  {
    title: 'Decentralized Voting Platform',
    description: 'Built a blockchain-based voting system ensuring transparency, immutability, and voter privacy using Ethereum smart contracts.',
    image: '/api/placeholder/400/250',
    category: 'Blockchain',
    technologies: ['Solidity', 'React', 'Web3.js', 'Ethereum', 'IPFS'],
    status: 'Completed',
    highlights: [
      'Complete vote transparency',
      'Gas-optimized smart contracts',
      'Mobile-responsive interface'
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'blue'
  },
  {
    title: 'Computer Vision Object Recognition',
    description: 'Implemented a state-of-the-art object detection system using YOLO architecture for real-time video analysis.',
    image: '/api/placeholder/400/250',
    category: 'Computer Vision',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'YOLO', 'CUDA'],
    status: 'Completed',
    highlights: [
      '30 FPS real-time processing',
      'Multi-object tracking',
      '95%+ detection accuracy'
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'pink'
  },
  {
    title: 'Natural Language Processing Chatbot',
    description: 'Created an intelligent chatbot using transformer models and NLP techniques for customer support automation.',
    image: '/api/placeholder/400/250',
    category: 'NLP',
    technologies: ['Python', 'Transformers', 'BERT', 'FastAPI', 'Docker'],
    status: 'In Progress',
    highlights: [
      'Context-aware conversations',
      'Multi-language support',
      'Integration with existing CRM'
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'purple'
  },
  {
    title: 'Predictive Analytics Dashboard',
    description: 'Built a comprehensive dashboard for business intelligence with predictive modeling and interactive visualizations.',
    image: '/api/placeholder/400/250',
    category: 'Data Science',
    technologies: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
    status: 'Completed',
    highlights: [
      'Interactive data visualizations',
      'Predictive modeling pipeline',
      'Real-time data updates'
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'blue'
  },
  {
    title: 'DeFi Lending Protocol',
    description: 'Developed a decentralized finance protocol for peer-to-peer lending with automated market making features.',
    image: '/api/placeholder/400/250',
    category: 'DeFi',
    technologies: ['Solidity', 'React', 'Web3.js', 'Chainlink', 'Uniswap'],
    status: 'Completed',
    highlights: [
      'Automated liquidation system',
      'Dynamic interest rates',
      'Cross-chain compatibility'
    ],
    demoUrl: '#',
    githubUrl: '#',
    color: 'pink'
  }
];

const categories = ['All', 'Machine Learning', 'Blockchain', 'Computer Vision', 'NLP', 'Data Science', 'DeFi'];

import { Footer } from '@/components/Footer';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'from-purple/20 to-purple/5 border-purple/30 hover:border-purple/50',
      blue: 'from-blue/20 to-blue/5 border-blue/30 hover:border-blue/50',
      pink: 'from-pink/20 to-pink/5 border-pink/30 hover:border-pink/50'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

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
              A showcase of my work spanning machine learning, blockchain, and full-stack development projects.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Filter className="w-5 h-5 text-foreground-muted mr-2 mt-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? 'bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark' 
                  : 'border-border hover:bg-card-hover'
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden bg-gradient-to-br ${getColorClasses(project.color)} hover:scale-105 transition-all duration-300 group`}
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-blue/10 to-pink/10" />
                  <div className="text-4xl font-bold text-foreground-muted opacity-50">
                    {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                    <Button size="sm" variant="outline" className="bg-background/50 backdrop-blur-sm">
                      <Play className="w-4 h-4 mr-1" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline" className="bg-background/50 backdrop-blur-sm">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-foreground leading-tight">
                      {project.title}
                    </h3>
                    <Badge variant="outline" className={`${getStatusColor(project.status)} border text-xs`}>
                      {project.status}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-foreground-muted text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs text-foreground-muted flex items-start space-x-2">
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple to-pink mt-1.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="text-xs bg-background/30 border-border hover:bg-background/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 hover:bg-card-hover">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 hover:bg-card-hover">
                      <Github className="w-3 h-3 mr-2" />
                      Source
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Project Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Total Projects', value: '25+', color: 'purple' },
              { label: 'GitHub Stars', value: '500+', color: 'blue' },
              { label: 'Contributions', value: '1000+', color: 'pink' },
              { label: 'Tech Stack', value: '20+', color: 'purple' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  stat.color === 'purple' ? 'text-purple' : 
                  stat.color === 'blue' ? 'text-blue' : 'text-pink'
                }`}>
                  {stat.value}
                </div>
                <div className="text-foreground-muted text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center mb-16">
            <Card className="p-8 bg-gradient-to-r from-purple/5 to-pink/5 border-purple/20">
              <h2 className="text-2xl font-semibold mb-4">Interested in Collaboration?</h2>
              <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
                I'm always excited to work on innovative projects that push the boundaries of technology. 
                Let's build something amazing together!
              </p>
              <Button className="bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark">
                Get In Touch
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;