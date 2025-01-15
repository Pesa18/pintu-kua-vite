import axios from "axios";
import {
  f7,
  Fab,
  FabButton,
  FabButtons,
  Link,
  Navbar,
  NavLeft,
  Page,
  SkeletonBlock,
} from "framework7-react";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  TbChevronLeft,
  TbClipboardCopy,
  TbShare,
  TbShare2,
  TbShare3,
} from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export const DetailBerita = (props) => {
  const [articleDetail, setArticleDetail] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const slug = props.slug ?? params.slug;
  const createMarkup = (html) => {
    return { __html: html };
  };
  const addViews = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/app/article/${slug}/view`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      console.log(response.status);

      setArticleDetail(response.data.article);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return navigate("/404");
      }
      toast.error("Error");
    }
  };
  useEffect(() => {
    addViews();
  }, []);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL");
      });
  };
  const shareContent = {
    title: articleDetail?.title,
    text: ` ${articleDetail?.title} `,
    url: window.location.href,
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share(shareContent)
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share API is not supported on this device.");
    }
  };
  return (
    <>
      <Helmet>
        <title>{articleDetail?.title || "Detail Berita"}</title>
        <meta
          name="description"
          content={articleDetail?.description || "Deskripsi artikel"}
        />
        <meta
          name="keywords"
          content={articleDetail?.keywords || "berita, artikel, detail"}
        />
        <meta
          property="og:title"
          content={articleDetail?.title || "Detail Berita"}
        />
        <meta
          property="og:description"
          content={articleDetail?.description || "Deskripsi artikel"}
        />
        <meta
          property="og:image"
          content={articleDetail?.image || "/default-image.jpg"}
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={articleDetail?.title || "Detail Berita"}
        />
        <meta
          name="twitter:description"
          content={articleDetail?.description || "Deskripsi artikel"}
        />
        <meta
          name="twitter:image"
          content={articleDetail?.image || "/default-image.jpg"}
        />
      </Helmet>
      <Page name="detail-berita">
        <Navbar transparent textColor="white" color="white">
          <NavLeft className="!m-0 !p-0">
            <Link href="/" external>
              <TbChevronLeft className=" text-3xl" />
            </Link>
          </NavLeft>
        </Navbar>
        <Fab color="blue" position="right-bottom">
          <TbShare2 className="text-xl font-bold"></TbShare2>
          <FabButtons position="top">
            <FabButton onClick={copyToClipboard}>
              <TbClipboardCopy className="text-xl" />
            </FabButton>
            <FabButton onClick={shareLink}>
              <TbShare3 className="text-xl" />
            </FabButton>
          </FabButtons>
        </Fab>
        <ToastContainer />
        <div className="absolute top-0 w-full">
          {articleDetail ? (
            <>
              <div className="w-full h-80 mx-auto">
                <img
                  src={`${import.meta.env.VITE_APP_FILE + articleDetail.image}`}
                  className="h-full w-full  mx-auto object-fill"
                  alt=""
                />
              </div>
              <div className="mt-4 mx-4 mb-20">
                <div className="flex flex-row gap-1 text-xs ">
                  <span className="font-light">
                    {articleDetail.categories.name}
                  </span>
                  <div className="font-bold"> .</div>
                  <span className="font-light">
                    {moment(articleDetail.published_at).format("D MMMM YYYY")}
                  </span>
                </div>
                <div className="my-2 text-lg font-semibold">
                  {articleDetail.title}
                </div>
                <div className="flex flex-row items-center gap-1">
                  <img className="h-3" src="/logo/kemenag-logo.png" alt="" />
                  <div className="text-xs underline">
                    {articleDetail.users.name}
                  </div>
                </div>
                <div
                  className=""
                  dangerouslySetInnerHTML={createMarkup(articleDetail.content)}
                />
              </div>
            </>
          ) : (
            <>
              <SkeletonBlock className="!h-80 skeleton-effect-wave"></SkeletonBlock>
              <div className="mt-4 mx-4 mb-20 skeleton-effect-wave">
                <div className="flex flex-row gap-1 text-xs ">
                  <span className="skeleton-text">Kategori</span>
                  <div className="skeleton-text"> .</div>
                  <span className="skeleton-text">01 Januari 1994</span>
                </div>
                <div className="my-2 text-lg font-semibold skeleton-text w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, inventore
                </div>
                <div className="flex flex-row items-center gap-1">
                  <img className="h-3" src="/logo/kemenag-logo.png" alt="" />
                  <div className="text-xs underline skeleton-text">
                    Lorem, ipsum.
                  </div>
                </div>
                <div className="skeleton-text mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  eligendi fugit vitae, labore delectus possimus magni minus
                  laborum nulla laudantium, dolorem perferendis exercitationem
                  quae voluptatem adipisci et debitis atque nobis! Rerum odit
                  similique nisi ad officia blanditiis error eligendi in sed
                  unde, consectetur earum sequi est odio molestias cupiditate
                  veniam?
                </div>
              </div>
            </>
          )}
        </div>
      </Page>
    </>
  );
};
