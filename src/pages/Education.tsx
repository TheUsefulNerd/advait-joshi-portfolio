import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Technology - Computer Science Engineering (Data Science)',
    institution: 'Sardar Vallabhbhai Institute of Technology (SVIT)',
    location: 'Vasad, Gujarat, India',
    duration: '2023 - 2027',
    status: 'Current',
    gpa: '8.7/10.0',
    description: 'Specializing in Data Science with focus on Machine Learning, Artificial Intelligence, and Big Data Analytics.',
    coursework: [
      'Data Structures and Algorithms',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision', 
      'Natural Language Processing',
      'Big Data Analytics',
      'Database Management Systems',
      'Software Engineering',
      'Statistics and Probability',
      'Linear Algebra'
    ],
    achievements: [
      'Dean\'s List for Academic Excellence',
      'Top 5% of the class',
      'Best Project Award in ML Course',
      'Student Research Fellowship'
    ],
    projects: [
      'AI-powered Student Performance Prediction System',
      'Blockchain-based Academic Credential Verification',
      'Computer Vision Library Management System'
    ]
  }
];

const certifications = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    date: '2023',
    credentialId: 'ABC123XYZ',
    skills: ['Machine Learning', 'Python', 'Neural Networks']
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'deeplearning.ai (Coursera)',
    date: '2023',
    credentialId: 'DEF456ABC',
    skills: ['Deep Learning', 'TensorFlow', 'CNN', 'RNN']
  },
  {
    title: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'GHI789DEF',
    skills: ['AWS', 'MLOps', 'Cloud Computing']
  },
  {
    title: 'Blockchain Fundamentals',
    issuer: 'IBM (edX)',
    date: '2023',
    credentialId: 'JKL012GHI',
    skills: ['Blockchain', 'Smart Contracts', 'Ethereum']
  }
];

const achievements = [
  'National Level Hackathon Winner - Smart India Hackathon 2024',
  'Best Research Paper Award - IEEE Conference on AI & Data Science',
  'Google Summer of Code Participant 2024',
  'Microsoft Student Partner Program',
  'NVIDIA DLI Certified Instructor',
  'Published 3 Research Papers in International Journals'
];

import { Footer } from '@/components/Footer';

const Education = () => {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="curtain-reveal">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Education & <span className="gradient-text">Qualifications</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              My academic journey in Computer Science and Data Science, along with continuous learning through certifications and achievements.
            </p>
          </div>

          {/* Main Education */}
          <div className="mb-16">
            {education.map((edu, index) => (
              <Card key={index} className="p-8 bg-gradient-to-br from-purple/5 to-blue/5 border-purple/30 hover:border-purple/50 transition-all duration-300">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <GraduationCap className="w-6 h-6 text-purple" />
                      <h2 className="text-2xl font-semibold text-foreground">{edu.degree}</h2>
                    </div>
                    <h3 className="text-xl text-blue font-medium mb-2">{edu.institution}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-foreground-muted text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 mt-4 md:mt-0">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      {edu.status}
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-foreground-muted">Current GPA</div>
                      <div className="text-2xl font-bold text-purple">{edu.gpa}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground-muted mb-8 leading-relaxed">
                  {edu.description}
                </p>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Coursework */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue" />
                      Key Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-background/50 border-border hover:bg-background/70 hover:border-blue/30"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-pink" />
                      Academic Achievements
                    </h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-foreground-muted flex items-start space-x-2">
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple to-pink mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Notable Projects */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Notable Projects</h4>
                    <ul className="space-y-2">
                      {edu.projects.map((project, i) => (
                        <li key={i} className="text-sm text-foreground-muted flex items-start space-x-2">
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue to-purple mt-2 flex-shrink-0" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Professional <span className="gradient-text">Certifications</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-6 bg-card hover:bg-card-hover transition-all duration-300 border-border hover:border-blue/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{cert.title}</h3>
                      <p className="text-blue font-medium text-sm">{cert.issuer}</p>
                    </div>
                    <Badge variant="outline" className="bg-purple/20 text-purple border-purple/30">
                      {cert.date}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-foreground-muted mb-2">Credential ID: {cert.credentialId}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs bg-background/30 border-border"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements & Awards */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Awards & <span className="gradient-text">Recognition</span>
            </h2>
            
            <Card className="p-8 bg-gradient-to-r from-pink/5 to-purple/5 border-pink/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink to-purple flex-shrink-0" />
                    <span className="text-foreground-muted">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Education Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Current GPA', value: '8.7/10', color: 'purple' },
              { label: 'Certifications', value: '15+', color: 'blue' },
              { label: 'Research Papers', value: '3', color: 'pink' },
              { label: 'Years of Study', value: '2+', color: 'purple' }
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Education;