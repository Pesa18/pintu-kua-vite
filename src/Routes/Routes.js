import HomePage from "../Pages/Home";
import { DetailBerita } from "../components/berita/BeritaDetail";
import { ChatSupport } from "../components/callCenter/callCenter";
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
];

export default routes;
