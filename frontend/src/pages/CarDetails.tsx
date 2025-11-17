/* src/pages/CarDetails.tsx */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  MonitorPlay
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ColorPalette from "@/components/ColorPalette";
import TestDriveForm from "@/components/TestDriveForm";
import CarBookingForm from "@/components/CarBookingForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* image placeholders ─ replace with your own files when ready */
const videoThumb =
  "https://via.placeholder.com/1280x720/333333/ffffff?text=Video";

/* Hero image and background color mapping for each car model */
const getHeroConfig = (modelName: string) => {
  const modelPath = modelName.toLowerCase().replace(/\s+/g, '-');
  
  switch(modelPath) {
    case 'tata-altroz':
      return {
        image: "/src/assets/tata-altroz/Hero_section_altroz.avif",
        bgGradient: "from-orange-600 via-yellow-500 to-amber-400", // Matches Dune Glow theme
        primaryColor: "#E3B04B" // Dune Glow color
      };
    case 'tata-curvv':
      return {
        image: "/src/assets/tata-curvv/Hero_section_curvv.avif",
        bgGradient: "from-blue-900 via-blue-700 to-blue-500", // Modern blue theme
        primaryColor: "#1E3A8A" // Deep blue
      };
    case 'tata-harrier':
      return {
        image: "/src/assets/tata-harrier/Hero_section_harrier.avif",
        bgGradient: "from-orange-700 via-orange-600 to-yellow-500", // Orange premium theme
        primaryColor: "#FFA500" // Orange
      };
    case 'tata-nexon':
      return {
        image: "/src/assets/tata-nexon/Hero_section_nexon.avif",
        bgGradient: "from-gray-800 via-gray-600 to-gray-500", // Daytona grey theme
        primaryColor: "#696969" // Daytona Grey
      };
    case 'tata-punch':
      return {
        image: "/src/assets/tata-punch/Hero_section_punch.avif",
        bgGradient: "from-blue-600 via-blue-500 to-cyan-400", // Energetic blue theme
        primaryColor: "#1E3A8A" // Blue
      };
    case 'tata-tiago':
      return {
        image: "/src/assets/tata-tiago/Hero_section__tiago.avif",
        bgGradient: "from-blue-700 via-blue-600 to-blue-400", // Arizona blue theme
        primaryColor: "#1E90FF" // Arizona Blue
      };
    case 'tata-tigor':
      return {
        image: "/src/assets/tata-tigor/Hero_section_tigor.avif",
        bgGradient: "from-slate-700 via-slate-600 to-slate-400", // Elegant white/grey theme
        primaryColor: "#808080" // Grey
      };
    default:
      return {
        image: "https://via.placeholder.com/1920x1080/111111/ffffff?text=Hero+Image",
        bgGradient: "from-gray-900 via-gray-800 to-gray-700",
        primaryColor: "#666666"
      };
  }
};

