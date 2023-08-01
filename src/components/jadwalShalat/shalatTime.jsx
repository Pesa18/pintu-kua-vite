import { Navbar, Page } from "framework7-react";
import { BiLocationPlus, BiShare } from "react-icons/bi";
import { TbLocation, TbShare } from "react-icons/tb";

const JadwalShalat = () => {
  return (
    <Page name="shalat" className="!bg-primary">
      <Navbar transparent backLink></Navbar>
      <div className=" h-full rounded-t-2xl mt-32 bg-white shadow-inner px-4 py-8">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <div>
              <TbShare />
            </div>
            <div>Kuningan</div>
            <div>
              <TbLocation />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default JadwalShalat;
