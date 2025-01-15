import HomePage from "../Pages/Home";
import Masjid from "../Pages/Masjid";
import SemuaBerita from "../Pages/SemuaBerita";
import UserSetting from "../Pages/UserSetting";
import { DetailBerita } from "../components/berita/BeritaDetail";
import { ChatSupport } from "../components/callCenter/callCenter";
import JadwalShalat from "../components/jadwalShalat/shalatTime";
import DetailSurah from "../components/quran/DetailSurah";
import QuranPage from "../components/quran/Quran";
import HajjMenu from "../Pages/HajjMenu";
import NotFoundPage from "../Pages/404";
import HajiList from "../Pages/HajiList";
import ZiarahHaji from "../Pages/ZiarahHaji";
import DoaHaji from "../Pages/DoaHaji";
import HajiDetail from "../Pages/HajiDetail";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/konsultasi",
    component: ChatSupport,
  },
  {
    path: "/detail-berita",
    component: DetailBerita,
  },
  { path: "/quran", component: QuranPage },
  { path: "/detail-surah", component: DetailSurah },
  { path: "/shalat", component: JadwalShalat },
  {
    path: "/user",
    component: UserSetting,
  },
  {
    path: "/masjid",
    component: Masjid,
  },
  {
    path: "/berita",
    component: SemuaBerita,
  },
  {
    path: "/haji",
    component: HajjMenu,
  },
  {
    path: "/404",
    component: NotFoundPage,
  },
  {
    path: "/hajilist",
    component: HajiList,
  },
  {
    path: "/ziarahhaji",
    component: ZiarahHaji,
  },
  {
    path: "/doahaji",
    component: DoaHaji,
  },
  {
    path: "/hajidetail",
    component: HajiDetail,
  },
];

export default routes;