/* Color options mapping for each car model */
const getColorOptions = (modelName: string) => {
  const modelPath = modelName.toLowerCase().replace(/\s+/g, '-');
  
  switch(modelPath) {
    case 'tata-altroz':
      return [
        { id: "dune-glow", name: "Dune Glow", value: "#E3B04B", image: "/src/assets/tata-altroz/Dune-Glow.webp" },
        { id: "dune-blue", name: "Dune Blue", value: "#5D8BF4", image: "/src/assets/tata-altroz/dune_blue.webp" },
        { id: "ember-glow", name: "Ember Glow", value: "#FF6B6B", image: "/src/assets/tata-altroz/ember_glow.webp" },
        { id: "pure-grey", name: "Pure Grey", value: "#A9A9A9", image: "/src/assets/tata-altroz/pure_grey.webp" },
        { id: "white", name: "White", value: "#FFFFFF", image: "/src/assets/tata-altroz/white.webp" }
      ];
    case 'tata-curvv':
      return [
        { id: "gold-essence", name: "Gold Essence", value: "#D4AF37", image: "/src/assets/tata-curvv/Gold_Essence.png" },
        { id: "blue", name: "Blue", value: "#1E3A8A", image: "/src/assets/tata-curvv/blue.webp" },
        { id: "crimson", name: "Crimson", value: "#DC2626", image: "/src/assets/tata-curvv/crimson.jpg" },
        { id: "flame-red", name: "Flame Red", value: "#FF2400", image: "/src/assets/tata-curvv/flame_red.webp" },
        { id: "grey", name: "Grey", value: "#808080", image: "/src/assets/tata-curvv/grey.webp" },
        { id: "white", name: "White", value: "#FFFFFF", image: "/src/assets/tata-curvv/white.jpg" }
      ];
    case 'tata-harrier':
      return [
        { id: "orange", name: "Orange", value: "#FFA500", image: "/src/assets/tata-harrier/orange.jpeg" },
        { id: "pure-grey", name: "Pure Grey", value: "#A9A9A9", image: "/src/assets/tata-harrier/pure-grey.webp" },
        { id: "yellow", name: "Yellow", value: "#FFD700", image: "/src/assets/tata-harrier/yellow.webp" }
      ];
    case 'tata-nexon':
      return [
        { id: "daytona-grey", name: "Daytona Grey", value: "#696969", image: "/src/assets/tata-nexon/Daytona_grey.webp" },
        { id: "blue", name: "Blue", value: "#1E3A8A", image: "/src/assets/tata-nexon/blue.jpg" },
        { id: "green", name: "Green", value: "#228B22", image: "/src/assets/tata-nexon/green.webp" },
        { id: "pure-grey", name: "Pure Grey", value: "#A9A9A9", image: "/src/assets/tata-nexon/pure_grey.webp" },
        { id: "white", name: "White", value: "#FFFFFF", image: "/src/assets/tata-nexon/white.webp" }
      ];
    case 'tata-punch':
      return [
        { id: "black", name: "Black", value: "#000000", image: "/src/assets/tata-punch/black.jpg" },
        { id: "blue", name: "Blue", value: "#1E3A8A", image: "/src/assets/tata-punch/blue.jpg" },
        { id: "orange", name: "Orange", value: "#FFA500", image: "/src/assets/tata-punch/orange.jpg" },
        { id: "red", name: "Red", value: "#DC2626", image: "/src/assets/tata-punch/red.webp" },
        { id: "white", name: "White", value: "#FFFFFF", image: "/src/assets/tata-punch/white.webp" }
      ];
    case 'tata-tiago':
      return [
        { id: "arizona-blue", name: "Arizona Blue", value: "#1E90FF", image: "/src/assets/tata-tiago/Arizona_Blue.jpg" },
        { id: "copper", name: "Copper", value: "#B87333", image: "/src/assets/tata-tiago/copper.webp" },
        { id: "grey", name: "Grey", value: "#808080", image: "/src/assets/tata-tiago/grey.webp" },
        { id: "ocean-blue", name: "Ocean Blue", value: "#000080", image: "/src/assets/tata-tiago/ocean_blue.jpg" },
        { id: "tornado-blue", name: "Tornado Blue", value: "#1E3A8A", image: "/src/assets/tata-tiago/tornado_blue.jpg" },
        { id: "white", name: "White", value: "#FFFFFF", image: "/src/assets/tata-tiago/white.png" }
      ];
    case 'tata-tigor':
      return [
        { id: "white", name: "White", value: "#FFFFFF", image: "/src/assets/tata-tigor/White.webp" },
        { id: "blue", name: "Blue", value: "#1E3A8A", image: "/src/assets/tata-tigor/blue.jpg" },
        { id: "bronze", name: "Bronze", value: "#CD7F32", image: "/src/assets/tata-tigor/bronze.jpg" },
        { id: "copper", name: "Copper", value: "#B87333", image: "/src/assets/tata-tigor/copper.jpg" },
        { id: "grey", name: "Grey", value: "#808080", image: "/src/assets/tata-tigor/grey.webp" }
      ];
    default:
      return [
        { id: "midnight-black", name: "Midnight Black", value: "#1a1a1a", image: "https://via.placeholder.com/1400x600/1a1a1a/ffffff?text=Midnight+Black+Car" },
        { id: "pearl-white", name: "Pearl White", value: "#f8f8ff", image: "https://via.placeholder.com/1400x600/f8f8ff/000000?text=Pearl+White+Car" },
        { id: "silver-metallic", name: "Silver Metallic", value: "#c0c0c0", image: "https://via.placeholder.com/1400x600/c0c0c0/000000?text=Silver+Metallic+Car" }
      ];
  }
};

/* Feature slides mapping for each car model */
const getFeatureSlides = (modelName: string) => {
  const modelPath = modelName.toLowerCase().replace(/\s+/g, '-');
  const carName = modelPath.split('-')[1]; // Extract car name (e.g., 'altroz' from 'tata-altroz')
  
  return [
    {
      title: "LED Headlamps",
      desc: "Crisp, clear lighting for safer drives.",
      img: carName === 'altroz' 
        ? `/src/assets/${modelPath}/led-headlamps-${carName}.webp`
        : `/src/assets/${modelPath}/led-headlamps-${carName}.avif`
    },
    {
      title: "Premium Interiors",
      desc: "Luxurious comfort for every journey.",
      img: `/src/assets/${modelPath}/interior-${carName}.avif`
    },
    {
      title: "Advanced Infotainment",
      desc: "Stay connected and entertained on the go.",
      img: `/src/assets/${modelPath}/infotainment-${carName}.avif`
    },
    {
      title: "Safety Features",
      desc: "Protecting you and your loved ones.",
      img: `/src/assets/${modelPath}/safety-${carName}.avif`
    },
    {
      title: "Performance",
      desc: "Unleash the power within.",
      img: `/src/assets/${modelPath}/performance-${carName}.avif`
    }
  ];
};

