import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  ListItem,
  List,
  Card,
  CardContent,
  NavLeft,
  Link,
  NavTitle,
} from "framework7-react";
import { TbChevronLeft } from "react-icons/tb";

const CalZakat = () => {
  return (
    <Page>
      <Navbar innerClass="!bg-second !text-white">
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white">
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">Kalkulator Zakat</span>
          </div>
        </NavLeft>
      </Navbar>
      <List dividersIos>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "pertanian" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Pertanian Tanaman Pangan</div>
                <img className="h-10" src="/icons/alms.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "perdagangan" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Perdagangan</div>
                <img className="h-10" src="/icons/store.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem noChevron link="/hitung-zakat" routeProps={{ type: "emas" }}>
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Simpanan Emas, Perak, dan Perhiasan</div>
                <img className="h-10" src="/icons/gold.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "tambak" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Tambak</div>
                <img className="h-10" src="/icons/shrimp.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "tanaman" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Tanaman Produktif</div>
                <img className="h-10" src="/icons/vegan.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "ternak" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Peternakan</div>
                <img className="h-10" src="/icons/chick.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "perusahaan" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Perusahaan</div>
                <img className="h-10" src="/icons/company.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "properti" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Properti</div>
                <img className="h-10" src="/icons/property.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          noChevron
          link="/hitung-zakat"
          routeProps={{ type: "profesi" }}
        >
          <Card className="w-full h-full !bg-white shadow-lg  ">
            <CardContent className="border-l-8 h-full w-full rounded-lg overflow-hidden border-primary my-auto">
              <div className="flex flex-row justify-between items-center h-full my-auto">
                <div>Zakat Profesi</div>
                <img className="h-10" src="/icons/profesi.png" />
              </div>
            </CardContent>
          </Card>
        </ListItem>
      </List>
    </Page>
  );
};

export default CalZakat;
