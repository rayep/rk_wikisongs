import { ActionMenu, ConfirmationDialog } from "@primer/react";
import { useContext, useState } from "react";
import { getItemLS } from "../utils/localStorage";
import { DashboardContext } from "./Dashboard";
import { StorageList } from "./StorageList";

export function LoadButton({ handlers, savedComposers, importedComposers, deleteComposer }) {
  const [selected, setSelected] = useState({});
  const [isConfirmDialogActive, setConfirmDialogActive] = useState(false);
  const [isDeleteConfirmDialogActive, setDeleteConfirmDialogActive] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const { setComposerMetadata, setAlbums, setAlbumsMetadata, setCompletedAlbums, setSongs, setLikedSongs } = handlers;

  const { setAppLoadType, appLoadType } = useContext(DashboardContext);

  function handleLoading(selected) {
    const { type, index } = selected;
    let composerName = getItemLS(type)[index];
    const { composerMetadata, albums, albumsMetadata, completedAlbums, songs, likedSongs } = getItemLS(composerName);

    setAppLoadType("load");
    setComposerMetadata(composerMetadata);
    setAlbums(albums);
    setAlbumsMetadata(albumsMetadata);
    setCompletedAlbums(completedAlbums);
    setSongs(songs);
    setLikedSongs(likedSongs);
  }

  function handleConfirmation(action) {
    if (action === "confirm") {
      handleLoading(selected)
    }
    setConfirmDialogActive(false);
  }

  function handleSelection({ type, index }) {
    appLoadType ? (setSelected({ type, index }), setConfirmDialogActive(true)) : handleLoading({type, index}); // prompt confirmation dialog only if there's an active data loaded in the view.
  }

  function handleDeleteComposer(name) {
    setDeleteItem(name);
    setDeleteConfirmDialogActive(true);
  }

  function handleDeleteConfirmation(action) {
    if (action === "confirm") {
      deleteComposer(deleteItem);
    }
    setDeleteConfirmDialogActive(false);
  }

  return (
    <>
      {isConfirmDialogActive ? (
        <ConfirmationDialog
          onClose={handleConfirmation}
          title="Load Composer"
          width="large"
          height="auto"
          confirmButtonType="danger"
          confirmButtonContent="Yes"
        >
          Are you sure you want to load composer data? <br />
          This action will replace the current data.
        </ConfirmationDialog>
      ) : null}
      {isDeleteConfirmDialogActive ? (
        <ConfirmationDialog
          onClose={handleDeleteConfirmation}
          title="Delete Composer"
          width="large"
          height="auto"
          confirmButtonType="danger"
          confirmButtonContent="Delete"
        >
          Are you sure you want to delete this composer data? <br />
          This action cannot be undone.
        </ConfirmationDialog>
      ) : null}
      <ActionMenu>
        <ActionMenu.Button variant="danger">Load</ActionMenu.Button>
        <ActionMenu.Overlay top={85}>
          <StorageList
            type={"saved"}
            name={"Local Storage"}
            description={"Data loaded from Browser's localStorage"}
            selections={savedComposers}
            setSelection={handleSelection}
            deleteComposer={handleDeleteComposer}
          />
          <StorageList
            type={"imported"}
            name={"Imported"}
            description={"Data loaded from Import store"}
            selections={importedComposers}
            setSelection={handleSelection}
            deleteComposer={handleDeleteComposer}
          />
        </ActionMenu.Overlay>
      </ActionMenu>
    </>
  );
}