/* YouTube video links for each car model */
const getVideoUrl = (modelName: string) => {
  const modelPath = modelName.toLowerCase().replace(/\s+/g, '-');
  const carName = modelPath.split('-')[1]; // Extract car name (e.g., 'altroz' from 'tata-altroz')
  
  switch(carName) {
    case 'curvv':
      return 'https://youtu.be/2iMLqAyZoiE?list=TLGG-J7u4KYcGfExNjExMjAyNQ';
    case 'tiago':
      return 'https://youtu.be/LnKlC_7-wmo?list=TLGG7K4Oi0hSN_4xNjExMjAyNQ';
    case 'tigor':
      return 'https://youtu.be/MeHysdNnI1E?list=TLGGMdFmG69pPT4xNjExMjAyNQ';
    case 'punch':
      return 'https://youtu.be/2Pi3iJ7uZ-s?list=TLGGXSPIOfw2D44xNjExMjAyNQ';
    case 'nexon':
      return 'https://youtu.be/ix3yijzMmKA?list=TLGGjBH6FbZ11isxNjExMjAyNQ';
    case 'harrier':
      return 'https://youtu.be/FYOzVWrwLoE?list=TLGGod7oVDjF0QQxNjExMjAyNQ';
    case 'altroz':
      return 'https://youtu.be/MIlQe8WmdrE';
    default:
      return 'https://youtube.com'; // Fallback
  }
};

