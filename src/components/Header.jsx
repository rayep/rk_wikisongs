import { SearchIcon } from "@primer/octicons-react";
import { Heading, Stack, TextInput } from "@primer/react";
import { useEffect } from "react";
import { initLSContainer } from "../utils/localStorage";
import "Styles/Header.css";
import { ActionButtons } from "./ActionButtons";

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
          <TextInput
            trailingAction={<TextInput.Action aria-label="Search" icon={SearchIcon} as="button" />}
            placeholder="Search"
            block="true"
          />
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
