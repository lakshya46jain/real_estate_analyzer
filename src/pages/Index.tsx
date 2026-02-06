import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import QuickAnalyzer from "@/components/QuickAnalyzer";
import Footer from "@/components/Footer";

import heroImage from "@/assets/hero-home.jpg";
import featuredProperty from "@/assets/featured-property.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const properties = [
  {
    id: 1,
    image: property1,
    title: "Coastal Modern Retreat",
    location: "Malibu, CA",
    price: "$2,450,000",
    beds: 4,
    baths: 3,
    sqft: 3200,
  },
  {
    id: 2,
    image: property2,
    title: "Mountain Lodge Estate",
    location: "Aspen, CO",
    price: "$3,100,000",
    beds: 5,
    baths: 4,
    sqft: 4500,
  },
  {
    id: 3,
    image: property3,
    title: "Historic Brownstone",
    location: "Brooklyn, NY",
    price: "$1,850,000",
    beds: 3,
    baths: 2,
    sqft: 2100,
  },
  {
    id: 4,
    image: property4,
    title: "Country Farmhouse",
    location: "Nashville, TN",
    price: "$890,000",
    beds: 4,
    baths: 3,
    sqft: 2800,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern home exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container-calm pt-24">
          <div className="max-w-2xl">
            <h1 className="heading-hero text-foreground mb-6 animate-fade-up">
              Find your home's <span className="text-primary">true value</span>
            </h1>
            <p
              className="body-large mb-8 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Discover intelligent property analysis with beautiful simplicity.
              No clutter, no overwhelm—just clarity.
            </p>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <SearchBar
                placeholder="Enter address or zip code..."
                onSearch={(query) => console.log("Search:", query)}
              />
            </div>
            <div
              className="flex items-center gap-6 mt-8 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/analyzer" className="btn-primary">
                Analyze Property
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/properties" className="btn-ghost">
                View Listings
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Quick Analyzer Strip */}
      <section className="section-spacing bg-muted">
        <div className="container-calm">
          <div className="text-center mb-10">
            <h2 className="heading-section text-foreground mb-4">
              Quick Estimate
            </h2>
            <p className="body-large max-w-2xl mx-auto">
              Get an instant price prediction in seconds
            </p>
          </div>
          <QuickAnalyzer />
        </div>
      </section>

      {/* Popular Properties */}
      <section className="section-spacing">
        <div className="container-calm">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="heading-section text-foreground mb-2">
                Popular Properties
              </h2>
              <p className="text-muted-foreground">
                Explore trending listings in top markets
              </p>
            </div>
            <Link
              to="/properties"
              className="btn-ghost hidden md:flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/properties" className="btn-secondary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Property */}
      <section className="section-spacing bg-muted">
        <div className="container-calm">
          <div className="relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[600px]">
            <img
              src={featuredProperty}
              alt="Featured property interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-full mb-4">
                Featured
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-card mb-3">
                Penthouse with Panoramic Views
              </h3>
              <p className="text-card/80 mb-6 max-w-xl">
                Experience luxury living at its finest with floor-to-ceiling
                windows and world-class amenities in the heart of the city.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-serif text-card">
                  $4,200,000
                </span>
                <Link to="/analyzer" className="btn-primary">
                  Get Analysis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing">
        <div className="container-calm">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="heading-section text-foreground mb-6">
                Intelligent analysis, <br />
                beautiful simplicity
              </h2>
              <p className="body-large mb-6">
                Real Estate Analyzer combines advanced machine learning with an
                intuitive interface to give you accurate property valuations
                without the noise.
              </p>
              <div className="space-y-4">
                {[
                  "ML-powered price predictions",
                  "Real-time market comparisons",
                  "Clean, distraction-free experience",
                  "Trusted by thousands of homeowners",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/analyzer" className="btn-primary">
                  Try the Analyzer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-soft p-6 text-center">
                <div className="text-4xl font-serif text-primary mb-2">98%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="card-soft p-6 text-center">
                <div className="text-4xl font-serif text-primary mb-2">
                  50K+
                </div>
                <p className="text-sm text-muted-foreground">
                  Properties Analyzed
                </p>
              </div>
              <div className="card-soft p-6 text-center">
                <div className="text-4xl font-serif text-primary mb-2">
                  2.5s
                </div>
                <p className="text-sm text-muted-foreground">
                  Average Response
                </p>
              </div>
              <div className="card-soft p-6 text-center">
                <div className="text-4xl font-serif text-primary mb-2">
                  4.9★
                </div>
                <p className="text-sm text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
