import { Dialog, Heading, Label, Stack, Text } from "@primer/react";
import { createContext, useContext } from "react";
import { WikiLinkButton } from "./Dashboard";

export const SongContext = createContext(null);

export function SongDialog({ albumName, toggleSongDialog }) {
  const { songs, likedSongs, setLikedSongs } = useContext(SongContext);

  let albumSongs = songs[albumName];
  let albumLikedSongs = likedSongs[albumName];

  function setAlbumLikedSongs(songName) {
    setLikedSongs((likedSongs) => {
      let updatedAlbumLikedSongs = {
        ...albumLikedSongs,
        [songName]: albumLikedSongs ? !albumLikedSongs[songName] : true,
      };
      return { ...likedSongs, [albumName]: updatedAlbumLikedSongs };
    });
  }

  return (
    <Dialog
      title={<Heading as="h2">{albumName}</Heading>}
      onClose={() => toggleSongDialog(false)}
      width="large"
      height="auto"
    >
      <Stack gap={"normal"} padding={"normal"}>
        <WikiLinkButton value={albumName}/>
        {albumSongs?.map((song) => (
          <Song
            key={song}
            name={song}
            isSongLiked={albumLikedSongs ? albumLikedSongs[song] : false}
            toggleSongLike={setAlbumLikedSongs}
          />
        ))}
      </Stack>
    </Dialog>
  );
}

function Song({ name, isSongLiked, toggleSongLike }) {
  return (
    <Stack
      direction={"horizontal"}
      align={"center"}
      justify={"space-between"}
      onClick={(e) => {
        e.stopPropagation();
        toggleSongLike(name);
      }}
    >
      <Text weight={isSongLiked ? "semibold" : "normal"}>{name}</Text>
      <Label variant={isSongLiked ? "success" : "danger"}>{isSongLiked ? "Liked" : "Skipped"}</Label>
    </Stack>
  );
}
