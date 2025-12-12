import { createContext, useContext } from "react";

const FEATURE_LAYER_URL =
  "https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0";

const FeatureLayerContext = createContext<string>(FEATURE_LAYER_URL);

export const FeatureLayerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FeatureLayerContext.Provider value={FEATURE_LAYER_URL}>
      {children}
    </FeatureLayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFeatureLayer = () => {
  return useContext(FeatureLayerContext);
};
