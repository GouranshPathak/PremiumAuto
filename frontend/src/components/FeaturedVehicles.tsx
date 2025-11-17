import VehicleCard from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Import actual Tata car images
import harrierImage from "@/assets/tata-harrier/orange.jpeg";
import nexonImage from "@/assets/tata-nexon/Daytona_grey.webp";
import curvvImage from "@/assets/tata-curvv/white.jpg";

const FeaturedVehicles = () => {
  const navigate = useNavigate();
  const featuredVehicles = [
    {
      id: "harrier",
      name: "Tata Harrier",
      price: 15.50,
      year: 2024,
      mileage: "16.5 kmpl",
      fuelType: "Diesel",
      transmission: "Automatic",
      image: harrierImage,
      bodyType: "SUV"
    },
    {
      id: "nexon", 
      name: "Tata Nexon",
      price: 8.15,
      year: 2024,
      mileage: "17.5 kmpl",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: nexonImage,
      bodyType: "SUV"
    },
    {
      id: "curvv",
      name: "Tata Curvv",
      price: 10.00,
      year: 2024,
      mileage: "17.5 kmpl", 
      fuelType: "Petrol",
      transmission: "Manual",
      image: curvvImage,
      bodyType: "SUV"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Tata Vehicles</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium Tata vehicles from our exclusive collection
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-premium group"
            onClick={() => navigate('/inventory')}
          >
            View All Inventory
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
