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
import DoaHajiList from "../Pages/DoaHajiList";
import DoaHajiDetail from "../Pages/DoaHajiDetail";
import ZiarahDetail from "../Pages/ZiarahDetail";
import CalZakat from "../Pages/CalZakat";
import HitungZakat from "../Pages/HitungZakat";
import KartuNikah from "../Pages/KartuNikah";
import IjabQabul from "../Pages/IjabQabul";
import Ijab from "../Pages/Ijab";
import Qabul from "../Pages/Qabul";
import PanduanNikah from "../Pages/PanduanNikah";
import KhutbahList from "../Pages/Khutbah";
import DetailMasjid from "../Pages/DetailMasjid";

const routes = [
  {
    path: "/",
    component: HomePage,
    keepAlive: false,
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
    path: "/berita/:slug",
    component: DetailBerita,
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
  {
    path: "/doa-haji-list",
    component: DoaHajiList,
  },
  {
    path: "/doa-haji-detail",
    component: DoaHajiDetail,
  },
  {
    path: "/ziarah-detail",
    component: ZiarahDetail,
  },
  {
    path: "/kalkulator-zakat",
    component: CalZakat,
  },
  {
    path: "/hitung-zakat",
    component: HitungZakat,
  },
  {
    path: "/kartu-nikah",
    component: KartuNikah,
  },
  {
    path: "/ijabqabul",
    component: IjabQabul,
  },
  {
    path: "/ijab",
    component: Ijab,
  },
  {
    path: "/qabul",
    component: Qabul,
  },
  {
    path: "/panduan",
    component: PanduanNikah,
  },
  {
    path: "/khutbah",
    component: KhutbahList,
  },
  {
    path: "/khutbah/:slug",
    component: DetailBerita,
  },
  {
    path: "/DetailMasjid",
    component: DetailMasjid,
  },
];

export default routes;
