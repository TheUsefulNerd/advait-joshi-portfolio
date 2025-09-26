import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Github, Star, GitFork, ExternalLink, Calendar, 
  Code, Users, Zap, Heart, TrendingUp 
} from 'lucide-react';

const projects = [
  {
    name: 'MLFlow-AutoML',
    description: 'An automated machine learning pipeline with hyperparameter optimization and model selection capabilities built on top of MLFlow.',
    language: 'Python',
    stars: 127,
    forks: 34,
    issues: 8,
    lastUpdate: '2024-01-15',
    topics: ['machine-learning', 'automl', 'mlflow', 'python'],
    status: 'Active',
    type: 'Original',
    contributions: 'Creator & Maintainer',
    url: '#'
  },
  {
    name: 'SmartContract-Auditor',
    description: 'A comprehensive smart contract security auditing tool that detects common vulnerabilities and provides optimization suggestions.',
    language: 'Solidity',
    stars: 89,
    forks: 22,
    issues: 5,
    lastUpdate: '2024-01-10',
    topics: ['blockchain', 'smart-contracts', 'security', 'auditing'],
    status: 'Active',
    type: 'Original',
    contributions: 'Creator & Maintainer',
    url: '#'
  },
  {
    name: 'TensorFlow',
    description: 'Contributed to TensorFlow\'s AutoGraph functionality and improved performance optimizations for edge devices.',
    language: 'C++',
    stars: 185000,
    forks: 74000,
    issues: 2100,
    lastUpdate: '2024-01-20',
    topics: ['tensorflow', 'machine-learning', 'deep-learning'],
    status: 'Contributing',
    type: 'Contribution',
    contributions: 'Core Contributor - AutoGraph Module',
    url: '#'
  },
  {
    name: 'scikit-learn',
    description: 'Enhanced ensemble methods and added new algorithms for anomaly detection in scikit-learn.',
    language: 'Python',
    stars: 59000,
    forks: 25000,
    issues: 1800,
    lastUpdate: '2024-01-18',
    topics: ['machine-learning', 'python', 'data-science'],
    status: 'Contributing',
    type: 'Contribution',
    contributions: 'Algorithm Implementation - Ensemble Methods',
    url: '#'
  },
  {
    name: 'Computer-Vision-Toolkit',
    description: 'A comprehensive toolkit for computer vision applications including object detection, image segmentation, and facial recognition.',
    language: 'Python',
    stars: 156,
    forks: 45,
    issues: 12,
    lastUpdate: '2024-01-12',
    topics: ['computer-vision', 'opencv', 'deep-learning', 'pytorch'],
    status: 'Active',
    type: 'Original',
    contributions: 'Creator & Maintainer',
    url: '#'
  },
  {
    name: 'DeFi-Analytics-Dashboard',
    description: 'Real-time analytics dashboard for DeFi protocols with portfolio tracking and yield farming optimization.',
    language: 'TypeScript',
    stars: 78,
    forks: 19,
    issues: 6,
    lastUpdate: '2024-01-08',
    topics: ['defi', 'blockchain', 'analytics', 'react'],
    status: 'Active',
    type: 'Original',
    contributions: 'Creator & Maintainer',
    url: '#'
  }
];

const contributions = [
  {
    year: '2024',
    commits: 1247,
    pullRequests: 89,
    issues: 156,
    repositories: 23
  },
  {
    year: '2023',
    commits: 987,
    pullRequests: 67,
    issues: 134,
    repositories: 19
  }
];

const achievements = [
  {
    title: 'Top Contributor',
    description: 'Ranked in top 1% contributors for TensorFlow in 2024',
    icon: TrendingUp,
    color: 'purple'
  },
  {
    title: 'Maintainer Badge',
    description: 'Became maintainer of 3 popular ML repositories',
    icon: Code,
    color: 'blue'
  },
  {
    title: 'Community Leader',
    description: 'Active mentor in Google Summer of Code program',
    icon: Users,
    color: 'pink'
  },
  {
    title: 'Innovation Award',
    description: 'GitHub Innovation Award for AutoML contributions',
    icon: Zap,
    color: 'purple'
  }
];

