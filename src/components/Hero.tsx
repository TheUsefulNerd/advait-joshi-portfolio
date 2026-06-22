import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Hero() {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Advait Joshi";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Text Content */}
        <div className="space-y-8 curtain-reveal">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins">
              <span className="gradient-text">{text}</span>
              <span className="animate-pulse">|</span>
            </h1>
            
            <div className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              <div>
                ML Engineer Intern @TechPeek | AI Engineer Intern @DRDO | Research Intern @IIT Kanpur | SVIT CSE(Data Science) ’2027
              </div>
            </div>
          </div>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Portfolio — outline/secondary */}
          <Link to="/portfolio/about">
            <Button
              size="lg"
              variant="outline"
              className="border-purple/40 text-purple hover:bg-purple/10 hover:border-purple/70 px-8 py-3 text-base font-semibold transition-all duration-200"
            >
              Portfolio
            </Button>
          </Link>

          {/* Blogs — primary/filled */}
          <Link to="/blog">
            <Button
              size="lg"
              variant="default"
              className="bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark px-8 py-3 text-base font-semibold shadow-lg hover:shadow-purple/30 transition-all duration-200"
            >
              Blogs
            </Button>
          </Link>

          {/* My Resume — plain text, tertiary, no icon, opens Google Drive */}
          <a
            href="https://drive.google.com/file/d/1_tN3lFRTE-CPvXKdJnqyi-5P2DcLxo4O/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              className="text-foreground-muted hover:text-foreground text-sm font-medium px-3 underline-offset-4 hover:underline transition-all duration-200"
            >
              My Resume
            </Button>
          </a>
        </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {[
              { icon: Github, href: 'https://github.com/TheUsefulNerd', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/advaitszone', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:advaitszone@gmail.com', label: 'Email' },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card hover:bg-card-hover border border-border transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

        </div>

       {/* Right Side - Animated Photo Placeholder */}
        <div className="flex justify-center items-center relative">
          <div className="relative">

            {/* Main Photo Circle */}
            <div className="hero-photo-ring w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-purple via-blue to-pink p-1 float-animation">
              <div className="w-full h-full rounded-full bg-background-secondary flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple/20 via-blue/20 to-pink/20 flex items-center justify-center">
                  <img
                    src="/Linkedin PFP.jpg"
                    alt="LinkedIn Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

          



            {/* Floating Soundwave Bars — left */}
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="soundwave-bar-left w-1 bg-gradient-to-t from-purple to-blue rounded-full soundwave-animation"
                  style={{
                    height: `${30 + index * 10}px`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Floating Soundwave Bars — right */}
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="soundwave-bar-right w-1 bg-gradient-to-t from-blue to-pink rounded-full soundwave-animation"
                  style={{
                    height: `${50 - index * 8}px`,
                    animationDelay: `${index * 0.15}s`,
                  }}
                />
              ))}
            </div>

            {/* Pulsing Glow Effect */}
            <div className="hero-pulse-glow absolute inset-0 rounded-full pulse-glow opacity-30 pointer-events-none" />
          </div>
        </div>
      </div>

    </section>
  );
}