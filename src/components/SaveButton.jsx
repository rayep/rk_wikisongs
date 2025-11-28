import { DatabaseIcon } from "@primer/octicons-react";
import { Button, Banner } from "@primer/react";
import { useContext, useState } from "react";
import { DashboardContext } from "./Dashboard";

export function SaveButton({ composerName, updateSavedComposers }) {
  const { appLoadType } = useContext(DashboardContext);
  const [showSavedBanner, setShowSavedBanner] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          updateSavedComposers({name: composerName}), setShowSavedBanner(true);
        }}
        disabled={!appLoadType}
        trailingVisual={<DatabaseIcon size={16} />}
      >
        Save
      </Button>
      {showSavedBanner && setTimeout(() => setShowSavedBanner(false), 2000) && (
        <Banner
          className="banner"
          title={"Success"}
          onDismiss={() => {
            setShowSavedBanner(false);
          }}
          description={
            <>
              <b>{composerName}</b> data has been successfully saved!
            </>
          }
        />
      )}
    </>
  );
}
