import { Avatar, Heading, Stack, Text } from "@primer/react";
import { createContext, useContext, useEffect } from "react";
import { getComposerAlbums, getComposerMetadata } from "../utils/discography";
import { Album } from "./Album";
import { DashboardContext, WikiLinkButton } from "./Dashboard";

export const DiscographyContext = createContext(null);

function Composer({ name, avatar, yearsActive }) {
  return (
    <Stack direction={"horizontal"} align={"center"} justify={"center"}>
      <Avatar square size={{ narrow: 0, regular: 0, wide: 100 }} src={avatar} />
      <Stack direction={"vertical"} align={"center"} gap={"condensed"}>
        <Heading as="h3" variant="medium">
          {name}
        </Heading>
        <Text>{yearsActive}</Text>
        <WikiLinkButton value={name} />
      </Stack>
    </Stack>
  );
}

export function Discography({ url }) {
  const { albums, setAlbums, composerMetadata, setComposerMetadata, searchAlbums } = useContext(DiscographyContext);
  const { appLoadType } = useContext(DashboardContext);

  appLoadType === "create" &&
    useEffect(
      () =>
        $.get(url, (data) => {
          setComposerMetadata(getComposerMetadata($(data)));
          setAlbums(getComposerAlbums($(data)));
        }),
      []
    );

  const loadAlbums = searchAlbums.length ? searchAlbums : albums;

  return (
    <>
      <Composer
        name={composerMetadata.composerName}
        avatar={composerMetadata.composerPic}
        yearsActive={composerMetadata.yearsActive}
      />
      <Stack padding={"spacious"} align={"center"} direction={"horizontal"} wrap={"wrap"} gap={"spacious"}>
        {loadAlbums.map(({ albumName, isLinkValid }) => (
          <Album key={albumName} name={albumName} isLinkValid={isLinkValid} />
        ))}
      </Stack>
    </>
  );
}
