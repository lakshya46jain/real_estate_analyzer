import { useState, useRef } from "react";
import CityScape from "./components/CityScape";
import Form from "./components/Form";
import Map from "./components/Map";
import LocationSearchBar from "./components/LocationSearchBar";
import Output from "./components/Output";
import { LoadScript } from "@react-google-maps/api";
import axios from "axios";

function PropertyDetailsPage() {
  // Coordinates of Virginia Tech
  const [mapCenter, setMapCenter] = useState({
    lat: 37.2284,
    lng: -80.4234,
  });

  const [bedroomValue, setBedroomValue] = useState("");
  const [bathroomValue, setBathroomValue] = useState("");
  const [acreLotValue, setAcreLotValue] = useState("");
  const [houseSizeValue, setHouseSizeValue] = useState("");

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const [cityValue, setCity] = useState<string>("");
  const [stateValue, setState] = useState<string>("");
  const [zipCodeValue, setZipCode] = useState<string>("");

  const handlePlacesChanged = () => {
    const searchBox = searchBoxRef.current;
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const latitude = place.geometry?.location?.lat();
        const longitude = place.geometry?.location?.lng();

        let city = "";
        let state = "";
        let zipCode = "";

        // Check if address_components is defined
        if (place.address_components) {
          place.address_components.forEach((component) => {
            const types = component.types;
            if (types.includes("locality")) {
              city = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
              state = component.long_name;
            }
            if (types.includes("postal_code")) {
              zipCode = component.long_name;
            }
          });
        }

        setCity(city);
        setState(state);
        setZipCode(zipCode);

        if (latitude && longitude) {
          setMapCenter({
            lat: latitude,
            lng: longitude,
          });
        }
      }
    }
  };

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div
        style={{
          display: "flex", // Enable flexbox
          flexDirection: "column", // Stack children vertically
          height: "100vh", // Full height of the viewport
          margin: "0", // Remove default margin
          boxSizing: "border-box", // Ensure consistent sizing
        }}
      >
        {/* Navigation Bar */}
        <div
          style={{
            maxWidth: "100vw",
            height: "60px", // Fixed height
            backgroundColor: "#1E1B18",
            borderRadius: "40px",
            margin: "3.5px",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              paddingTop: "20px",
              fontSize: "30px",
              lineHeight: "1",
              fontWeight: "bolder", // Extra bold text
              fontFamily: "'League Spartan', sans-serif",
              padding: "17px 10px 10px 25px",
            }}
          >
            Real Estate Analyzer
          </h1>
        </div>

        {/* Body */}

        <div
          style={{
            maxWidth: "100vw",
            flex: 1,
            borderColor: "#0B2564",
            borderWidth: "3px",
            borderStyle: "solid",
            background: "#FFFFFF",
            borderRadius: "40px 40px 0px 0px",
            margin: "3.5px 3.5px 0px 3.5px",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "400px",
          }}
        >
          <h1
            style={{
              color: "#1E1E1E",
              textAlign: "center", // Center the text
              paddingTop: "20px",
              margin: "0", // Remove default margin
              fontSize: "calc(3vw + 22px)",
              lineHeight: "1",
              fontWeight: "bolder", // Extra bold text
              fontFamily: "'League Spartan', sans-serif",
              padding: "50px 0px 25px 0px",
            }}
          >
            <div>
              <span>Enter the following </span>
              <span
                style={{
                  color: "#DE6C83", // Separate color for "at the right price"
                  fontWeight: "bolder", // Extra bold text for this part
                }}
              >
                details:
              </span>
            </div>
          </h1>
          <div
            className="container text-center"
            style={{ margin: "25px 0px 25px 0px" }}
          >
            <div className="row">
              <div className="col">
                <Form
                  bedroomValue={bedroomValue}
                  onChangeBedroom={(event) => {
                    setBedroomValue(event.target.value);
                  }}
                  bathroomValue={bathroomValue}
                  onChangeBathroom={(event) => {
                    setBathroomValue(event.target.value);
                  }}
                  acreLotValue={acreLotValue}
                  onChangeAcreLot={(event) => {
                    setAcreLotValue(event.target.value);
                  }}
                  houseSizeValue={houseSizeValue}
                  onChangeHouseSize={(event) => {
                    setHouseSizeValue(event.target.value);
                  }}
                />
                <LocationSearchBar
                  onLoad={(ref) => (searchBoxRef.current = ref)}
                  onPlacesChanged={handlePlacesChanged}
                />
                <Output
                  buttonClick={async () => {
                    try {
                      const response = await axios.post(
                        "http://localhost:3000/api/analyzer-log",
                        {
                          bed: Number(bedroomValue),
                          bath: Number(bathroomValue),
                          acre_lot: parseFloat(acreLotValue),
                          house_size: parseFloat(houseSizeValue),
                          city: cityValue,
                          state: stateValue,
                          zip_code: zipCodeValue,
                          predicted_price: 0,
                        }
                      );
                      console.log("Analyzer data log added:", response.data); // Log the response
                      alert("Analyzer data log added");
                    } catch (error) {
                      console.log("Error adding analyzer log:", error);
                    }
                  }}
                />
              </div>
              <div className="col">
                {/* Google Maps Display */}
                <Map center={mapCenter} zoom={17} />
              </div>
            </div>
          </div>
          <CityScape />
        </div>
      </div>
    </LoadScript>
  );
}

export default PropertyDetailsPage;
