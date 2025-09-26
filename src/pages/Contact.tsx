import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, Phone, MapPin, Linkedin, Github, Twitter, 
  Send, Calendar, MessageSquare 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Footer } from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'advait.joshi@example.com',
      href: 'mailto:advait.joshi@example.com',
      color: 'purple'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 XXXXX XXXXX',
      href: 'tel:+91XXXXXXXXX',
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Gujarat, India',
      href: '#',
      color: 'pink'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: '#',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: Github,
      name: 'GitHub',
      href: '#',
      color: 'bg-gray-800 hover:bg-gray-900'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: '#',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: MessageSquare,
      name: 'Discord',
      href: '#',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="curtain-reveal">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              I'm always interested in new opportunities, collaborations, and interesting conversations. 
              Let's connect and build something amazing together!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-card border-border">
                <div className="flex items-center space-x-2 mb-6">
                  <Send className="w-5 h-5 text-purple" />
                  <h2 className="text-2xl font-semibold">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="bg-background-secondary border-border focus:border-purple"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="bg-background-secondary border-border focus:border-purple"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="bg-background-secondary border-border focus:border-purple"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, idea, or just say hello..."
                      rows={6}
                      className="bg-background-secondary border-border focus:border-purple resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple to-blue hover:from-purple-dark hover:to-blue-dark"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              
              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <Card key={index} className="p-6 bg-card hover:bg-card-hover transition-all duration-300 border-border hover:border-purple/30">
                      <a 
                        href={method.href} 
                        className="flex items-center space-x-4 group"
                      >
                        <div className={`p-3 rounded-full bg-gradient-to-br ${
                          method.color === 'purple' ? 'from-purple to-purple-light' :
                          method.color === 'blue' ? 'from-blue to-blue-light' : 'from-pink to-pink-light'
                        }`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-purple transition-colors">
                            {method.title}
                          </h3>
                          <p className="text-foreground-muted text-sm">
                            {method.value}
                          </p>
                        </div>
                      </a>
                    </Card>
                  );
                })}
              </div>

              {/* Social Links */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-blue" />
                  Connect on Social
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`flex items-center justify-center space-x-2 p-3 rounded-lg text-white transition-all duration-300 hover:scale-105 ${social.color}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </Card>

              {/* Availability */}
              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-green-400">Currently Available</h3>
                </div>
                <p className="text-foreground-muted text-sm">
                  Open to internship opportunities, research collaborations, 
                  and freelance projects. Let's discuss how we can work together!
                </p>
              </Card>

              {/* Response Time */}
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold mb-2">📬 Response Time</h3>
                <p className="text-foreground-muted text-sm">
                  I typically respond to emails within 24 hours. For urgent matters, 
                  feel free to reach out on LinkedIn for faster communication.
                </p>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently <span className="gradient-text">Asked</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "What type of projects do you work on?",
                  answer: "I specialize in ML/AI projects, blockchain applications, and full-stack web development. I'm particularly interested in projects that solve real-world problems."
                },
                {
                  question: "Are you available for internships?",
                  answer: "Yes! I'm always looking for exciting internship opportunities, especially in ML engineering, AI research, and blockchain development."
                },
                {
                  question: "Do you offer mentoring or consultations?",
                  answer: "I'm happy to help fellow students and developers. Feel free to reach out if you have questions about ML, AI, or career advice."
                },
                {
                  question: "What's the best way to reach you?",
                  answer: "Email is the best way for detailed discussions. For quick questions, LinkedIn works great. I respond to all messages!"
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6 bg-card hover:bg-card-hover transition-all duration-300 border-border">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;