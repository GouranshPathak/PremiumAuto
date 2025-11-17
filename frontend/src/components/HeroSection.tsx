import { ArrowRight, Play, Shield, CreditCard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const valueProps = [
    {
      icon: Shield,
      title: "Certified Quality",
      description: "Every vehicle undergoes rigorous inspection"
    },
    {
      icon: CreditCard,
      title: "Flexible Financing",
      description: "Custom payment plans to fit your budget"
    },
    {
      icon: Home,
      title: "Home Test Drives",
      description: "Experience vehicles at your convenience"
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Vehicle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
                Find Your
                <span className="block text-gradient">Next Drive</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-slide-up">
                Discover premium vehicles from trusted brands. Experience luxury, 
                performance, and reliability in every mile.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-scale-in">
                <Button 
                  size="lg" 
                  className="btn-premium group"
                  onClick={() => navigate('/inventory')}
                >
                  Explore Inventory
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10 hover:text-white">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Tour
                </Button>
              </div>
            </div>

            {/* Right Content - Value Propositions */}
            <div className="space-y-6">
              {valueProps.map((prop, index) => (
                <div
                  key={prop.title}
                  className="glass-card p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-glow">
                        <prop.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{prop.title}</h3>
                      <p className="text-muted-foreground">{prop.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroSection;