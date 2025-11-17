import { Award, Users, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const stats = [
    { icon: Award, label: "Years of Excellence", value: "25+" },
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: MapPin, label: "Showroom Locations", value: "15" },
    { icon: Clock, label: "Service Hours", value: "24/7" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "General Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b8?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Amit Patel",
      role: "Service Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About <span className="text-gradient">PremiumAuto</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your trusted automotive partner for over two decades
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Our Story
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Founded in 1999, PremiumAuto began as a small family business with a 
                    simple mission: to provide quality vehicles and exceptional service to 
                    our community. Today, we've grown to become one of the region's most 
                    trusted automotive dealerships.
                  </p>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our commitment to excellence has earned us partnerships with leading 
                    automotive brands and the trust of thousands of satisfied customers. 
                    We believe in building relationships, not just making sales.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-glow">
                          <stat.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="text-2xl font-bold text-primary mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                  <blockquote className="text-lg text-muted-foreground italic mb-6">
                    "To provide our customers with premium vehicles, transparent pricing, 
                    and exceptional service that exceeds expectations at every step of 
                    their automotive journey."
                  </blockquote>
                  
                  <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Integrity in all our business practices</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Customer satisfaction as our top priority</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Continuous innovation and improvement</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Supporting our local community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Partners */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Authorized Dealer for <span className="text-gradient">Premium Brands</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Proud partners with India's leading automotive manufacturers
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {["Hyundai", "Tata Motors", "Mahindra", "Bajaj", "Maruti Suzuki", "Toyota"].map((brand) => (
                <div key={brand} className="glass-card p-6 text-center">
                  <h3 className="font-bold text-lg">{brand}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Meet Our <span className="text-gradient">Team</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Experienced professionals dedicated to your satisfaction
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="premium-card text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                  />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;