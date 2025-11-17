import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, Star, ArrowRight, CheckCircle, Users, Globe, Award, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully! 🎉",
      description: "Thank you for reaching out. Our team will contact you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant answers to your questions",
      action: "Start Chatting",
      available: "Available 24/7",
      color: "from-blue-500 to-blue-600",
      delay: "0s"
    },
    {
      icon: Phone,
      title: "Call Expert",
      description: "Speak directly with our specialists",
      action: "+1 (555) 123-4567",
      available: "Mon-Fri 9AM-8PM",
      color: "from-green-500 to-green-600",
      delay: "0.1s"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send detailed inquiries and get comprehensive answers",
      action: "info@premiumauto.com",
      available: "Response within 2 hours",
      color: "from-purple-500 to-purple-600",
      delay: "0.2s"
    },
    {
      icon: Calendar,
      title: "Visit Showroom",
      description: "Schedule a personal tour and test drive",
      action: "Book Your Visit",
      available: "Flexible scheduling",
      color: "from-orange-500 to-orange-600",
      delay: "0.3s"
    }
  ];

  const stats = [
    { 
      icon: Users,
      number: "50K+", 
      label: "Happy Customers",
      description: "Satisfied customers nationwide"
    },
    { 
      icon: Award,
      number: "15+", 
      label: "Years Experience",
      description: "In automotive excellence"
    },
    { 
      icon: Zap,
      number: "24/7", 
      label: "Customer Support",
      description: "Always here to help"
    },
    { 
      icon: Star,
      number: "4.9/5", 
      label: "Customer Rating",
      description: "Based on 10K+ reviews"
    }
  ];

  const features = [
    "Expert consultation and guidance",
    "Comprehensive vehicle inspection",
    "Financing options available",
    "Extended warranty programs",
    "Trade-in evaluation service",
    "After-sales support"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-primary/20 animate-fade-in">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Trusted Worldwide</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Ready to Find Your
                <span className="block text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Dream Car?
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who found their perfect vehicle with our expert guidance and exceptional service.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button className="btn-premium text-lg px-8 py-4 h-auto group">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-4 h-auto hover:bg-primary/5 hover:text-foreground border-white/20 text-white">
                  Browse Inventory
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-muted/30 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className={`text-center hover-scale border-0 bg-card/50 backdrop-blur-sm transition-all duration-500 animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                      <stat.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-sm font-semibold text-primary mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose your preferred way to connect with our team of automotive experts
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactMethods.map((method, index) => (
                <Card key={index} className={`group hover-scale cursor-pointer transition-all duration-500 border-0 bg-card/70 backdrop-blur-sm hover:shadow-2xl animate-fade-in`} style={{ animationDelay: method.delay }}>
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center flex flex-col items-center h-full min-h-[320px]">
                    <div className="flex flex-col items-center flex-1 justify-center">
                      <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${method.color} rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-4 px-2 leading-tight">{method.title}</h3>
                      <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base px-2 text-center max-w-[200px]">{method.description}</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3 mt-auto">
                      <Button variant="ghost" className="text-primary hover:bg-primary/10 font-semibold group text-sm sm:text-base px-3 sm:px-4 whitespace-nowrap">
                        {method.action}
                        <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <p className="text-xs text-muted-foreground font-medium px-2 text-center">{method.available}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-2xl">
                  <CardContent className="p-8 lg:p-12">
                    <div className="mb-8">
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">Let's Start the Conversation</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Tell us about your automotive needs and preferences. Our team will craft a personalized solution just for you.
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-foreground">
                            Full Name *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="h-14 text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-foreground">
                            Phone Number *
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+1 (555) 123-4567"
                            className="h-14 text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-foreground">
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="h-14 text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-foreground">
                          Subject
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="I'm interested in..."
                          className="h-14 text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-foreground">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Tell us about your requirements, preferred vehicle type, budget, or any specific questions..."
                          className="text-base resize-none bg-background/50 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>

                      <Button type="submit" className="btn-premium w-full h-16 text-lg group">
                        Send Message
                        <Send className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Showroom Info */}
                <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <MapPin className="w-6 h-6 text-primary mr-3" />
                      Premium Showroom
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground flex items-center">
                          <MapPin className="w-4 h-4 text-primary mr-2" />
                          Address
                        </h4>
                        <p className="text-muted-foreground leading-relaxed pl-6">
                          123 Auto Plaza, Premium District<br />
                          City Center, State 12345<br />
                          United States
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground flex items-center">
                          <Clock className="w-4 h-4 text-primary mr-2" />
                          Business Hours
                        </h4>
                        <div className="space-y-2 text-muted-foreground pl-6">
                          <div className="flex justify-between">
                            <span>Mon - Fri:</span>
                            <span className="font-medium">9:00 AM - 8:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span className="font-medium">10:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span className="font-medium">12:00 PM - 5:00 PM</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Direct Contact</h4>
                        <div className="space-y-3 pl-6">
                          <div className="flex items-center space-x-3 group cursor-pointer">
                            <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">+1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center space-x-3 group cursor-pointer">
                            <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">info@premiumauto.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us */}
                <Card className="border-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-6 text-center">Why Choose PremiumAuto?</h3>
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 group">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-6 text-center">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary/50 transition-all group">
                        <Calendar className="w-4 h-4 mr-3 group-hover:text-primary transition-colors" />
                        Schedule Test Drive
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary/50 transition-all group">
                        <Phone className="w-4 h-4 mr-3 group-hover:text-primary transition-colors" />
                        Request Callback
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary/50 transition-all group">
                        <MapPin className="w-4 h-4 mr-3 group-hover:text-primary transition-colors" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Drive Your Dream Car?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of satisfied customers who found their perfect vehicle with PremiumAuto.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 h-auto group">
                  Browse Our Inventory
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto border-white/30 text-white hover:bg-white/10">
                  Book Test Drive
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;