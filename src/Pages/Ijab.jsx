import { Navbar, Page } from "framework7-react";

const Ijab = (props) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  return (
    <Page>
      <Navbar backLink></Navbar>
      <div className="mx-6 mt-6">
        <div className="font-bold text-base">{props.judul}</div>
        <div
          className="text-base leading-relaxed text-left italic"
          dangerouslySetInnerHTML={createMarkup(props.konten)}
        />
      </div>
    </Page>
  );
};

export default Ijab;
