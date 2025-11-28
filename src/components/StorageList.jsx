import { XCircleIcon } from "@primer/octicons-react";
import { ActionMenu, ActionList, Stack, TextInput } from "@primer/react";

export function StorageList({ type, name, description, selections, setSelection, deleteComposer }) {
  return (
    <ActionMenu>
      <ActionMenu.Anchor>
        <ActionList.Item>
          {name}
          <ActionList.Description variant="block">{description}</ActionList.Description>
        </ActionList.Item>
      </ActionMenu.Anchor>
      <ActionMenu.Overlay>
        <ActionList>
          {selections.map((item, index) => (
            <ActionList.Item key={index} onSelect={() => setSelection({ type, index })}>
              <Stack direction={"horizontal"} align={"center"} justify={"space-between"}>
                {item}
                <TextInput.Action
                  aria-label="Delete"
                  icon={XCircleIcon}
                  as="button"
                  onClick={(e) => {e.stopPropagation(), deleteComposer(item)}}
                />
              </Stack>
            </ActionList.Item>
          ))}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}
