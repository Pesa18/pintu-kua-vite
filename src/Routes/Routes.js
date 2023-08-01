import HomePage from "../Pages/Home";
import { DetailBerita } from "../components/berita/BeritaDetail";
import { ChatSupport } from "../components/callCenter/callCenter";
import JadwalShalat from "../components/jadwalShalat/shalatTime";
import DetailSurah from "../components/quran/DetailSurah";
import QuranPage from "../components/quran/Quran";

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
];

export default routes;
