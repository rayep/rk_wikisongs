import { createRoot } from "react-dom/client";
import { Header } from "./components/Header";
import { BaseStyles, PageLayout, ThemeProvider } from "@primer/react";
import { Dashboard, DashboardContext } from "./components/Dashboard";
import { DiscographyContext } from "./components/Discography";
import { useState } from "react";
import { AlbumContext } from "./components/Album";
import { SongContext } from "./components/Song";
import { Footer } from "./components/Footer";
import "Styles/Landing.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";
import "@primer/primitives/dist/css/base/motion/motion.css"

function App() {
  const [appLoadType, setAppLoadType] = useState("");
  const [darkMode, setDarkMode] = useState(false)
  const [albums, setAlbums] = useState([]);
  const [composerMetadata, setComposerMetadata] = useState({});
  const [completedAlbums, setCompletedAlbums] = useState({});
  const [albumsMetadata, setAlbumsMetadata] = useState({});
  const [songs, setSongs] = useState({});
  const [likedSongs, setLikedSongs] = useState({});
  return (
    <ThemeProvider colorMode={darkMode ? "dark" : "light"}>
      <BaseStyles>
        <DashboardContext value={{ appLoadType, setAppLoadType, darkMode, setDarkMode }}>
          <DiscographyContext value={{ albums, setAlbums, composerMetadata, setComposerMetadata }}>
            <AlbumContext value={{ completedAlbums, setCompletedAlbums, albumsMetadata, setAlbumsMetadata }}>
              <SongContext value={{ songs, setSongs, likedSongs, setLikedSongs }}>
                <PageLayout padding="none" columnGap="none" rowGap="none" containerWidth="auto">
                  <PageLayout.Header divider={"line"} className="header">
                    <Header />
                  </PageLayout.Header>
                  <PageLayout.Content className="dashboard">
                    <Dashboard />
                  </PageLayout.Content>
                  <PageLayout.Footer divider={"line"} className="footer">
                    <Footer />
                  </PageLayout.Footer>
                </PageLayout>
              </SongContext>
            </AlbumContext>
          </DiscographyContext>
        </DashboardContext>
      </BaseStyles>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("app")).render(<App />);
