import React from "react";
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import Provider from "./provider";

const ConvexClientProvider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
      <ConvexProvider client={convex}>
        <Provider>{children}</Provider>
      </ConvexProvider>
    </div>
  );
};

export default ConvexClientProvider;
