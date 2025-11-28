import { useEffect, useState, useContext } from "react";
import { getItemLS, addItemLS, updateLSContainer, deleteItemLS } from "../utils/localStorage";
import { DiscographyContext } from "./Discography";
import { AlbumContext } from "./Album";
import { SongContext } from "./Song";
import { SaveButton } from "./SaveButton";
import { ImportButton } from "./ImportButton";
import { ExportButton } from "./ExportButton";
import { LoadButton } from "./LoadButton";

function handleAction(type, name, composerData) {
  const { composerMetadata, albums, albumsMetadata, completedAlbums, songs, likedSongs } = composerData;
  addItemLS(name, {
    albums,
    composerMetadata,
    albumsMetadata,
    completedAlbums,
    songs,
    likedSongs,
  }),
    updateLSContainer(type, name);
}

export function ActionButtons() {
  const { albums, setAlbums, composerMetadata, setComposerMetadata } = useContext(DiscographyContext);
  const { completedAlbums, setCompletedAlbums, albumsMetadata, setAlbumsMetadata } = useContext(AlbumContext);
  const { songs, setSongs, likedSongs, setLikedSongs } = useContext(SongContext);

  const [savedComposers, setSavedComposers] = useState(getItemLS("saved"));
  const [importedComposers, setImportedComposers] = useState(getItemLS("imported"));

  const loadHandlers = {
    setComposerMetadata,
    setAlbums,
    setAlbumsMetadata,
    setCompletedAlbums,
    setSongs,
    setLikedSongs,
  };
  const composerData = { albums, composerMetadata, albumsMetadata, completedAlbums, songs, likedSongs };

  function handleDeleteAction(name) {
    deleteItemLS(name);
    let imported = getItemLS("imported").filter((composer) => !(composer === name));
    let saved = getItemLS("saved").filter((composer) => !(composer === name));
    addItemLS("imported", imported);
    addItemLS("saved", saved);

    setSavedComposers(saved);
    setImportedComposers(imported);
  }

  function handleImportAction({ name, data }) {
    setImportedComposers((composers) => (!composers.includes(name) ? [...composers, name] : [...name]));
    handleAction("imported", name, data);
  }

  function handleSaveAction({ name }) {
    setSavedComposers((composers) => (!composers.includes(name) ? [...composers, name] : [...name]));
    handleAction("saved", name, composerData);
  }

  return (
    <>
      <SaveButton composerName={composerMetadata.composerName} updateSavedComposers={handleSaveAction} />
      <ImportButton
        updateImportedComposers={handleImportAction}
        allComposers={[...savedComposers, ...importedComposers]}
      />
      <ExportButton exportData={composerData} />
      <LoadButton
        handlers={loadHandlers}
        savedComposers={savedComposers}
        importedComposers={importedComposers}
        deleteComposer={handleDeleteAction}
      />
    </>
  );
}
