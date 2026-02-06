import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Bed,
  Bath,
  Square,
  TreePine,
  MapPin,
  TrendingUp,
  Home,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";
import PropertyCard from "@/components/PropertyCard";

import axios from "axios";
import {
  LoadScript,
  StandaloneSearchBox,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { toast } from "sonner";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

interface FormData {
  beds: number;
  baths: number;
  sqft: number;
  lot: number;
  city: string;
  state: string;
  zip: string;
}

interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  priceRange: { low: number; high: number };
}

const comparables = [
  {
    id: 1,
    image: property1,
    title: "Similar Home 1",
    location: "Same Neighborhood",
    price: "$725,000",
    beds: 3,
    baths: 2,
    sqft: 1750,
  },
  {
    id: 2,
    image: property2,
    title: "Similar Home 2",
    location: "Nearby Area",
    price: "$768,000",
    beds: 3,
    baths: 2,
    sqft: 1900,
  },
  {
    id: 3,
    image: property3,
    title: "Similar Home 3",
    location: "Same District",
    price: "$695,000",
    beds: 3,
    baths: 2,
    sqft: 1650,
  },
];

const Analyzer = () => {
  const location = useLocation();
  const initialData = location.state as Partial<FormData> | null;

  const GOOGLE_MAPS_API_KEY = import.meta.env
    .VITE_GOOGLE_MAPS_API_KEY as string;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 37.2284,
    lng: -80.4234,
  });

  const [formData, setFormData] = useState<FormData>({
    beds: initialData?.beds || 3,
    baths: initialData?.baths || 2,
    sqft: initialData?.sqft || 1800,
    lot: initialData?.lot || 0.25,
    city: "",
    state: "",
    zip: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [displayPrice, setDisplayPrice] = useState(0);

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlacesChanged = () => {
    const sb = searchBoxRef.current;
    if (!sb) return;

    const places = sb.getPlaces();
    if (!places || places.length === 0) return;

    const place = places[0];
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();

    let city = "";
    let state = "";
    let zip = "";

    place.address_components?.forEach((c) => {
      if (c.types.includes("locality")) city = c.long_name;
      if (c.types.includes("administrative_area_level_1")) state = c.long_name;
      if (c.types.includes("postal_code")) zip = c.long_name;
    });

    setFormData((prev) => ({ ...prev, city, state, zip }));

    if (typeof lat === "number" && typeof lng === "number") {
      setMapCenter({ lat, lng });
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // --- (A) Mock prediction (keep for now, replace with Azure later) ---
      const basePrice =
        formData.sqft * 350 + formData.beds * 25000 + formData.baths * 15000;
      const variation = basePrice * 0.1;

      const prediction: PredictionResult = {
        predictedPrice: Math.round(basePrice),
        confidence: 94,
        priceRange: {
          low: Math.round(basePrice - variation),
          high: Math.round(basePrice + variation),
        },
      };

      setResult(prediction);

      // --- (B) Log to Postgres via your existing backend ---
      await axios.post(`${API_BASE_URL}/api/analyzer-log`, {
        bed: Number(formData.beds),
        bath: Number(formData.baths),
        acre_lot: Number(formData.lot),
        house_size: Number(formData.sqft),
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip,
        predicted_price: prediction.predictedPrice,
      });

      toast.success("Prediction logged");
    } catch (err) {
      console.error("Predict/log error:", err);
      toast.error("Prediction/logging failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animate price counting up
  useEffect(() => {
    if (result?.predictedPrice) {
      const duration = 1500;
      const steps = 60;
      const increment = result.predictedPrice / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(increment * step, result.predictedPrice);
        setDisplayPrice(Math.round(current));

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [result?.predictedPrice]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container-calm">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="heading-hero text-foreground mb-4">
                Property Analyzer
              </h1>
              <p className="body-large max-w-2xl mx-auto">
                Enter your property details for an instant ML-powered valuation
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="card-soft sticky top-24">
                  <h2 className="heading-card text-foreground mb-6">
                    Property Details
                  </h2>

                  <div className="space-y-5">
                    {/* Beds & Baths */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                          <Bed className="w-4 h-4" />
                          Bedrooms
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleChange(
                                "beds",
                                Math.max(1, formData.beds - 1),
                              )
                            }
                            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-medium text-foreground">
                            {formData.beds}
                          </span>
                          <button
                            onClick={() =>
                              handleChange("beds", formData.beds + 1)
                            }
                            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                          <Bath className="w-4 h-4" />
                          Bathrooms
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleChange(
                                "baths",
                                Math.max(1, formData.baths - 1),
                              )
                            }
                            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-medium text-foreground">
                            {formData.baths}
                          </span>
                          <button
                            onClick={() =>
                              handleChange("baths", formData.baths + 1)
                            }
                            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Square Footage */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <Square className="w-4 h-4" />
                        Square Footage
                      </label>
                      <input
                        type="number"
                        value={formData.sqft}
                        onChange={(e) =>
                          handleChange("sqft", parseInt(e.target.value) || 0)
                        }
                        className="input-calm"
                        placeholder="e.g., 1800"
                      />
                    </div>

                    {/* Lot Size */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <TreePine className="w-4 h-4" />
                        Lot Size (acres)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.lot}
                        onChange={(e) =>
                          handleChange("lot", parseFloat(e.target.value) || 0)
                        }
                        className="input-calm"
                        placeholder="e.g., 0.25"
                      />
                    </div>

                    {/* Location (Google Places) */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </label>

                      <StandaloneSearchBox
                        onLoad={(ref) => (searchBoxRef.current = ref)}
                        onPlacesChanged={handlePlacesChanged}
                      >
                        <input
                          type="text"
                          className="input-calm"
                          placeholder="Enter a city / address / zip..."
                        />
                      </StandaloneSearchBox>

                      <p className="text-xs text-muted-foreground mt-2">
                        Selected: {formData.city || "—"},{" "}
                        {formData.state || "—"} {formData.zip || ""}
                      </p>
                    </div>

                    <button
                      onClick={handlePredict}
                      disabled={isLoading}
                      className="btn-primary w-full mt-6"
                    >
                      {isLoading ? (
                        <Spinner size="sm" className="mr-2" />
                      ) : (
                        <TrendingUp className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? "Analyzing..." : "Predict Price"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-3">
                <div className="card-soft p-4 mb-6">
                  <div className="h-[320px] w-full rounded-2xl overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      center={mapCenter}
                      zoom={15}
                      options={{
                        fullscreenControl: false,
                        mapTypeControl: false,
                        zoomControl: true,
                        streetViewControl: false,
                      }}
                    >
                      <Marker position={mapCenter} />
                    </GoogleMap>
                  </div>
                </div>

                {!result && !isLoading && (
                  <div className="card-soft text-center py-16">
                    <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="heading-card text-foreground mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-muted-foreground">
                      Fill in the property details and click Predict to get your
                      valuation
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="card-soft text-center py-16">
                    <Spinner size="lg" className="mx-auto mb-6" />
                    <h3 className="heading-card text-foreground mb-2">
                      Analyzing Property
                    </h3>
                    <p className="text-muted-foreground">
                      Running ML models on market data...
                    </p>
                  </div>
                )}

                {result && !isLoading && (
                  <div className="space-y-6 animate-fade-up">
                    {/* Main Price Card */}
                    <div className="card-soft text-center py-10">
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Estimated Value
                      </span>
                      <div className="mt-2 mb-4">
                        <span className="text-5xl md:text-6xl font-serif text-primary animate-count-up">
                          {formatPrice(displayPrice)}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span>
                          Range: {formatPrice(result.priceRange.low)} -{" "}
                          {formatPrice(result.priceRange.high)}
                        </span>
                        <span className="w-px h-4 bg-border" />
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {result.confidence}% confidence
                        </span>
                      </div>
                    </div>

                    {/* Details Cards */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="card-soft p-5 text-center">
                        <div className="text-2xl font-serif text-foreground mb-1">
                          ${Math.round(result.predictedPrice / formData.sqft)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Per Sq Ft
                        </p>
                      </div>
                      <div className="card-soft p-5 text-center">
                        <div className="text-2xl font-serif text-foreground mb-1">
                          {result.confidence}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Confidence
                        </p>
                      </div>
                      <div className="card-soft p-5 text-center">
                        <div className="text-2xl font-serif text-foreground mb-1">
                          +3.2%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          YoY Change
                        </p>
                      </div>
                    </div>

                    {/* Comparable Homes */}
                    <div>
                      <h3 className="heading-card text-foreground mb-4">
                        Comparable Properties
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {comparables.map((property) => (
                          <PropertyCard key={property.id} {...property} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </LoadScript>
  );
};

export default Analyzer;
