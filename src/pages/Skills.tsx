import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 95, color: 'from-blue-500 to-blue-600' },
      { name: 'JavaScript/TypeScript', level: 90, color: 'from-yellow-500 to-yellow-600' },
      { name: 'Solidity', level: 85, color: 'from-purple-500 to-purple-600' },
      { name: 'Java', level: 80, color: 'from-red-500 to-red-600' },
      { name: 'C/C++', level: 75, color: 'from-green-500 to-green-600' },
      { name: 'R', level: 70, color: 'from-pink-500 to-pink-600' }
    ]
  },
  {
    title: 'Machine Learning & AI',
    skills: [
      { name: 'TensorFlow', level: 90, color: 'from-orange-500 to-orange-600' },
      { name: 'PyTorch', level: 88, color: 'from-red-500 to-red-600' },
      { name: 'Scikit-learn', level: 92, color: 'from-blue-500 to-blue-600' },
      { name: 'Computer Vision', level: 85, color: 'from-purple-500 to-purple-600' },
      { name: 'NLP', level: 82, color: 'from-green-500 to-green-600' },
      { name: 'Deep Learning', level: 87, color: 'from-pink-500 to-pink-600' }
    ]
  },
  {
    title: 'Data Science & Analytics',
    skills: [
      { name: 'Pandas', level: 95, color: 'from-blue-500 to-blue-600' },
      { name: 'NumPy', level: 93, color: 'from-yellow-500 to-yellow-600' },
      { name: 'Data Visualization', level: 88, color: 'from-purple-500 to-purple-600' },
      { name: 'Statistical Analysis', level: 85, color: 'from-green-500 to-green-600' },
      { name: 'SQL', level: 90, color: 'from-red-500 to-red-600' },
      { name: 'Apache Spark', level: 75, color: 'from-pink-500 to-pink-600' }
    ]
  },
  {
    title: 'Blockchain & Web3',
    skills: [
      { name: 'Ethereum', level: 88, color: 'from-purple-500 to-purple-600' },
      { name: 'Smart Contracts', level: 85, color: 'from-blue-500 to-blue-600' },
      { name: 'Web3.js', level: 82, color: 'from-green-500 to-green-600' },
      { name: 'DApp Development', level: 80, color: 'from-yellow-500 to-yellow-600' },
      { name: 'IPFS', level: 75, color: 'from-red-500 to-red-600' },
      { name: 'Hardhat', level: 78, color: 'from-pink-500 to-pink-600' }
    ]
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'React', level: 92, color: 'from-blue-500 to-blue-600' },
      { name: 'Node.js', level: 87, color: 'from-green-500 to-green-600' },
      { name: 'HTML/CSS', level: 95, color: 'from-orange-500 to-orange-600' },
      { name: 'Tailwind CSS', level: 90, color: 'from-purple-500 to-purple-600' },
      { name: 'Express.js', level: 85, color: 'from-yellow-500 to-yellow-600' },
      { name: 'MongoDB', level: 80, color: 'from-red-500 to-red-600' }
    ]
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Git/GitHub', level: 95, color: 'from-purple-500 to-purple-600' },
      { name: 'Docker', level: 80, color: 'from-blue-500 to-blue-600' },
      { name: 'Jupyter Notebooks', level: 90, color: 'from-orange-500 to-orange-600' },
      { name: 'AWS', level: 75, color: 'from-yellow-500 to-yellow-600' },
      { name: 'Linux/Unix', level: 85, color: 'from-green-500 to-green-600' },
      { name: 'MLOps', level: 78, color: 'from-pink-500 to-pink-600' }
    ]
  }
];

const certifications = [
  'TensorFlow Developer Certificate',
  'AWS Machine Learning Specialty',
  'Deep Learning Specialization - Coursera',
  'Blockchain Fundamentals - edX',
  'Data Science Professional Certificate',
  'Python for Everybody Specialization'
];

import { Footer } from '@/components/Footer';

const Skills = () => {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="curtain-reveal">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technical <span className="gradient-text">Skills</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical expertise across machine learning, AI, blockchain, and full-stack development.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-8 bg-card hover:bg-card-hover transition-all duration-300 border-border">
                <h2 className="text-2xl font-semibold mb-6 text-gradient bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent">
                  {category.title}
                </h2>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-foreground-muted text-sm">{skill.level}%</span>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={skill.level} 
                          className="h-2 bg-background-secondary"
                        />
                        <div 
                          className={`absolute top-0 left-0 h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Programming Languages', count: '6+', color: 'purple' },
              { label: 'ML/AI Frameworks', count: '10+', color: 'blue' },
              { label: 'Years of Experience', count: '3+', color: 'pink' },
              { label: 'Projects Completed', count: '25+', color: 'purple' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  stat.color === 'purple' ? 'text-purple' : 
                  stat.color === 'blue' ? 'text-blue' : 'text-pink'
                }`}>
                  {stat.count}
                </div>
                <div className="text-foreground-muted text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <Card className="p-8 bg-gradient-to-r from-purple/5 to-pink/5 border-purple/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Certifications & <span className="gradient-text">Achievements</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="p-3 text-sm text-center bg-card hover:bg-card-hover border-border hover:border-purple/30 transition-all duration-300 hover:scale-105 justify-center"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </Card>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Skills;