const CarDetails = () => {
  const { state: vehicle } = useLocation() as { state: any };
  const navigate = useNavigate();
  const [featIdx, setFeatIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(getColorOptions(vehicle.name)[0].id);

  const getCurrentCarImage = () => {
    const selectedColorData = getColorOptions(vehicle.name).find(color => color.id === selectedColor);
    return selectedColorData?.image || getColorOptions(vehicle.name)[0].image;
  };

  const heroConfig = getHeroConfig(vehicle.name);
  const featureSlides = getFeatureSlides(vehicle.name);
  const videoUrl = getVideoUrl(vehicle.name);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Vehicle not found.
      </div>
    );
  }

  const next = () => setFeatIdx((i) => (i + 1) % featureSlides.length);
  const prev = () => setFeatIdx((i) => (i - 1 + featureSlides.length) % featureSlides.length);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* hero */}
      <section className="relative h-[85vh] overflow-hidden">
        {/* Split Background */}
        <div className="absolute inset-0 flex">
          {/* Left half - White */}
          <div className="w-1/2 bg-white"></div>
          {/* Right half - Car Color */}
          <div 
            className="w-1/2" 
            style={{ backgroundColor: heroConfig.primaryColor }}
          ></div>
        </div>
        
        {/* Centered Car Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={heroConfig.image} 
            className="h-full max-w-none object-contain z-10" 
            alt={vehicle.name}
          />
        </div>

        <div className="relative z-20 h-full flex flex-col">
          <div className="flex items-center justify-between px-6 pt-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="text-black hover:bg-black/10">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>

          <div className="flex-1 flex items-end pb-12">
            <div className="container mx-auto px-6">
              <div className="max-w-md">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-black">{vehicle.name}</h1>
                <h2 className="text-xl font-semibold mb-4 text-black">Reclaim Your Life</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  The new {vehicle.name.split(" ")[1]} epitomizes premium luxury with its opulent
                  interiors, plush upholstery and advanced infotainment system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* car image + color palette + CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          {/* Car Image */}
          <div className="text-center mb-8">
            <img 
              src={getCurrentCarImage()} 
              className="w-full max-w-5xl mx-auto transition-all duration-500 ease-in-out" 
              alt={`${vehicle.name} in ${getColorOptions(vehicle.name).find(c => c.id === selectedColor)?.name}`}
            />
          </div>
          
          {/* Color Palette */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">Choose Your Color</h3>
              <div className="flex justify-center lg:justify-start">
                <ColorPalette 
                  colors={getColorOptions(vehicle.name)}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </div>
            </div>
            
            {/* Environment Toggle (Studio/Outdoor) */}
            <div className="flex items-center space-x-4 justify-center lg:justify-end">
              <span className="text-sm text-gray-400 uppercase tracking-wider">Studio</span>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded-full bg-gray-600 border border-gray-500 hover:border-gray-400 transition-colors" />
                <span className="text-sm text-gray-400">Outdoor</span>
                <button className="w-8 h-8 rounded-full bg-white border-2 border-white" />
              </div>
              <span className="text-sm text-white font-medium">Night</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CarBookingForm 
              vehicleName={vehicle.name}
              vehiclePrice={vehicle.price}
              availableColors={getColorOptions(vehicle.name)}
            >
              <Button size="lg" className="bg-white text-black px-10 text-lg hover:bg-gray-200">
                Book Now
              </Button>
            </CarBookingForm>
            <TestDriveForm>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white px-10 text-lg hover:bg-white hover:text-black"
              >
                Book a Test Drive
              </Button>
            </TestDriveForm>
          </div>
        </div>
      </section>

      {/* video */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Experience {vehicle.name.split(" ")[1]}</h2>
          <p className="text-xl text-gray-400 mb-12">
            Luxury meets performance in every frame.
          </p>

          <div 
            className="relative group max-w-6xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => window.open(videoUrl, '_blank')}
          >
            <img src={videoThumb} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <Play className="w-9 h-9 ml-1 text-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* overview + price */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-14">
          <div>
            <Badge className="mb-4">{vehicle.bodyType}</Badge>
            <h3 className="text-4xl font-bold mb-6">Overview</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              With its bold design, lively performance and cutting-edge tech, the{" "}
              {vehicle.name.split(" ")[1]} is built for those who want more from every drive.
            </p>
            <CarBookingForm 
              vehicleName={vehicle.name}
              vehiclePrice={vehicle.price}
              availableColors={getColorOptions(vehicle.name)}
            >
              <Button className="bg-white text-black px-8 py-4 text-lg mr-4 mb-4">Book Now</Button>
            </CarBookingForm>
            <TestDriveForm>
              <Button
                variant="outline"
                className="border-white text-white px-8 py-4 text-lg hover:bg-white hover:text-black mb-4"
              >
                Schedule a Test Drive →
              </Button>
            </TestDriveForm>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 space-y-6">
            <h4 className="text-2xl font-semibold">Showroom price (Mumbai)</h4>
            <p className="text-3xl font-bold">
              ₹{vehicle.price.toLocaleString("en-IN")}
              <span className="text-base font-normal text-gray-400">*</span>
            </p>
            <p className="text-gray-400 text-sm">
              Ex-showroom price. Contact your nearest dealer for exact figures.
            </p>
            <Button
              variant="outline"
              className="border-white text-white w-full hover:bg-white hover:text-black"
            >
              Get Loan Offers
            </Button>
          </div>
        </div>
      </section>

      {/* feature slider */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl lg:text-5xl font-bold">{featureSlides[featIdx].title}</h3>
              <p className="text-lg text-gray-400 max-w-lg">{featureSlides[featIdx].desc}</p>
            </div>

            <div className="relative">
              <div className="bg-gray-800 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <img
                  src={featureSlides[featIdx].img}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between mt-6">
                <button onClick={prev} className="ctrl-btn">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-lg">
                  {featIdx + 1}/{featureSlides.length}
                </span>
                <button onClick={next} className="ctrl-btn">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* safety */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <ShieldCheck className="w-12 h-12 text-primary" />
            <h3 className="text-4xl font-bold">Absolute Safety</h3>
            <p className="text-lg text-gray-300">
              High-strength steel absorbs impact energy and shields occupants.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/800x600/222222/ffffff?text=Safety"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* performance */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://via.placeholder.com/800x600/333333/ffffff?text=Engine"
            className="w-full rounded-2xl object-cover"
          />
          <div className="space-y-6">
            <Zap className="w-12 h-12 text-primary" />
            <h3 className="text-4xl font-bold">Dynamic Performance</h3>
            <p className="text-lg text-gray-400">
              The 1.2&nbsp;L Revotron engine delivers 86&nbsp;PS of max power for an exhilarating
              drive.
            </p>
          </div>
        </div>
      </section>

      {/* technology */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <MonitorPlay className="w-12 h-12 text-primary" />
            <h3 className="text-4xl font-bold">Next-Gen Technology</h3>
            <p className="text-lg text-gray-300">
              Largest-in-segment 26&nbsp;cm floating touchscreen with wireless Apple CarPlay™ &
              Android Auto™.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/800x600/444444/ffffff?text=Infotainment"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CarDetails;

/* helper style for arrow buttons (Tailwind) */
