import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Mumbai, Maharashtra",
    vehicle: "Hyundai Creta SX",
    rating: 5,
    image: "/placeholder.svg",
    review: "Exceptional service from start to finish! The team at PremiumAuto helped me find the perfect Creta. The buying process was smooth, transparent, and hassle-free. Highly recommend!",
    date: "2 months ago"
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Ahmedabad, Gujarat",
    vehicle: "Tata Harrier XZ+",
    rating: 5,
    image: "/placeholder.svg",
    review: "Amazing experience! The staff was knowledgeable and patient. They explained every feature of the Harrier and made sure I was completely satisfied. Best car buying experience ever!",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Vikash Kumar",
    location: "Delhi, NCR",
    vehicle: "Mahindra XUV700 AX7",
    rating: 4,
    image: "/placeholder.svg",
    review: "Great dealership with professional service. The XUV700 is fantastic and the after-sales support has been excellent. Quick delivery and fair pricing. Very satisfied with my purchase.",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Bangalore, Karnataka",
    vehicle: "Hyundai Creta EX",
    rating: 5,
    image: "/placeholder.svg",
    review: "Outstanding customer service! The team went above and beyond to ensure I got the best deal. The car handover was seamless and they explained all the features thoroughly.",
    date: "2 weeks ago"
  },
  {
    id: 5,
    name: "Arjun Singh",
    location: "Pune, Maharashtra",
    vehicle: "Tata Harrier XM",
    rating: 4,
    image: "/placeholder.svg",
    review: "Professional and trustworthy dealership. They provided excellent financing options and the entire process was transparent. Happy with my Harrier and the service quality.",
    date: "1 week ago"
  },
  {
    id: 6,
    name: "Kavya Nair",
    location: "Kochi, Kerala",
    vehicle: "Mahindra XUV700 AX5",
    rating: 5,
    image: "/placeholder.svg",
    review: "Excellent experience from consultation to delivery. The team was patient with all my questions and helped me choose the right variant. The XUV700 exceeds all expectations!",
    date: "4 days ago"
  }
];

const stats = [
  { label: "Happy Customers", value: "5,000+" },
  { label: "Customer Satisfaction", value: "98%" },
  { label: "5-Star Reviews", value: "4,500+" },
  { label: "Years of Excellence", value: "15+" }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const featuredTestimonials = testimonials.slice(0, 2);
  const regularTestimonials = testimonials.slice(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Floating Elements */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">Trusted by 5,000+ customers</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Real Stories from
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                Happy Customers
              </span>
            </h1>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Discover why PremiumAuto has become the most trusted name in automotive excellence. 
              Every review tells a story of quality, service, and satisfaction.
            </p>
          </div>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center animate-fade-in hover:bg-white/15 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-200">{stat.value}</div>
                <div className="text-sm opacity-80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Stories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from our most satisfied customers about their journey with PremiumAuto
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {featuredTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <Quote className="w-12 h-12 text-primary opacity-20" />
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-muted-foreground mb-8 leading-relaxed italic">
                    "{testimonial.review}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-muted"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg">{testimonial.name}</h4>
                      <p className="text-muted-foreground">{testimonial.location}</p>
                      <p className="text-primary font-semibold">{testimonial.vehicle}</p>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      {testimonial.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              More Customer Reviews
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who made the right choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {regularTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <Quote className="w-6 h-6 text-primary/30" />
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm line-clamp-4">
                    "{testimonial.review}"
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-muted"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm truncate">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-primary font-medium">{testimonial.vehicle}</p>
                      <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"></div>
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
              Join our family of satisfied customers. Experience the PremiumAuto difference where 
              every customer becomes a success story worth sharing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/inventory"
                className="bg-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-lg"
              >
                Browse Our Inventory
              </a>
              <a
                href="/contact"
                className="bg-background text-foreground border-2 border-primary/20 px-10 py-4 rounded-xl font-semibold hover:bg-primary/5 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-lg"
              >
                Schedule a Visit
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;