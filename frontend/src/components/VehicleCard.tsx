import { Car, Fuel, Calendar, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TestDriveForm from "@/components/TestDriveForm";

interface Vehicle {
  id: string;
  name: string;
  price: number;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  image: string;
  bodyType: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/vehicle/${vehicle.id}`, { state: vehicle });
  };

  return (
    <div className="premium-card group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {vehicle.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
          {vehicle.name}
        </h3>
        
        <div className="text-xl sm:text-2xl font-bold text-primary mb-4">
          ₹{vehicle.price.toLocaleString("en-IN")} Lakh
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Fuel className="w-4 h-4" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-4 h-4" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4" />
            <span>{vehicle.mileage}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button 
            variant="outline" 
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <TestDriveForm>
            <Button className="flex-1 btn-premium">
              Test Drive
            </Button>
          </TestDriveForm>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;