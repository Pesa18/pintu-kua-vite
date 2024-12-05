import { Navbar, Page } from "framework7-react";

export const DetailBerita = (props) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  return (
    <>
      <Page name="detail-berita">
        <Navbar backLink title={props.title} className="line-clamp-1"></Navbar>
        <img
          src={`${import.meta.env.VITE_APP_FILE + props.image}`}
          className="p-4 h-60 "
          alt=""
        />
        <div
          className="p-2"
          dangerouslySetInnerHTML={createMarkup(props.content)}
        />
      </Page>
    </>
  );
};
