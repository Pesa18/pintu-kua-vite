import { useState, useEffect } from "react";
import { SkeletonBlock, Toggle, ListItem } from "framework7-react";
import CountDownShalat from "./jadwalShalat/countdownShalat";

const PrayerTime = ({ dataKota }) => {
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    if (dataKota) {
      setSkeleton(true);
    }
  });

  return (
    <>
      {!skeleton ? (
        <>
          {" "}
          <SkeletonBlock
            effect="fade"
            borderRadius="10%"
            height="20px"
            width="20%"
          />
          <SkeletonBlock
            effect="fade"
            borderRadius="5%"
            height="20px"
            width="35%"
          />
          <SkeletonBlock
            effect="fade"
            borderRadius="5%"
            height="30px"
            width="35%"
          />
          <SkeletonBlock
            effect="fade"
            borderRadius="5%"
            height="10px"
            width="45%"
          />
        </>
      ) : (
        <>
          <div className="flex items-center ">
            {" "}
            {/* <Toggle
              defaultChecked
              color="teal"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <div>Adzan</div> */}
          </div>
          <CountDownShalat dataKota={dataKota} setSkeleton={setSkeleton} />
        </>
      )}
    </>
  );
};

export default PrayerTime;
