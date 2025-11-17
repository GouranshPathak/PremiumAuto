// src/pages/Inventory.tsx
import { useState } from "react";
import { Search, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Import actual Tata car images
import altrozImage from "@/assets/tata-altroz/Dune-Glow.webp";
import curvvImage from "@/assets/tata-curvv/white.jpg";
import tiagoImage from "@/assets/tata-tiago/Arizona_Blue.jpg";
import tigorImage from "@/assets/tata-tigor/copper.jpg";
import punchImage from "@/assets/tata-punch/black.jpg";
import nexonImage from "@/assets/tata-nexon/Daytona_grey.webp";
import harrierImage from "@/assets/tata-harrier/orange.jpeg";

const Inventory = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [bodyTypeFilter, setBodyTypeFilter] = useState("all");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();

  /* ─────────────────────────────────────────────
   *  Single-variant list of Tata vehicles
   * ───────────────────────────────────────────── */
  const vehicles = [
    {
      id: "altroz",
      name: "Tata Altroz",
      price: 6.60,
      year: 2024,
      mileage: "19.3 kmpl",
      fuelType: "Petrol",
      transmission: "Manual",
      image: altrozImage,
      bodyType: "Hatchback",
      description: "Premium hatchback with best-in-class features"
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
      bodyType: "SUV",
      description: "India's first SUV-coupe with cutting-edge design"
    },
    {
      id: "tiago",
      name: "Tata Tiago",
      price: 5.65,
      year: 2024,
      mileage: "20.1 kmpl",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: tiagoImage,
      bodyType: "Hatchback",
      description: "Stylish and efficient compact hatchback"
    },
    {
      id: "tigor",
      name: "Tata Tigor",
      price: 6.20,
      year: 2024,
      mileage: "19.2 kmpl",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: tigorImage,
      bodyType: "Sedan",
      description: "Spacious compact sedan with modern features"
    },
    {
      id: "punch",
      name: "Tata Punch",
      price: 6.13,
      year: 2024,
      mileage: "18.8 kmpl",
      fuelType: "Petrol",
      transmission: "Manual",
      image: punchImage,
      bodyType: "Hatchback",
      description: "Micro-SUV with SUV stance and city convenience"
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
      bodyType: "SUV",
      description: "5-star safety-rated compact SUV"
    },
    {
      id: "harrier",
      name: "Tata Harrier",
      price: 15.50,
      year: 2024,
      mileage: "16.5 kmpl",
      fuelType: "Diesel",
      transmission: "Automatic",
      image: harrierImage,
      bodyType: "SUV",
      description: "Flagship SUV with premium luxury and performance"
    }
  ];

  /* ─────────────────────────────────────────────
   *  Filters + sorting
   * ───────────────────────────────────────────── */
  const filteredVehicles = vehicles
    .filter((v) => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBody = bodyTypeFilter === "all" || v.bodyType.toLowerCase() === bodyTypeFilter;
      const matchesFuel = fuelTypeFilter === "all" || v.fuelType.toLowerCase() === fuelTypeFilter;
      return matchesSearch && matchesBody && matchesFuel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "year-new":
          return b.year - a.year;
        case "year-old":
          return a.year - b.year;
        default:
          return a.name.localeCompare(b.name);
      }
    });


  /* ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ─────────────────────────────── */}
      <section className="pt-32 pb-24 hero-gradient text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Tata Vehicle <span className="text-gradient">Inventory</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover our extensive collection of premium Tata vehicles
          </p>
        </div>
      </section>

      {/* ── Filters ───────────────────────────── */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search Tata vehicles…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex gap-4 items-center">
              {/* Body Type */}
              <Select value={bodyTypeFilter} onValueChange={setBodyTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Body Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>

              {/* Fuel */}
              <Select value={fuelTypeFilter} onValueChange={setFuelTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fuels</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="year-new">Year: Newest First</SelectItem>
                  <SelectItem value="year-old">Year: Oldest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ───────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-muted-foreground">
            Showing {filteredVehicles.length} Tata vehicle models
          </p>

          {/* Cards */}
          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {filteredVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>

          {/* Empty state */}
          {filteredVehicles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">
                No Tata vehicles found matching your criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setBodyTypeFilter("all");
                  setFuelTypeFilter("all");
                  setSortBy("name");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Inventory;
