import { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { TbVolume } from "react-icons/tb";
import { SkeletonBlock, Toggle, ListItem } from "framework7-react";
import { jamUTC } from "../helper/dateHelper";
import { LocationApp } from "./locationApp";
import Countdown from "react-countdown";
import axios from "axios";

const PrayerTime = () => {
  const [nextPrayer, setNextPrayer] = useState("");
  const [skeleton, setSkeleton] = useState(false);
  const [loadShalat, setLoadShalat] = useState(false);
  const [targetDate, setTargetDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const tahun = currentDate.getFullYear().toString();
    const hari = String(currentDate.getDate()).padStart(2, "0");
    const bulan = String(currentDate.getMonth() + 1).padStart(2, "0");
    const fetchData = async (
      kodeKab = 1609,
      year = tahun,
      month = bulan,
      day = hari
    ) => {
      try {
        const response = await axios.get(
          `https://api.myquran.com/v1/sholat/jadwal/${kodeKab}/${year}/${month}/${day}`
        );
        const data = response.data.data;

        // Membuat daftar waktu shalat dalam urutan dari awal hari hingga akhir hari
        // const waktuShalat = [
        //   { name: "Subuh", time: "21:39" },
        //   { name: "Dzuhur", time: "22:40" },
        //   { name: "Ashar", time: "15:07" },
        //   { name: "Isya", time: "23:08" },
        // ];
        const waktuShalat = [
          { name: "Imsak", time: data.jadwal.imsak },
          { name: "Subuh", time: data.jadwal.subuh },
          { name: "Terbit", time: data.jadwal.terbit },
          { name: "Dhuha", time: data.jadwal.dhuha },
          { name: "Dzuhur", time: data.jadwal.dzuhur },
          { name: "Ashar", time: data.jadwal.ashar },
          { name: "Maghrib", time: data.jadwal.maghrib },
          { name: "Isya", time: data.jadwal.isya },
        ];

        setPrayerTimes(waktuShalat);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const currentTime = new Date(); // Waktu sekarang
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const shalatJadwal = () => {
      for (let i = 0; i < prayerTimes.length; i++) {
        const prayerTime = prayerTimes[i];
        const prayerHour = Number(prayerTime.time.split(":")[0]);
        const prayerMinute = Number(prayerTime.time.split(":")[1]);
        if (
          (prayerHour > currentHour ||
            (prayerHour === currentHour && prayerMinute > currentMinute)) &&
          prayerTime.name !== "Terbit" &&
          prayerTime.name !== "Imsak" &&
          prayerTime.name !== "Dhuha"
        ) {
          setNextPrayer({
            shalat: prayerTime.name,
            time: prayerTime.time,
          });
          setTargetDate(new Date(jamUTC(prayerTime.time)));
          setSkeleton(true);
          setLoadShalat(false);
          break;
        } else if (prayerHour < currentHour && prayerTime.name == "Subuh") {
          setNextPrayer({
            shalat: prayerTime.name,
            time: prayerTime.time,
          });
          setTargetDate(new Date(jamUTC(prayerTime.time, 1)));
          setSkeleton(true);
          setLoadShalat(false);
        } else {
        }
      }
    };
    shalatJadwal();
  }, [prayerTimes, loadShalat]);

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
            <Toggle
              defaultChecked
              color="teal"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <div>Adzan</div>
          </div>
          <div>Shalat {nextPrayer.shalat} </div>
          <div className=" text-xl font-bold">{nextPrayer.time} WIB</div>
          <div className="text-xs">
            <Countdown
              date={new Date(targetDate).getTime()}
              key={new Date(targetDate).getTime()}
              daysInHours
              onComplete={() => {
                setLoadShalat(true);
              }}
            />{" "}
            Menuju Shalat {nextPrayer.shalat}
          </div>
        </>
      )}
    </>
  );
};

export default PrayerTime;
