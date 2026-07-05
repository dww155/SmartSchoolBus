import { createContext, useContext, useState } from "react";

const MapBoxContext = createContext();

export function useMapBox() {
  const context = useContext(MapBoxContext);
  if (!context) {
    throw new Error("useMapBox must be used within a MapBoxProvider");
  }
  return context;
}

export function MapBoxProvider({ children }) {
  const [mapboxToken, setMapboxToken] = useState(
    import.meta.env.VITE_MAPBOX_TOKEN || ""
  );
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);

  const value = {
    mapboxToken,
    setMapboxToken,
    mapInstance,
    setMapInstance,
    markers,
    setMarkers,
  };

  return (
    <MapBoxContext.Provider value={value}>
      {children}
    </MapBoxContext.Provider>
  );
}
