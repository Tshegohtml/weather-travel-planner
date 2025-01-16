import React, { useState, useEffect, Key } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  
} from "@react-google-maps/api";
import Swal from "sweetalert2";

interface Place {
  formatted_address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photos: any;
  place_id: Key | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
}

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API; 

interface MapProps {
  city: string;
  coords: {
    lat: number;
    lon: number;
  };

  activityType: string;
  setPlacesToVisit: React.Dispatch<React.SetStateAction<Place[]>>;
}

const Map: React.FC<MapProps> = ({
  activityType,
  coords,
  setPlacesToVisit,
}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Fetch places on component mount
  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      setLoading(true);

      Swal.fire({
        title: "Loading places...",
        text: "Please wait while we fetch nearby places.",
        icon: "info",
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await axios.post("https://weather-backend-cm86.onrender.com/api/places", {
          lat: coords?.lat,
          lon: coords?.lon,

          // Get places based on weather
          query: "tourist+attractions+" + { activityType },
        });

        if (response?.data?.places) {
          setPlaces(response.data.places);
        } else {
          throw new Error("No places found.");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error fetching the places. Please try again later.",
          icon: "error",
        });
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    fetchNearbyPlaces();
  }, [activityType, coords]);

  const handleAddLocation = () => {
    if (selectedPlace) {
      const newPlace: Place = {
        name: selectedPlace.name,
        address: selectedPlace.formatted_address,
        imageUrl: selectedPlace.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${selectedPlace.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
          : "",
        description: "A wonderful place to visit!",
        formatted_address: selectedPlace.formatted_address,
        photos: selectedPlace.photos,
        place_id: selectedPlace.place_id,
        geometry: selectedPlace.geometry,
      };

      setPlacesToVisit((prevPlaces) => [...prevPlaces, newPlace]);
      setSelectedPlace(null);
    }
  };

  return (
    <div className="p-2">
      <h3>Recommended Activities</h3>
      <p>Click on a marker to view details</p>
      <hr />

      {/* Loading spinner */}
      {loading && <p>Loading nearby places...</p>}

      {/* Google Map */}
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
        <GoogleMap
          center={{ lat: coords?.lat, lng: coords?.lon }}
          zoom={12}
          mapContainerStyle={{
            width: "100%",
            height: "600px",
            borderRadius: "2rem",
            padding: "2rem",
          }}
          mapTypeId="roadmap"
        >
          {/* Render markers if places data is available */}
          {places.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              title={place.name}
              animation={window.google.maps.Animation.DROP}
              icon={"https://maps.google.com/mapfiles/ms/icons/blue-pushpin.png"}
              onClick={() => setSelectedPlace(place)}
            />
          ))}

          {/* InfoWindow for the selected place */}
          {selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry.location.lat,
                lng: selectedPlace.geometry.location.lng,
              }}
              onCloseClick={() => setSelectedPlace(null)}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
              }}
            >
              <div
                className="text-dark"
                style={{
                  maxWidth: "220px",
                  padding: "8px",
                  fontSize: "0.9rem",
                }}
              >
                {/* Title */}
                <h5 className="mb-2">{selectedPlace.name}</h5>
                {/* Address */}
                <p className="mb-2 text-muted" style={{ fontSize: "0.8rem" }}>
                  <i className="bi bi-geo-fill"></i>
                  {selectedPlace.formatted_address}
                </p>

                {selectedPlace.photos && selectedPlace.photos[0] && (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${selectedPlace.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`}
                    alt={selectedPlace.name}
                    style={{
                      width: "100%",
                      height: "50%",
                      borderRadius: "5px",
                    }}
                  />
                )}

                {/* Buttons */}
                <div className="mt-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleAddLocation}
                  >
                    <i className="bi bi-geo-fill"></i> Visit
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <div className="alert alert-primary mt-2 rounded-5" role="alert">
        Recommended {activityType} activities based on current conditions
      </div>
    </div>
  );
};

export default Map;