import { Footer } from '@/components/Footer';

const OpenSource = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Original', 'Contribution'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.type === filter);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'Python': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-600',
      'Solidity': 'bg-gray-600',
      'C++': 'bg-red-600',
      'Java': 'bg-orange-600'
    };
    return colors[language] || 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Contributing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="curtain-reveal">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Open Source <span className="gradient-text">Contributions</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Contributing to the global developer community through open source projects, 
              from machine learning libraries to blockchain innovations.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Public Repos', value: '23+', color: 'purple', icon: Github },
              { label: 'Total Stars', value: '500+', color: 'blue', icon: Star },
              { label: 'Contributions', value: '2K+', color: 'pink', icon: GitFork },
              { label: 'Followers', value: '150+', color: 'purple', icon: Heart }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-6 h-6 mr-2 ${
                      stat.color === 'purple' ? 'text-purple' : 
                      stat.color === 'blue' ? 'text-blue' : 'text-pink'
                    }`} />
                    <div className={`text-3xl md:text-4xl font-bold ${
                      stat.color === 'purple' ? 'text-purple' : 
                      stat.color === 'blue' ? 'text-blue' : 'text-pink'
                    }`}>
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-foreground-muted text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-2 mb-12">
            {filters.map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType 
                  ? 'bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark' 
                  : 'border-border hover:bg-card-hover'
                }
              >
                {filterType}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="p-6 bg-card hover:bg-card-hover transition-all duration-300 border-border hover:border-purple/30 group">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <Github className="w-5 h-5 text-foreground-muted" />
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-purple transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-foreground-muted text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Language & Stats */}
                <div className="flex items-center space-x-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`} />
                    <span className="text-foreground-muted">{project.language}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-foreground-muted">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-foreground-muted">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forks}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-foreground-muted">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics.map((topic, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs bg-background/50 border-border hover:bg-background/70"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                {/* Contribution Role */}
                <div className="mb-4">
                  <Badge 
                    variant="outline" 
                    className={project.type === 'Original' 
                      ? 'bg-purple/20 text-purple border-purple/30' 
                      : 'bg-blue/20 text-blue border-blue/30'
                    }
                  >
                    {project.contributions}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 hover:bg-card-hover">
                    <Github className="w-3 h-3 mr-2" />
                    View Code
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-card-hover">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Contribution Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Contribution <span className="gradient-text">Timeline</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributions.map((year, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-purple/5 to-blue/5 border-purple/30">
                  <h3 className="text-2xl font-bold text-purple mb-4">{year.year}</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{year.commits}</div>
                      <div className="text-sm text-foreground-muted">Commits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{year.pullRequests}</div>
                      <div className="text-sm text-foreground-muted">Pull Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{year.issues}</div>
                      <div className="text-sm text-foreground-muted">Issues</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{year.repositories}</div>
                      <div className="text-sm text-foreground-muted">Repositories</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Open Source <span className="gradient-text">Achievements</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="p-6 text-center bg-card hover:bg-card-hover transition-all duration-300 border-border hover:scale-105">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.color === 'purple' ? 'bg-purple/20' :
                      achievement.color === 'blue' ? 'bg-blue/20' : 'bg-pink/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        achievement.color === 'purple' ? 'text-purple' :
                        achievement.color === 'blue' ? 'text-blue' : 'text-pink'
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{achievement.title}</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">{achievement.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-r from-purple/5 to-pink/5 border-purple/20 text-center mb-16">
            <h2 className="text-2xl font-semibold mb-4">Let's Build Together!</h2>
            <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
              Interested in collaborating on open source projects? I'm always excited to work with 
              fellow developers on innovative solutions that benefit the entire community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark">
                <Github className="w-4 h-4 mr-2" />
                Follow on GitHub
              </Button>
              <Button variant="outline" className="border-purple/30 text-purple hover:bg-purple/10">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OpenSource;