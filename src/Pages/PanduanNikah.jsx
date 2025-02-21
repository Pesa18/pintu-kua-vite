import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Navbar,
  NavLeft,
  Page,
} from "framework7-react";
import { RiCloseCircleFill } from "react-icons/ri";
import { TbChevronLeft } from "react-icons/tb";

const PanduanNikah = () => {
  return (
    <Page>
      <Navbar innerClass="!bg-second !text-white">
        <NavLeft>
          <div className="flex flex-row items-center">
            <Link back color="white">
              <TbChevronLeft className="text-2xl" />
            </Link>

            <span className="font-bold text-xl">Panduan Pendaftaran</span>
          </div>
        </NavLeft>
      </Navbar>
      <div className="flex flex-col justify-center items-center w-full px-5">
        <Card expandable className="!w-full !shadow-lg">
          <CardContent padding={false}>
            <div
              style={{
                background:
                  "url('/images/syarat nikah.jpg') no-repeat center top",
                backgroundSize: "contain",
                height: "100%",
              }}
            >
              <Link
                cardClose
                color="white"
                className="card-opened-fade-in"
                style={{ position: "absolute", right: "15px", top: "15px" }}
              >
                <RiCloseCircleFill className="text-4xl" />
              </Link>
            </div>
            <div className="card-content-padding">
              <Button fill round large cardClose>
                Tutup
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card expandable className="!w-full !shadow-lg">
          <CardContent padding={false}>
            <div
              style={{
                background:
                  "url('/images/syarat nikah campuran.jpg') no-repeat center top",
                backgroundSize: "contain",
                height: "100%",
              }}
            >
              <Link
                cardClose
                color="white"
                className="card-opened-fade-in"
                style={{ position: "absolute", right: "15px", top: "15px" }}
              >
                <RiCloseCircleFill className="text-4xl" />
              </Link>
            </div>
            <div className="card-content-padding">
              <Button fill round large cardClose>
                Tutup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};
export default PanduanNikah;
