import {
  Block,
  BlockTitle,
  Card,
  Link,
  List,
  ListItem,
  NavLeft,
  NavRight,
  Navbar,
  Page,
  Popover,
  Range,
} from "framework7-react";
import ConvertToArabicNumbers from "../../helper/numberToarabic";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbChevronLeft,
  TbSettings,
} from "react-icons/tb";
import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
const DetailSurah = (props) => {
  const [textQuran, setTextQuran] = useState(30);
  const [textTranslation, setTextTranslation] = useState(15);
  const [surahPlay, setSurahPlay] = useState(null);
  const [playAudio, setPlayAudio] = useState(false);
  const audioRef = useRef();
  const [audioQuran, setAudioQuran] = useState(null);
  const playQuran = (number, surah) => {
    setAudioQuran(number);
    setSurahPlay(surah);
  };
  const quranRef = useRef([]);
  const scrollToTarget = (index) => {
    quranRef.current[index]?.scrollIntoView({
      behavior: "smooth", // Efek scroll yang halus
      block: "center", // Posisi elemen (start, center, end)
    });
  };
  const onPause = () => {
    setPlayAudio(false);
  };
  const onEnded = () => {
    setPlayAudio(false);

    if (surahPlay >= parseInt(props.number_of_ayah)) {
      setAudioQuran("");
      setPlayAudio(false);
    } else {
      setSurahPlay(surahPlay + 1);

      setAudioQuran(String(parseInt(audioQuran, 10) + 1).padStart(6, "0"));
      scrollToTarget(surahPlay);
    }
  };
  const onPlay = () => {
    setPlayAudio(true);
    scrollToTarget(surahPlay - 1);
  };

  const quranTextValue = (e) => {
    setTextQuran(e);
  };
  const translationTextValue = (e) => {
    setTextTranslation(e);
  };
  return (
    <Page>
      <Navbar innerClass="!bg-second !text-white" textColor="white">
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white" reloadAll reloadPrevious reloadCurrent>
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">{props.name_latin}</span>
          </div>
        </NavLeft>
        <NavRight>
          <Link popoverOpen={".setting-popup"}>
            <TbSettings className="text-2xl text-white mr-3" />
          </Link>
        </NavRight>
      </Navbar>
      <div className="p-3 bg-second rounded-b-xl">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-xs">{props.name_latin}</div>
          <div className="p-2 bg-white text-md font-lateef text-xl rounded-full">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          <div className="text-white font-amiri">{props.name}</div>
        </div>
      </div>
      <Block>
        <List strongIos outlineIos dividersIos className="">
          {Object.values(props.text).map((s, i) => {
            return (
              <ListItem
                key={i}
                className={`font-lateef border-b mb-3 ${
                  playAudio && surahPlay === i + 1 && "!bg-yellow-50"
                }  `}
              >
                <div slot="media">
                  {playAudio && surahPlay === i + 1 ? (
                    <TbPlayerPauseFilled className="text-xl text-bluegreen" />
                  ) : (
                    <TbPlayerPlayFilled
                      className="text-xl text-bluegreen"
                      onClick={() => {
                        playQuran(
                          `${String(props.number).padStart(3, "0")}${String(
                            i + 1
                          ).padStart(3, "0")}`,
                          i + 1
                        );
                      }}
                    />
                  )}
                </div>
                <div className=" !p-0 w-full flex flex-col">
                  <div className="text-right text-2xl leading-relaxed w-full">
                    <div className="flex flex-row justify-end">
                      <div
                        className="h-7 w-8 bg-contain bg-no-repeat bg-center flex justify-center items-center"
                        style={{ backgroundImage: "url('/icons/ayat.svg')" }}
                      >
                        <div className="text-center   text-xs text-third">
                          <ConvertToArabicNumbers num={i + 1} />
                        </div>
                      </div>
                      <div
                        ref={(el) => (quranRef.current[i] = el)}
                        key={i + 1}
                        id={i + 1}
                        style={{ fontSize: `${textQuran}px` }}
                        className={`text-[${textQuran}px] w-full`}
                      >
                        {s}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ fontSize: `${textTranslation}px` }}
                    className={`w-full !text-[${textTranslation}px] flex justify-end text-justify`}
                  >
                    {props.translations.id.text[i + 1]}
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>
      </Block>
      <div className=" px-2 flex  flex-row items-center  rounded-xl fixed  bottom-20 h-10 z-50 w-full left-1/2 transform -translate-x-1/2">
        {audioQuran && (
          // <ReactAudioPlayer
          //   src={`https://verses.quran.com/Shatri/mp3/${audioQuran}.mp3`}
          //   autoPlay
          //   onPlay={onPlay}
          //   controls
          //   ref={audioRef}
          //   onEnded={onEnded}
          //   preload="auto"
          //   onPause={onPause}
          // />
          <AudioPlayer
            src={`https://verses.quran.com/Shatri/mp3/${audioQuran}.mp3`}
            autoPlay
            showSkipControls={true}
            onPlay={onPlay}
            controls
            ref={audioRef}
            onEnded={onEnded}
            preload="auto"
            onPause={onPause}
          />
        )}
      </div>

      <Popover className="setting-popup !bg-bluegreen  !bg-opacity-75 !px-2">
        <Block>
          <BlockTitle className="flex flex-row !text-white justify-between  p-2">
            <div>Text Qur'an</div>
            <div
              style={{ fontSize: `${textQuran}px` }}
              className={`font-lateef !text-[${textQuran}px]`}
            >
              بِسْمِ اللّٰهِ{" "}
            </div>
          </BlockTitle>
          <List>
            <ListItem>
              <Range
                onRangeChange={quranTextValue}
                color="white"
                className=""
                min={20}
                max={50}
                label={true}
                step={5}
                value={textQuran}
                scale={true}
                scaleSteps={3}
              ></Range>
            </ListItem>
          </List>
        </Block>
        <Block>
          <BlockTitle className="flex flex-row  !text-white justify-between">
            <div className="">Text Translate</div>
            <div
              style={{ fontSize: `${textTranslation}px` }}
              className={`font-lateef !text-[${textTranslation}px]`}
            >
              Translate
            </div>
          </BlockTitle>
          <List>
            <ListItem>
              <Range
                color="white"
                className=""
                onRangeChange={translationTextValue}
                min={10}
                max={30}
                label={true}
                step={5}
                value={textTranslation}
                scale={true}
                scaleSteps={4}
              ></Range>
            </ListItem>
          </List>
        </Block>
      </Popover>
    </Page>
  );
};
export default DetailSurah;
