import { Stack, Text, Link } from "@primer/react";
import { HeartFillIcon } from "@primer/octicons-react";

export function Footer() {
  return (
    <Stack justify={"center"} align={"center"} gap={"none"}>
      <Text>
        Made with {<HeartFillIcon size={16} />} by <Link href="https://github.com/rayep" target="_blank">Ray A.</Link>
      </Text>
      <Text size="small" weight="semibold">
        Powered by <Link href="https://primer.style/" target="_blank">Primer-React</Link>
      </Text>
    </Stack>
  );
}
