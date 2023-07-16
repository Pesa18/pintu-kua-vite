import { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { TbVolume } from "react-icons/tb";
import { SkeletonBlock, Toggle, ListItem } from "framework7-react";
import { jamUTC } from "../helper/dateHelper";
import { LocationApp } from "./locationApp";
import axios from "axios";

const PrayerTime = () => {
  const [countdown, setCountdown] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [skeleton, setSkeleton] = useState(false);
  const [loadShalat, setLoadShalat] = useState(false);
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = targetDate - now;
      // Menghitung sisa waktu dalam hari, jam, menit, dan detik
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((distance % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      // Menggabungkan hasil perhitungan menjadi satu string
      const countdownString = hours + ":" + minutes + ":" + seconds;
      setCountdown(countdownString);

      // Menghentikan interval saat targetDate telah tercapai
      if (distance <= 0) {
        clearInterval(interval);
        setCountdown(false);
        setLoadShalat(true);
      }
    }, 1000);

    // Membersihkan interval saat komponen tidak lagi digunakan
    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

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
        const currentTime = new Date(); // Waktu sekarang
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        // Membuat daftar waktu shalat dalam urutan dari awal hari hingga akhir hari
        // const prayerTimes = [
        //   { name: "Dzuhur", time: "08:51" },
        //   { name: "Ashar", time: "08:52" },
        //   { name: "Isya", time: "08:53" },
        //   { name: "Subuh", time: "04:20" },
        // ];
        const prayerTimes = [
          { name: "Imsak", time: data.jadwal.imsak },
          { name: "Subuh", time: data.jadwal.subuh },
          { name: "Terbit", time: data.jadwal.terbit },
          { name: "Dhuha", time: data.jadwal.dhuha },
          { name: "Dzuhur", time: data.jadwal.dzuhur },
          { name: "Ashar", time: data.jadwal.ashar },
          { name: "Maghrib", time: data.jadwal.maghrib },
          { name: "Isya", time: data.jadwal.isya },
        ];

        // Mencari waktu shalat berikutnya berdasarkan waktu sekarang
        for (let i = 0; i < prayerTimes.length; i++) {
          const prayerTime = prayerTimes[i];
          const prayerHour = Number(prayerTime.time.split(":")[0]);
          const prayerMinute = Number(prayerTime.time.split(":")[1]);
          if (
            (prayerHour > currentHour ||
              prayerHour < currentHour ||
              (prayerHour === currentHour && prayerMinute > currentMinute)) &&
            prayerTime.name !== "Terbit" &&
            prayerTime.name !== "Imsak" &&
            prayerTime.name !== "Dhuha"
          ) {
            if (prayerTime.name === "Subuh") {
              setNextPrayer({
                shalat: prayerTime.name,
                time: prayerTime.time,
              });
              setTargetDate(new Date(jamUTC(prayerTime.time, 1)));
            } else {
              setNextPrayer({
                shalat: prayerTime.name,
                time: prayerTime.time,
              });

              setTargetDate(new Date(jamUTC(prayerTime.time)));
              break;
            }
          }

          setSkeleton(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (loadShalat) {
      fetchData();
      setLoadShalat(false);
    }
  }, [loadShalat]);

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
            {countdown} Menuju Shalat {nextPrayer.shalat}
          </div>
        </>
      )}
    </>
  );
};

export default PrayerTime;
