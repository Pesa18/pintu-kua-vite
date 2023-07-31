import { Block, Card, List, ListItem, Navbar, Page } from "framework7-react";
import ConvertToArabicNumbers from "../../helper/numberToarabic";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
} from "react-icons/tb";
import ReactAudioPlayer from "react-audio-player";
import { useRef, useState } from "react";
import axios from "axios";
const DetailSurah = (props) => {
  const [trackInterval, setTrackInterval] = useState("0");
  const [playAudio, setPlayAudio] = useState(false);
  const audioRef = useRef();
  const [audioQuran, setAudioQuran] = useState(null);
  const playQuran = (number) => {
    setAudioQuran(number);
  };
  const onEnded = () => {
    setPlayAudio(false);
  };
  const onPlay = () => {
    setPlayAudio(true);
    interval = audioRef.current.listenInterval;
    setTrackInterval(interval);
  };

  return (
    <Page name="detail-surah">
      <Navbar backLink title={props.name_latin}></Navbar>
      <div className="p-3 bg-bluegreen">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-xs">{props.name_latin}</div>
          <div className="p-2 bg-white text-md font-kufi rounded-full">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          <div className="text-white font-amiri">{props.name}</div>
        </div>
      </div>
      <Block>
        <List strongIos outlineIos dividersIos className="">
          {Object.values(props.text).map((s, i) => {
            return (
              <ListItem key={i} className="font-lateef border-b mb-3 ">
                <div slot="media">
                  <HiOutlineDotsVertical
                    onClick={() => {
                      playQuran(
                        `${String(props.number).padStart(3, "0")}${String(
                          i + 1
                        ).padStart(3, "0")}`
                      );
                    }}
                  />
                </div>
                <div className=" !p-0 w-full flex flex-col">
                  <div className="text-right text-2xl leading-relaxed w-full">
                    <div className="flex flex-row justify-end">
                      <div
                        className="h-7 w-8 bg-contain bg-no-repeat bg-center flex justify-center items-center"
                        style={{ backgroundImage: "url('/icons/ayat.svg')" }}
                      >
                        <div className="text-center text-xs text-third">
                          <ConvertToArabicNumbers num={i + 1} />
                        </div>
                      </div>
                      <div className="">{s}</div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end text-justify">
                    {props.translations.id.text[i + 1]}
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>
      </Block>
      <div className=" px-2 flex  flex-row items-center bg-primary rounded-xl fixed  bottom-20 h-10 z-50 w-1/4 left-1/2 transform -translate-x-1/2">
        <input
          id="default-range"
          type="range"
          value={trackInterval}
          min={0}
          max={trackInterval}
          className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
        />

        <div className="flex flex-row text-white">
          {playAudio ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
          <TbPlayerStopFilled className="text-red-500" />
        </div>
      </div>
      {audioQuran && (
        <ReactAudioPlayer
          className="hidden"
          src={`https://verses.quran.com/Shatri/mp3/${audioQuran}.mp3`}
          autoPlay
          onPlay={onPlay}
          controls
          ref={audioRef}
          onEnded={onEnded}
        />
      )}
    </Page>
  );
};
export default DetailSurah;
