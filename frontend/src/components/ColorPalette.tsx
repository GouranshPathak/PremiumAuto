import { cn } from "@/lib/utils";

interface ColorOption {
  id: string;
  name: string;
  value: string;
  image: string;
}

interface ColorPaletteProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (colorId: string) => void;
  className?: string;
}

const ColorPalette = ({ colors, selectedColor, onColorChange, className }: ColorPaletteProps) => {
  const selectedColorData = colors.find(color => color.id === selectedColor);

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      {/* Color Name Display */}
      <div className="text-lg font-semibold text-white uppercase tracking-wider">
        {selectedColorData?.name || "Select Color"}
      </div>
      
      {/* Color Palette */}
      <div className="flex items-center space-x-3">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onColorChange(color.id)}
            className={cn(
              "relative w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black",
              selectedColor === color.id
                ? "border-white shadow-lg scale-110 ring-2 ring-white ring-offset-2 ring-offset-black"
                : "border-gray-500 hover:border-gray-300"
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          >
            {/* Inner ring for selected state */}
            {selectedColor === color.id && (
              <div className="absolute inset-2 rounded-full border border-gray-800 opacity-30" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
