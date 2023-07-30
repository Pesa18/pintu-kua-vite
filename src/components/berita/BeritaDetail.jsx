import { Navbar, Page } from "framework7-react";

export const DetailBerita = (props) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  return (
    <>
      <Page name="detail-berita">
        <Navbar backLink title={props.judul} className="line-clamp-1"></Navbar>
        <img
          src={`http://bimasadmin.test/${props.foto_berita}`}
          className="p-4 h-60 "
          alt=""
        />
        <div
          className="p-2"
          dangerouslySetInnerHTML={createMarkup(props.body)}
        />
      </Page>
    </>
  );
};
