"use client";
import axios from "axios";
import {
  Navbar,
  Page,
  List,
  ListInput,
  Icon,
  NavRight,
  Button,
  ListItem,
  Subnavbar,
  Searchbar,
} from "framework7-react";
import { useEffect, useState } from "react";
import { TbCurrentLocation } from "react-icons/tb";

const Masjid = () => {
  const [dataMasjid, setDataMasjid] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const loadMore = () => {
    setPage(page + 1);
  };
  const searchMasjid = ({ target }) => {
    let searchValue = target.value;
    if (searchValue.length > 2) {
      setSearch(searchValue);
      setPage(1);
    }
  };
  const getMasjidData = async () => {
    try {
      const response = await axios.get(
        `https://pusaka.kemenag.go.id/api/v1/public/masjid?rows=12&search=${search}&page=${page}&provinsi_id=&kabupaten_id=`,
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "https://pusaka-v3.kemenag.go.id",
            Authorization:
              "eyJpdiI6Inkwd2t5Y1lNMzhrd0I0cE1WN0lTNGc9PSIsInZhbHVlIjoiOWxJWm5uREV2aHYvak9ObnpmZ1U4UT09IiwibWFjIjoiMDhmNzdmYTlmMDAxOTlkN2EwYzU4Mzg5NjViODI2NWVjNjI2ZTdhNWFhNjM1YWZkY2UwNzgwMGZjMmU2MmE0ZCIsInRhZyI6IiJ9",
          },
        }
      );

      const newData = response.data.data.data; // Data baru dari API
      setDataMasjid((prevData) => {
        if (search) {
          return setDataMasjid(newData);
        }
        if (dataMasjid.length === 0) {
          return setDataMasjid(newData);
        }
        return [...prevData, ...newData];
      }); // Gabungkan data lama dengan data baru
    } catch (error) {}
  };

  useEffect(() => {
    getMasjidData();
  }, [page, search]);
  return (
    <Page name="masjid" onInfinite={loadMore} infinite>
      <Navbar backLink title="Masjid">
        <NavRight>
          <Button fill>
            <div className="flex flex-row justify-center items-center gap-2">
              <TbCurrentLocation />
              <div>Terdekat</div>
            </div>
          </Button>
        </NavRight>
        <Subnavbar>
          <Searchbar
            onInput={searchMasjid}
            placeholder="Isi Minimal 3 Huruf"
          ></Searchbar>
        </Subnavbar>
      </Navbar>
      <List dividersIos mediaList outlineIos strongIos>
        {dataMasjid ? (
          dataMasjid.map((item, index) => (
            <ListItem
              id={item.id}
              key={index}
              link="/user"
              title={item.nama_masjid}
              after="Lihat"
              subtitle={item.tipe}
              text={item.alamat}
            >
              <img
                className="bg-light"
                slot="media"
                style={{ borderRadius: "8px" }}
                src="/images/image-mosque.png"
                width="50"
              />
            </ListItem>
          ))
        ) : (
          <div>Tidak ada data</div>
        )}
      </List>
    </Page>
  );
};

export default Masjid;
