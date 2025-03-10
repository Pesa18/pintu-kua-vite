import {
  Navbar,
  Page,
  List,
  ListItem,
  Searchbar,
  Block,
  NavRight,
  Subnavbar,
  NavLeft,
  Link,
  Icon,
  NavTitle,
} from "framework7-react";
import QuranJson from "../../helper/jsonQuran";
import { TbChevronLeft, TbSettings } from "react-icons/tb";
import { useState, useEffect } from "react";
import ConvertToArabicNumbers from "../../helper/numberToarabic";
const QuranPage = (props) => {
  const [surahData, setSurahData] = useState(null);
  const [limit, setLimit] = useState(10);
  const loadMore = () => {
    setLimit(limit + 10);
  };
  useEffect(() => {
    const fetchQuranData = async () => {
      const { data } = await QuranJson({ limit: limit, offset: 0 });
      setSurahData(data);
    };

    fetchQuranData();
  }, [limit]);

  return (
    <Page onInfinite={loadMore} infinite>
      <Navbar innerClass="!bg-second" className="!bg-second" textColor="white">
        {" "}
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white">
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">Al-Qur'an</span>
          </div>
        </NavLeft>
        <Subnavbar inner={false} className="!bg-second rounded-b-3xl">
          <Searchbar
            placeholder="Cari Surat"
            searchIn=".item-title"
            className=""
            searchContainer=".search-list"
          ></Searchbar>
        </Subnavbar>
      </Navbar>

      <Block>
        <List strongIos outlineIos dividersIos className="searchbar-not-found">
          <ListItem title="Nothing found" />
        </List>

        <List
          strongIos
          outlineIos
          dividersIos
          className="search-list searchbar-found"
        >
          {surahData
            ? Object.values(surahData).map((surah) => {
                const dataSurah = Object.entries(surah);
                {
                  return dataSurah.map(([i, r]) => {
                    return (
                      <ListItem
                        className="border-b mb-3"
                        key={i}
                        title={r.name_latin}
                        footer={
                          r.translations.id.name +
                          " " +
                          `(${r.number_of_ayah} Ayat)`
                        }
                        link="/detail-surah"
                        routeProps={r}
                        ignoreCache
                      >
                        <div
                          slot="media"
                          className="h-9 w-9 bg-contain bg-no-repeat bg-center flex justify-center items-center"
                          style={{ backgroundImage: "url('/icons/ayat.svg')" }}
                        >
                          <div className="text-center text-sm text-third">
                            <ConvertToArabicNumbers num={i} />
                          </div>
                        </div>
                        <div slot="after" className="font-amiri">
                          {r.name}
                        </div>
                      </ListItem>
                    );
                  });
                }
              })
            : "Loading"}
        </List>
      </Block>
    </Page>
  );
};

export default QuranPage;
