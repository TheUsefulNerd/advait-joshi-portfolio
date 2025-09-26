import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, ExternalLink, Calendar, Users, 
  Microscope, BookOpen, Award, TrendingUp, Mail
} from 'lucide-react';

const researchPapers = [
  {
    title: 'Advanced Machine Learning Techniques for Fraud Detection in Financial Transactions',
    authors: ['Advait Joshi', 'Dr. Rajesh Kumar', 'Dr. Priya Sharma'],
    journal: 'IEEE Transactions on Neural Networks and Learning Systems',
    year: '2024',
    status: 'Published',
    abstract: 'This paper presents novel ensemble methods combining deep learning and traditional ML approaches for real-time fraud detection, achieving 99.2% accuracy with minimal false positives.',
    keywords: ['Machine Learning', 'Fraud Detection', 'Deep Learning', 'Ensemble Methods'],
    citations: 15,
    link: '#',
    conference: 'IEEE TNNLS 2024',
    impact: 'High Impact Journal (IF: 14.255)'
  },
  {
    title: 'Blockchain-Based Secure Voting System with Enhanced Privacy Preservation',
    authors: ['Advait Joshi', 'Prof. Ankit Patel', 'Dr. Meera Singh'],
    journal: 'ACM Computing Surveys',
    year: '2024',
    status: 'Under Review',
    abstract: 'A comprehensive survey and novel implementation of blockchain voting systems with zero-knowledge proofs for enhanced voter privacy while maintaining transparency.',
    keywords: ['Blockchain', 'E-Voting', 'Privacy', 'Zero-Knowledge Proofs'],
    citations: 0,
    link: '#',
    conference: 'ACM CSUR 2024',
    impact: 'Top-tier Journal (IF: 16.6)'
  },
  {
    title: 'Optimizing Neural Network Architecture for Edge Computing in IoT Devices',
    authors: ['Advait Joshi', 'Dr. Suresh Patel', 'IIT Kanpur Research Team'],
    journal: 'Nature Machine Intelligence',
    year: '2023',
    status: 'Published',
    abstract: 'Research on lightweight neural network architectures optimized for resource-constrained IoT devices, reducing computational overhead by 78% while maintaining accuracy.',
    keywords: ['Edge Computing', 'IoT', 'Neural Networks', 'Optimization'],
    citations: 23,
    link: '#',
    conference: 'Nature MI 2023',
    impact: 'Premier Journal (IF: 25.898)'
  }
];

const researchInterests = [
  {
    title: 'Machine Learning & AI',
    description: 'Deep learning, neural networks, and advanced ML algorithms for real-world applications',
    icon: TrendingUp,
    color: 'purple'
  },
  {
    title: 'Blockchain Technology',
    description: 'Decentralized systems, smart contracts, and cryptocurrency applications',
    icon: Award,
    color: 'blue'
  },
  {
    title: 'Computer Vision',
    description: 'Image processing, object detection, and visual recognition systems',
    icon: Microscope,
    color: 'pink'
  },
  {
    title: 'Natural Language Processing',
    description: 'Text analysis, language models, and conversational AI systems',
    icon: BookOpen,
    color: 'purple'
  }
];

const ongoingResearch = [
  {
    title: 'Federated Learning for Healthcare Data Privacy',
    institution: 'IIT Kanpur',
    supervisor: 'Dr. Rajesh Gupta',
    duration: 'Jan 2024 - Present',
    description: 'Developing privacy-preserving machine learning techniques for medical data analysis using federated learning approaches.',
    funding: 'SERB Research Grant ₹15L',
    status: 'Active'
  },
  {
    title: 'Quantum Machine Learning Algorithms',
    institution: 'IIT Patna',
    supervisor: 'Dr. Sanjay Verma',
    duration: 'Sep 2023 - Present',
    description: 'Exploring quantum computing applications in machine learning and developing hybrid quantum-classical algorithms.',
    funding: 'DST-INSPIRE Fellowship',
    status: 'Active'
  }
];

import { Footer } from '@/components/Footer';

const Research = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Under Review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
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
              Research & <span className="gradient-text">Publications</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Exploring the frontiers of machine learning, blockchain technology, and artificial intelligence 
              through rigorous research and academic publications.
            </p>
          </div>

          {/* Research Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Publications', value: '3+', color: 'purple' },
              { label: 'Citations', value: '38+', color: 'blue' },
              { label: 'Research Projects', value: '5+', color: 'pink' },
              { label: 'Collaborations', value: '8+', color: 'purple' }
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

          {/* Published Research */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Published <span className="gradient-text">Research</span>
            </h2>
            
            <div className="space-y-8">
              {researchPapers.map((paper, index) => (
                <Card key={index} className="p-8 bg-card hover:bg-card-hover transition-all duration-300 border-border hover:border-purple/30">
                  
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight">
                        {paper.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-foreground-muted text-sm mb-2">
                        <Users className="w-4 h-4" />
                        <span>{paper.authors.join(', ')}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-foreground-muted">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{paper.journal}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{paper.year}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2 mt-4 lg:mt-0">
                      <Badge variant="outline" className={getStatusColor(paper.status)}>
                        {paper.status}
                      </Badge>
                      <div className="text-right text-sm">
                        <div className="text-foreground-muted">Citations</div>
                        <div className="text-xl font-bold text-blue">{paper.citations}</div>
                      </div>
                    </div>
                  </div>

                  {/* Abstract */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Abstract:</h4>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      {paper.abstract}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords.map((keyword, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-background/50 border-border hover:bg-background/70"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="text-sm text-foreground-muted mb-4 sm:mb-0">
                      <span className="font-medium">Impact:</span> {paper.impact}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="hover:bg-card-hover">
                        <FileText className="w-3 h-3 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-card-hover">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Publisher
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Ongoing Research */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Ongoing <span className="gradient-text">Research</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {ongoingResearch.map((research, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-blue/5 to-purple/5 border-blue/30 hover:border-blue/50 transition-all duration-300">
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{research.title}</h3>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      {research.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4 text-sm text-foreground-muted">
                    <div><span className="font-medium">Institution:</span> {research.institution}</div>
                    <div><span className="font-medium">Supervisor:</span> {research.supervisor}</div>
                    <div><span className="font-medium">Duration:</span> {research.duration}</div>
                    <div><span className="font-medium">Funding:</span> {research.funding}</div>
                  </div>

                  <p className="text-foreground-muted text-sm leading-relaxed">
                    {research.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Research Interests */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Research <span className="gradient-text">Interests</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchInterests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <Card key={index} className="p-6 text-center bg-card hover:bg-card-hover transition-all duration-300 border-border hover:scale-105">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      interest.color === 'purple' ? 'bg-purple/20' :
                      interest.color === 'blue' ? 'bg-blue/20' : 'bg-pink/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        interest.color === 'purple' ? 'text-purple' :
                        interest.color === 'blue' ? 'text-blue' : 'text-pink'
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{interest.title}</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">{interest.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-r from-purple/5 to-pink/5 border-purple/20 text-center mb-16">
            <h2 className="text-2xl font-semibold mb-4">Interested in Collaboration?</h2>
            <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
              I'm always open to research collaborations, academic partnerships, and innovative projects. 
              Let's advance the frontiers of technology together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark">
                <Mail className="w-4 h-4 mr-2" />
                Research Inquiry
              </Button>
              <Button variant="outline" className="border-purple/30 text-purple hover:bg-purple/10">
                <FileText className="w-4 h-4 mr-2" />
                View CV
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Research;