import {
  Button,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  Page,
  Segmented,
  Tab,
  Tabs,
} from "framework7-react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { TbChevronLeft } from "react-icons/tb";

const IjabQabul = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ijab = {
    ayah_kandung: {
      judul:
        "Kalimat ijab yang dilakukan sendiri oleh wali yang berupa ayah kandung pengantin perempuan",
      konten:
        "<p>“Saudara .....(nama pengantin laki-laki) bin ...... (nama bapakpengantin laki-laki) Saya nikahkan dan saya kawinkan Anda dengan anakperempuan saya ....... (nama pengantin perempuan) dengan maskawin.......... (sebutkan jenis dan nominal maskawinnya) dibayar tunai.”</p><p>Contoh: “Saudara Muhammad bin Abdullah, saya nikahkan dan saya kawinkan Anda dengan anak perempuan saya Khadijah dengan mas kawin uang satu juta rupiah dibayar tunai.”</p>",
    },
    bukan_ayah: {
      judul:
        "Kalimat ijab yang dilakukan sendiri oleh wali yang bukan ayah kandung pengantin perempuan",
      konten:
        "<p>“Saudara .....(nama pengantin laki-laki) bin ...... (nama bapak pengantin laki-laki) Saya nikahkan dan saya kawinkan Anda dengan cucu/saudara perempuan/keponakan/saudara sepupu (pilih salah satu hubungan antara pengantin perempuan dengan wali) saya ....... (nama pengantin perempuan) binti ...... (nama bapak pengantin perempuan) dengan mas kawin .......... (sebutkan jenis dan nominal mas kawinnya) dibayar tunai.”</p><p> Contoh: “Saudara Muhammad bin Abdullah, Saya nikahkan dan saya kawinkan Anda dengan saudara perempuan saya Khadijah binti Khuwailid dengan mas kawin uang satu juta rupiah dibayar tunai.”</p>",
    },
    wakil: {
      judul:
        "Kalimat ijab yang dilakukan oleh orang yang mewakili wali pengantin perempuan",
      konten:
        " <p>“Saudara .....(nama pengantin laki-laki) bin ...... (nama bapak pengantin laki-laki) Saya nikahkan dan saya kawinkan Anda dengan  ....... (nama pengantin perempuan) binti ...... (nama bapak pengantin perempuan) yang walinya telah mewakilkan kepada saya untuk menikahkannya dengan Anda dengan mas kawin .......... (sebutkan jenis dan nominal mas kawinnya) dibayar tunai.”</p><p>Contoh: “Saudara Muhammad bin Abdullah, Saya nikahkan dan saya kawinkan Anda dengan  Khadijah binti Khuwailid yang walinya telah mewakilkan kepada saya untuk menikahkannya dengan Anda  dengan mas kawin uang satu juta rupiah dibayar tunai.”</p>",
    },
    ayah_kandung_arab: {
      judul:
        "Kalimat ijab Bahasa Arab yang dilakukan sendiri oleh wali yang berupa ayah kandung pengantin perempuan",
      konten:
        "<p class='font-lateef not-italic text-2xl text-center'>أَنكَحْتُكَ وَزَوَّجْتُكَ مَخْطُوْبَتَكَ بِنْتِي ...... بِمَهْرِ ...... حَالًا </p><p>Ankaḫtuka wa zawwajtuka makhthûbataka bintî ...... bi mahri ...... hâlan</p><p>Artinya: “Saya nikahkan kamu dan saya kawinkan kamu dengan perempuan pinanganmu anakku ...... dengan mas kawin ...... tunai.”</p>",
    },
    bukan_ayah_arab: {
      judul:
        "Kalimat ijab Bahasa Arab yang dilakukan sendiri oleh wali yang bukan ayah kandung pengantin perempuan",
      konten:
        "<p class='font-lateef not-italic text-2xl text-center'>أَنكَحْتُكَ وَزَوَّجْتُكَ مَخْطُوْبَتَكَ ...... بِنْتَ ...... الَّتِي وَكَّلَنِي وَلِيُّهَا بِمَهْرِ ...... حَالًا</p><p>Ankaḫtuka wa zawwajtuka makhthûbataka ...... binta ...... allatî wakkalanî waliyyuhâ bi mahri ...... hâlan</p><p>Artinya: “Saya nikahkan kamu dan saya kawinkan kamu dengan perempuan pinanganmu ...... binti ...... dengan mas kawin ...... tunai.”</p>",
    },
    wakil_arab: {
      judul:
        "Kalimat ijab Bahasa Arab yang dilakukan oleh orang yang mewakili wali pengantin perempuan",
      konten:
        "<p class='font-lateef not-italic text-2xl text-center'>أَنكَحْتُكَ وَزَوَّجْتُكَ مَخْطُوْبَتَكَ ...... بِنْتَ ...... الَّتِي وَكَّلَنِي وَلِيُّهَا بِمَهْرِ ...... حَالًا</p><p>Ankaḫtuka wa zawwajtuka makhthûbataka ...... binta ...... allatî wakkalanî waliyyuhâ bi mahri ...... hâlan</p><p>Artinya: “Saya nikahkan kamu dan saya kawinkan kamu dengan perempuan pinanganmu ...... binti ...... yang walinya telah mewakilkan kepada saya dengan mas kawin ...... tunai.”</p>",
    },
  };
  const qabul = {
    indonesia: {
      judul:
        "Kalimat Qabul yang diucapkan oleh pengantin laki-laki Bahasa Indonesia",
      konten:
        "<p>“Saya terima nikah dan kawinnya ...... (nama pengantin perempuan) binti ...... (nama ayah pengantin perempuan) untuk diri saya dengan mas kawin tersebut dibayar tunai.”</p><p>Contoh: “Saya terima nikah dan kawinnya Khadijah binti Khuwailid untuk diri saya dengan mas kawin tersebut dibayar tunai.</p>",
    },
    arab: {
      judul:
        "Kalimat Qabul yang diucapkan oleh pengantin laki-laki Bahasa Arab",
      konten:
        "<p class='font-lateef not-italic text-2xl text-center'>قَبِلْتُ نِكَاحَهَا وَتَزْوِيْجَهَا بِالْمَهْرِ المذْكُوْرِ</p><p>Qabiltu nikâḫahâ wa tazwîjahâ bil mahril madzkûr</p><p>Artinya: “Saya terima nikah dan kawinnya dengan mas kawin tersebut.”</p>",
    },
    sunda: {
      judul: "",
      konten: "",
    },
  };
  return (
    <Page>
      <Navbar innerClass="!bg-second !text-white">
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white">
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">Ijab & Qabul</span>
          </div>
        </NavLeft>
      </Navbar>

      <Segmented strong tag="p" className="w-3/4 mx-auto ">
        <Button tabLink={"#tab-1"} onClick={() => setActiveTab(0)}>
          Ijab
        </Button>
        <Button tabLink={"#tab-2"} onClick={() => setActiveTab(1)}>
          Qabul
        </Button>
      </Segmented>

      <Tabs>
        <Tab id={"tab-1"} tabActive={activeTab === 0}>
          <List dividersIos>
            <ListItem noChevron link="/ijab" routeProps={ijab.ayah_kandung}>
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Kalimat Ijab Wali Ayah Kandung</div>
                    <img
                      src="https://flagcdn.com/16x12/id.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem noChevron link="/ijab" routeProps={ijab.bukan_ayah}>
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Kalimat Ijab Wali Bukan Ayah Kandung</div>
                    <img
                      src="https://flagcdn.com/16x12/id.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem noChevron link="/ijab" routeProps={ijab.wakil}>
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Kalimat Ijab Mewakili Wali</div>
                    <img
                      src="https://flagcdn.com/16x12/id.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem
              noChevron
              link="/ijab"
              routeProps={ijab.ayah_kandung_arab}
            >
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Kalimat Ijab Wali Ayah Kandung Bahasa Arab</div>
                    <img
                      src="https://flagcdn.com/16x12/sa.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem noChevron link="/ijab" routeProps={ijab.bukan_ayah_arab}>
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Kalimat Ijab Wali Bukan Ayah Kandung Bahasa Arab</div>
                    <img
                      src="https://flagcdn.com/16x12/sa.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem noChevron link="/ijab" routeProps={ijab.wakil_arab}>
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Kalimat Ijab Mewakili Wali Bahasa Arab</div>
                    <img
                      src="https://flagcdn.com/16x12/sa.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
          </List>
        </Tab>
        <Tab id={"tab-2"} tabActive={activeTab === 1}>
          <List dividersIos>
            <ListItem noChevron link="/qabul" routeProps={qabul.indonesia}>
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Qabul Bahasa Indonesia</div>
                    <img
                      src="https://flagcdn.com/16x12/id.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
            <ListItem noChevron link="/qabul" routeProps={qabul.arab}>
              <Card className="w-full h-full !bg-white shadow-lg  ">
                <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
                  <div className="flex flex-row justify-between items-center h-full my-auto">
                    <div>Qabul Bahasa Arab</div>
                    <img
                      src="https://flagcdn.com/16x12/sa.png"
                      width="16"
                      height="12"
                    />
                  </div>
                </CardContent>
              </Card>
            </ListItem>
          </List>
        </Tab>
      </Tabs>
    </Page>
  );
};

export default IjabQabul;
