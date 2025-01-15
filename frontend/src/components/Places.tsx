import { Key } from "react";

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

interface PlacesProps {
  placesToVisit: Place[];
}

export default function Places({ placesToVisit }: PlacesProps) {
  // Function to print the travel plan
  const printTravelPlan = () => {
    const travelPlan = document.getElementById("travel-plan");
    if (travelPlan) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(travelPlan.innerHTML);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  // Only render if there are places to visit
  if (placesToVisit.length === 0) {
    return null; // If no places, return null to avoid rendering
  }

  return (
    <div className="mt-4 p-2">
      {/* Display added places */}
      <div id="travel-plan">
        <div className="d-flex justify-content-between">
          <h3>Your Travel Wishlist</h3>
          <div className="btn-group gap-1">
            <button className="btn btn-success" onClick={printTravelPlan}>
              <i className="bi bi-share-fill"></i> Share
            </button>
            <button className="btn btn-success" onClick={printTravelPlan}>
              <i className="bi bi-cloud-download"></i> Save
            </button>
            <button className="btn btn-success" onClick={printTravelPlan}>
              <i className="bi bi-printer"></i> Print
            </button>
          </div>
        </div>
        <p>Click on a marker to view details</p>
        <hr />

        {/* Horizontal scrolling container */}
        <div
          className="d-flex overflow-x-auto gap-3 p-3"
          style={{ flexWrap: "nowrap", overflowX: "auto" }}
        >
          {placesToVisit.map((place, index) => (
            <div
              key={index}
              className="card rounded-5 shadow"
              style={{
                minWidth: "250px",
                flex: "0 0 auto",
                maxWidth: "300px",
                height: "100%",
              }}
            >
              <img
                src={place.imageUrl}
                alt={place.name}
                className="card-img-top rounded-5 p-1"
                style={{
                  objectFit: "cover",
                  height: "200px",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{place.name}</h5>
                <p className="card-text" style={{ flex: 1 }}>
                  {place.description}
                </p>
                <br />
                <p className="card-text">
                  <strong><i className="bi bi-geo-fill"></i></strong> {place.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
