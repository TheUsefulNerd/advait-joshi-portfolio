import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    skills: ['Python', 'JavaScript', 'SQL', 'FastAPI', 'PyTorch', 'React.js', 'Next.js 15', 'Node.js']
  },
  {
    title: 'AI & Orchestration',
    skills: ['LangGraph', 'LangChain', 'RAG Pipelines', 'Agentic Workflows', 'LLM Fine-tuning', 'Hugging Face', 'SLMs', 'llama.cpp']
  },
  {
    title: 'Databases & Vector Stores',
    skills: ['PostgreSQL', 'Supabase', 'Qdrant', 'ChromaDB', 'FAISS', 'MySQL']
  },
  {
    title: 'Tools & Infrastructure',
    skills: ['Docker', 'Git', 'Vercel', 'Render', 'Postman', 'OpenTelemetry', 'LangSmith']
  }
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
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-sm py-1.5 px-3 bg-background/50 border-border hover:bg-background/70">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Programming Languages', count: '5+', color: 'purple' },
              { label: 'ML/AI Frameworks', count: '8+', color: 'blue' },
              { label: 'Years of Experience - Internship', count: '1+', color: 'pink' },
              { label: 'Projects Completed', count: '10+', color: 'purple' }
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

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Skills;