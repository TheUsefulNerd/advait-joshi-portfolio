import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin, Heart, Coffee, Zap } from 'lucide-react';

export const Footer = () => {
  return (
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
                <p className="text-sm text-foreground-muted">AI Engineer</p>
              </div>
            </div>
            
            <p className="text-foreground-muted leading-relaxed mb-6 max-w-md">
              AI Engineer specializing in agentic systems, RAG pipelines, and multi-agent orchestration.
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
                { name: 'About Me', path: '/portfolio/about' },
                { name: 'Experience', path: '/portfolio/experience' },
                { name: 'Projects', path: '/portfolio/projects' },
                { name: 'Education', path: '/portfolio/about#education' }
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
                { name: 'Email', icon: Mail, href: 'mailto:advaitszone@gmail.com', newTab: true }
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
              <span>© {new Date().getFullYear()} - Advait Joshi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};