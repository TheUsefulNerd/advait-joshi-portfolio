import { Hero } from '@/components/Hero';
import { SEO } from '@/components/SEO';

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO title="Advait Joshi | Portfolio & Blog" />
      <Hero />
    </div>
  );
};

export default Home;