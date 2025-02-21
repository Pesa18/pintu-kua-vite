import { Button, Navbar, Page } from "framework7-react";

const DetailMasjid = (props) => {
  return (
    <Page>
      <Navbar title={props.nama_masjid} backLink />
      <div className="flex flex-row gap-4 p-4 border-b">
        <img
          className="bg-light"
          style={{ borderRadius: "8px" }}
          src="/images/image-mosque.png"
          width="100"
        />
        <div className="flex flex-col gap-2">
          <div className="font-bold">{props.nama_masjid}</div>
          <div>
            {props.nama_masjid} ({props.nama_kabupaten}, {props.nama_provinsi})
          </div>
          <div className="p-2 bg-second text-center text-white rounded-md">
            {props.tipe}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="font-bold text-lg">Alamat</div>
        <div className="p-4">{props.alamat}</div>
        <div className="font-bold text-lg">Luas Tanah</div>
        <div className="p-4">{props.luas_tanah} m2</div>
        <div className="font-bold text-lg">Luas Bangunan</div>
        <div className="p-4">{props.luas_bangunan} m2</div>
        <div className="font-bold text-lg">Kapasitas</div>
        <div className="p-4">{props.daya_tampung_jamaah} Orang</div>
        <Button
          fill
          color="teal"
          className="!mt-4 !mb-8"
          href={`http://maps.google.com/?q=${props.alamat}`}
          external
          target="_blank"
        >
          Lihat Peta
        </Button>
      </div>
    </Page>
  );
};

export default DetailMasjid;
