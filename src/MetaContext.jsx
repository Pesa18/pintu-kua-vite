import React, { createContext, useState, useContext } from "react";

const MetaContext = createContext();

export const MetaProvider = ({ children }) => {
  const [meta, setMeta] = useState({
    title: "Pintu KUA",
    description: "Aplikasi Mobile Pintu KUA",
    keywords: "default, keywords",
    image: "/default-image.jpg",
    url: window.location.href,
  });

  return (
    <MetaContext.Provider value={{ meta, setMeta }}>
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => useContext(MetaContext);
