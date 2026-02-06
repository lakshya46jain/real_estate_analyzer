import { MapPin, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  onClick?: () => void;
}

const PropertyCard = ({
  image,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  onClick,
}: PropertyCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group card-soft-hover cursor-pointer overflow-hidden p-0"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
            {price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3 className="heading-card text-foreground mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Features */}
        {(beds || baths || sqft) && (
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            {beds && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Bed className="w-4 h-4" />
                <span className="text-sm">{beds}</span>
              </div>
            )}
            {baths && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Bath className="w-4 h-4" />
                <span className="text-sm">{baths}</span>
              </div>
            )}
            {sqft && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Square className="w-4 h-4" />
                <span className="text-sm">{sqft.toLocaleString()} ft²</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
