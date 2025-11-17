import { useState } from "react";
import { Calendar, MapPin, Phone, User, Mail, Car } from "lucide-react";
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

interface TestDriveFormProps {
  children: React.ReactNode;
}

const TestDriveForm = ({ children }: TestDriveFormProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    vehicleModel: "",
    preferredDate: "",
    preferredTime: "",
    location: "",
    message: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation aligned with backend expectations
    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate || !formData.preferredTime || !formData.vehicleModel) {
      toast({
        title: "Required fields missing",
        description: "Please fill in name, email, phone, vehicle, preferred date and time.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/test-drive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          vehicleModel: formData.vehicleModel,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit test drive request.");
      }

      toast({
        title: "Test Drive Booked!",
        description: data?.message || "We'll contact you shortly to confirm your appointment.",
      });

      setOpen(false);
      setFormData(initialFormState);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            Book Your Test Drive
          </DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll contact you to schedule your personalized test drive experience.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicle" className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                Vehicle of Interest
              </Label>
              <Select value={formData.vehicleModel} onValueChange={(value) => handleInputChange("vehicleModel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Luxury Sedan">Luxury Sedan</SelectItem>
                  <SelectItem value="Sports Car">Sports Car</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Electric Vehicle">Electric Vehicle</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Preferred Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="17:00">5:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Preferred Location
            </Label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="downtown">Downtown Showroom</SelectItem>
                <SelectItem value="north">North Branch</SelectItem>
                <SelectItem value="south">South Branch</SelectItem>
                <SelectItem value="home">Home Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Any specific requirements or questions?"
              rows={3}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="btn-premium flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Book Test Drive"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestDriveForm;