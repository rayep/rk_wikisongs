import { Heading, Stack } from "@primer/react";
import { initLSContainer } from "../utils/localStorage";
import { ActionButtons } from "./ActionButtons";
import { Search } from "./Search";
import "Styles/Header.css";

export function Header() {
  initLSContainer("saved", []);
  initLSContainer("imported", []);

  return (
    <>
      <Stack direction={"horizontal"} align={"center"} gap={"spacious"} padding={"condensed"}>
        <Stack.Item>
          <Heading as="h2">WikiSongs</Heading>
        </Stack.Item>
        <Stack.Item grow>
          <Search />
        </Stack.Item>
        <Stack.Item>
          <Stack direction={"horizontal"}>
            <ActionButtons />
          </Stack>
        </Stack.Item>
      </Stack>
    </>
  );
}
