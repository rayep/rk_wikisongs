import { UploadIcon } from "@primer/octicons-react";
import { Button, Link } from "@primer/react";
import { useRef, useContext, useState, useEffect } from "react";
import { DashboardContext } from "./Dashboard";

export function ExportButton({ exportData }) {
  const linkRef = useRef(null);
  const { composerMetadata } = exportData;
  const { appLoadType } = useContext(DashboardContext);
  const [exportClicked, setExportClicked] = useState(false);

  useEffect(() => {
    exportClicked && linkRef.current.click();
  }, [exportClicked]);

  return (
    <>
      <Button
        trailingVisual={<UploadIcon size={16} />}
        disabled={!appLoadType}
        loading={exportClicked}
        onClick={() => {
          setExportClicked(true);
          setTimeout(()=>setExportClicked(false), 3000)
        }}
      >
        Export
      </Button>
      {exportClicked && (
        <Link
          ref={linkRef}
          href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData))}
          download={`${composerMetadata.composerName}.json`}
          style={{display: "none"}}
        />
      )}
    </>
  );
}
