import { useState } from "react";
import { Car, User, Mail, Phone, MapPin, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CarBookingFormProps {
  children: React.ReactNode;
  vehicleName?: string;
  vehiclePrice?: number;
  availableColors?: Array<{id: string, name: string, value: string}>;
}

const CarBookingForm = ({ children, vehicleName = "", vehiclePrice = 0, availableColors = [] }: CarBookingFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    model: vehicleName,
    color: "",
    variant: "",
    additionalRequirements: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.color) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Booking Request Submitted!",
      description: `Thank you ${formData.name}! We'll contact you within 24 hours to confirm your ${formData.model} booking.`,
    });

    // Reset form and close dialog
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      model: vehicleName,
      color: "",
      variant: "",
      additionalRequirements: ""
    });
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Book Your {vehicleName}
          </DialogTitle>
          <DialogDescription>
            Fill in your details to book your new {vehicleName}. Our team will contact you to finalize the purchase.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="pl-10 min-h-[80px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vehicle Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  readOnly
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Preferred Color *</Label>
                <div className="relative">
                  <Palette className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColors.map((color) => (
                        <SelectItem key={color.id} value={color.name}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.value }}
                            />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="variant">Variant Preference</Label>
              <Select value={formData.variant} onValueChange={(value) => handleInputChange("variant", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select variant (if any)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="base">Base Variant</SelectItem>
                  <SelectItem value="mid">Mid Variant</SelectItem>
                  <SelectItem value="top">Top Variant</SelectItem>
                  <SelectItem value="custom">Custom Requirements</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Requirements</h3>
            <div className="space-y-2">
              <Label htmlFor="additionalRequirements">Special Requests or Requirements</Label>
              <Textarea
                id="additionalRequirements"
                placeholder="Any additional accessories, delivery preferences, or special requirements..."
                value={formData.additionalRequirements}
                onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Price Summary */}
          {vehiclePrice > 0 && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
              <div className="flex justify-between items-center">
                <span>Ex-showroom Price:</span>
                <span className="font-bold">₹{vehiclePrice.toLocaleString("en-IN")} Lakh</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                *Final price may vary based on variant, accessories, and location. Our team will provide detailed pricing.
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 btn-premium">
              Submit Booking Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CarBookingForm;
