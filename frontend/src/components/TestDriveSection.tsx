import { Calendar, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestDriveForm from "@/components/TestDriveForm";

const TestDriveSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Experience
            <span className="block text-gradient">Luxury?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Book a personalized test drive and feel the difference. Our experts will 
            guide you through every feature of your chosen vehicle.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-muted-foreground">
                Pick your preferred date and time from our flexible calendar
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multiple Locations</h3>
              <p className="text-muted-foreground">
                Choose from our showrooms or opt for home delivery
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">
                Get personalized guidance from our certified consultants
              </p>
            </div>
          </div>

          <TestDriveForm>
            <Button size="lg" className="btn-premium text-lg px-12 py-4">
              Book Your Test Drive Now
            </Button>
          </TestDriveForm>
          
          <p className="text-sm text-muted-foreground mt-4">
            No commitment required • Free consultation included
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestDriveSection;