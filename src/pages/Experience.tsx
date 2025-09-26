import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react';

const experiences = [
  {
    title: 'ML Engineer Intern',
    company: 'TechPeek',
    location: 'Remote',
    duration: 'June 2024 - Present',
    type: 'Current',
    description: 'Developing machine learning models for predictive analytics and data-driven solutions. Working on advanced algorithms for pattern recognition and automated decision-making systems.',
    achievements: [
      'Improved model accuracy by 25% through feature engineering',
      'Implemented scalable ML pipelines using Python and TensorFlow',
      'Collaborated with cross-functional teams on product development',
      'Optimized model performance for real-time applications'
    ],
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Analysis', 'MLOps'],
    color: 'purple'
  },
  {
    title: 'AI Engineer Intern',
    company: 'DRDO (Defence Research and Development Organisation)',
    location: 'India',
    duration: 'March 2024 - May 2024',
    type: 'Completed',
    description: 'Worked on artificial intelligence applications for defense technologies. Contributed to research and development of AI systems for strategic applications.',
    achievements: [
      'Developed AI algorithms for pattern recognition in defense systems',
      'Conducted research on neural networks for tactical applications',
      'Presented findings to senior research scientists',
      'Contributed to classified AI research projects'
    ],
    skills: ['Artificial Intelligence', 'Neural Networks', 'Computer Vision', 'Python', 'Research'],
    color: 'blue'
  },
  {
    title: 'Research Intern',
    company: 'Indian Institute of Technology (IIT) Kanpur',
    location: 'Kanpur, India',
    duration: 'December 2023 - February 2024',
    type: 'Research',
    description: 'Conducted cutting-edge research in machine learning and artificial intelligence under the guidance of renowned faculty members.',
    achievements: [
      'Published research findings in conference proceedings',
      'Developed novel algorithms for deep learning applications',
      'Collaborated with PhD students on advanced research projects',
      'Presented research at academic conferences'
    ],
    skills: ['Deep Learning', 'Research Methodology', 'Academic Writing', 'PyTorch', 'Statistics'],
    color: 'pink'
  },
  {
    title: 'Research Intern',
    company: 'Indian Institute of Technology (IIT) Patna',
    location: 'Patna, India',
    duration: 'September 2023 - November 2023',
    type: 'Research',
    description: 'Focused on advanced machine learning techniques and their applications in real-world scenarios. Worked on interdisciplinary research projects.',
    achievements: [
      'Implemented state-of-the-art ML models for data classification',
      'Conducted extensive literature review on emerging AI techniques',
      'Developed prototypes for academic research validation',
      'Mentored junior students in research methodologies'
    ],
    skills: ['Machine Learning', 'Data Science', 'Research', 'Python', 'Jupyter Notebooks'],
    color: 'purple'
  },
  {
    title: 'Blockchain Developer Intern',
    company: 'Inspiring Wave',
    location: 'Remote',
    duration: 'June 2023 - August 2023',
    type: 'Completed',
    description: 'Developed decentralized applications and smart contracts. Gained expertise in blockchain technology and cryptocurrency ecosystems.',
    achievements: [
      'Built and deployed smart contracts on Ethereum blockchain',
      'Developed DApp interfaces using React and Web3.js',
      'Implemented security best practices for blockchain applications',
      'Contributed to tokenomics design and implementation'
    ],
    skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'DApp Development'],
    color: 'blue'
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
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              A journey through diverse internships and research opportunities across leading organizations and prestigious institutions.
            </p>
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

          {/* Summary Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Total Internships', value: '5+', color: 'purple' },
              { label: 'Research Projects', value: '10+', color: 'blue' },
              { label: 'Organizations', value: '5', color: 'pink' },
              { label: 'Years Experience', value: '2+', color: 'purple' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color === 'purple' ? 'text-purple' : stat.color === 'blue' ? 'text-blue' : 'text-pink'}`}>
                  {stat.value}
                </div>
                <div className="text-foreground-muted text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Experience;