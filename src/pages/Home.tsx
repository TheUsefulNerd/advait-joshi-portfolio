import { Hero } from '@/components/Hero';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code2, Brain, Shield, 
  Github, Linkedin, Mail, MapPin, 
  Heart, Coffee, Zap, Award, BookOpen,
  Users, TrendingUp
} from 'lucide-react';

const Home = () => {
  const highlights = [
    {
      icon: Brain,
      title: 'AI & ML Engineering',
      description: 'Exploring the frontiers of LLMs through RAG, interpretability research, and hands-on chatbot development.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Software Engineering',
      description: 'Building backend systems, managing databases, and integrating security in offline RAG setups.',
      color: 'blue'
    },
    {
      icon: Code2,
      title: 'Research',
      description: 'Focus: Mechanistic Interpretability, Benchmarking, Knowledge Growth & Hallucinations.',
      color: 'pink'
    }
  ];

  const quickStats = [
    { label: 'Internships', value: '5+' },
    { label: 'Research Papers (Ongoing)', value: '3+' },
    { label: 'Projects', value: '10+' },
    { label: 'Technologies', value: '25+' }
  ];

  const interests = [
    'Machine Learning', 'Artificial Intelligence', 'Blockchain Technology',
    'Data Science', 'Software Engineering', 'Natural Language Processing',
    'Deep Learning', 'Backend Development', 'Research & Innovation'
  ];

  const goals = [
    'Contribute to cutting-edge AI research',
    'Build impactful ML solutions for real-world problems',
    'Advance the field of Software Engineering',
    'Mentor aspiring developers and researchers',
    'Pursue graduate studies in AI/ML'
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* About Section */}
      <section className="py-20 px-4 bg-background-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="curtain-reveal">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              <p className="text-lg text-foreground-muted max-w-3xl mx-auto leading-relaxed">
                Passionate about leveraging technology to solve complex problems and drive innovation in AI, ML, and Software domains.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-8 text-center bg-card hover:bg-card-hover transition-all duration-300 border-border hover:border-purple/30 hover:scale-105 group"
                  >
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      highlight.color === 'purple' ? 'bg-purple/20 group-hover:bg-purple/30' :
                      highlight.color === 'blue' ? 'bg-blue/20 group-hover:bg-blue/30' : 'bg-pink/20 group-hover:bg-pink/30'
                    } transition-all duration-300`}>
                      <Icon className={`w-8 h-8 ${
                        highlight.color === 'purple' ? 'text-purple' :
                        highlight.color === 'blue' ? 'text-blue' : 'text-pink'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {highlight.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed">
                      {highlight.description}
                    </p>
                  </Card>
                );
              })}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground-muted text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid - My Journey */}
            <div className="grid grid-cols-1 gap-8 mb-16">
              
              {/* Background Story */}
              <Card className="p-8 bg-card hover:bg-card-hover transition-all duration-300 border-border">
                <h2 className="text-2xl font-semibold mb-6 text-blue">My Journey</h2>
                <div className="space-y-4 text-foreground-muted leading-relaxed">
                  <p>
                    I'm a third-year Computer Science Engineering student specializing in Data Science at SVIT, 
                    graduating in 2027. My journey into technology began with a curiosity about how intelligent 
                    systems like Alexa and Google Home work and has evolved into a passion for creating innovative solutions.
                  </p>
                  <p>
                    Currently working as an ML Engineer Intern at TechPeek, AI Engineer Intern at DRDO
                    I've had the privilege of working on diverse projects ranging from RAG Systems, Offline LLM's, Fine Tuning LLM's 
                    to blockchain applications. My research internships at IIT Kanpur and IIT Patna have further 
                    solidified my commitment to advancing the field of artificial intelligence.
                  </p>
                  <p>
                    Beyond technical skills, I believe in the power of collaboration and knowledge sharing. 
                    I'm always eager to learn from others and contribute to the tech community through 
                    open-source projects and research initiatives.
                  </p>
                </div>
              </Card>

            </div>

            {/* Interests Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Areas of <span className="gradient-text">Interest</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-4 py-2 text-sm bg-gradient-to-r from-purple/10 to-blue/10 border-purple/30 hover:from-purple/20 hover:to-blue/20 transition-all duration-300 hover:scale-105"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Goals Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Future <span className="gradient-text">Goals</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal, index) => (
                  <Card key={index} className="p-6 bg-card hover:bg-card-hover transition-all duration-300 border-border hover:border-purple/30 group">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple to-pink mt-2 group-hover:scale-150 transition-transform duration-300" />
                      <p className="text-foreground-muted group-hover:text-foreground transition-colors duration-300">
                        {goal}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Fun Facts */}
            <Card className="p-8 bg-gradient-to-r from-purple/5 to-pink/5 border-purple/20">
              <h2 className="text-2xl font-semibold mb-6 text-center">Fun Facts About Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue mb-2">2+</div>
                  <p className="text-foreground-muted">Internships Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple mb-2">2+</div>
                  <p className="text-foreground-muted">IIT Research Collaborations</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink mb-2">24/7</div>
                  <p className="text-foreground-muted">Coding, Learning & Helping People Grow</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center">
                <img
                    src="/Linkedin PFP.jpg"
                    alt="LinkedIn Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Advait Joshi</h3>
                <p className="text-sm text-foreground-muted">ML Engineer & AI Researcher</p>
              </div>
            </div>
            
            <p className="text-foreground-muted leading-relaxed mb-6 max-w-md">
              Passionate about leveraging cutting-edge technology to solve real-world problems. 
              Currently building the future of AI and Software innovations.
            </p>

            <div className="flex items-center space-x-2 text-foreground-muted text-sm">
              <MapPin className="w-4 h-4" />
              <span>Hyderabad, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'Experience', path: '/experience' },
                { name: 'Projects', path: '/projects' },
                { name: 'Research', path: '/research' },
                { name: 'Skills', path: '/skills' }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block text-foreground-muted hover:text-purple transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-3">
              {[
                { name: 'GitHub', icon: Github, href: 'https://github.com/TheUsefulNerd', newTab: true },
                { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/advaitszone', newTab: true },
                { name: 'Email', icon: Mail, href: 'mailto:advait@example.com', newTab: true }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-foreground-muted hover:text-purple transition-colors duration-200 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="flex items-center space-x-4 text-sm text-foreground-muted">
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-purple" />
                <span>Available for opportunities</span>
              </div>
              <span>© 2025 - Advait Joshi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Home;