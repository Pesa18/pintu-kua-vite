import { useState, useEffect } from "react";
import axios from "axios";
export const LocationApp = () => {
  const { cookie } = AuthData();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState(null);
  const [locationGet, setLocationGet] = useState("");

  const getCook = cookie.get("locationApp");

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            const location = JSON.stringify({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              detailLokasi: "asd",
            });

            cookie.set("locationApp", location, { path: "/home" });
          },
          (error) => {
            setLocationGet("lokasi tidak ditemukan");
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    const fetchLocation = async (lat, long) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              format: "json",
              lat: lat,
              lon: long,
            },
          }
        );
        console.log(response);
        setLocationGet(response.data.display_name);
      } catch (error) {
        console.error(error);
      }
    };

    if (getCook) {
      setLatitude(getCook.latitude);
      setLongitude(getCook.longitude);
      fetchLocation(getCook.latitude, getCook.longitude);
    } else {
      getLocation();
    }
  }, []);

  return locationGet;
};
