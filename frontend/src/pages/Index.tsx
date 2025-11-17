import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import TestDriveSection from "@/components/TestDriveSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedVehicles />
        <TestDriveSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
