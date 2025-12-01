import { SearchIcon } from "@primer/octicons-react";
import { TextInput } from "@primer/react";
import { useContext, useState } from "react";
import { DiscographyContext } from "./Discography";
import { DashboardContext } from "./Dashboard";

export function Search() {
  const [search, setSearch] = useState("");
  const { appLoadType } = useContext(DashboardContext);
  const { albums, setSearchAlbums, setAlbums } = useContext(DiscographyContext);

  function handleSearch() {
    if (search) {
      const matchAlbums = albums.filter(({ albumName }) => {
        let normName = albumName.toLowerCase();
        return normName.startsWith(search) || normName.includes(search);
      });
      matchAlbums.length && setSearchAlbums(matchAlbums);
    }
  }
  return (
    <TextInput
      trailingAction={
        <TextInput.Action
          aria-label="Search"
          icon={SearchIcon}
          as="button"
          onClick={handleSearch}
          disabled={!search}
        />
      }
      placeholder="Search"
      block="true"
      onChange={(e) =>
        e.target.value
          ? setSearch(e.target.value.toLowerCase())
          : (setSearch(""), setSearchAlbums([]), setAlbums(albums))
      }
      disabled={!appLoadType}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
  );
}
