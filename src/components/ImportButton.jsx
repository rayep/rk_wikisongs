import { DownloadIcon } from "@primer/octicons-react";
import { Banner } from "@primer/react";
import { Button, Dialog, FormControl, TextInput } from "@primer/react";
import { InlineMessage } from "@primer/react/experimental";
import { useRef, useState } from "react";

function ImportDialog({ toggleImportDialog, toggleBanner, updateImportedComposers, allComposers }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputComposerName, setInputComposerName] = useState("");
  const [error, setError] = useState(null);

  function checkComposerName(name) {
    name === "saved" || name === "imported"
      ? setError("name")
      : allComposers.includes(name)
      ? setError("conflict")
      : setError(null);
  }

  function handleImportData() {
    !error &&
      (() => {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result;
          try {
            const parsedJson = JSON.parse(content);
            const { composerMetadata } = parsedJson;
            const composerName = inputComposerName ? inputComposerName : composerMetadata.composerName;
            updateImportedComposers({ name: composerName, data: parsedJson });
            setError(null);
            setSelectedFile(null);
            toggleBanner(true);
            toggleImportDialog(false);
          } catch {
            setError("operation");
          }
        };
        reader.readAsText(selectedFile);
      })();
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    file?.name && file?.type === "application/json"
      ? (setError(null), setSelectedFile(file))
      : (setSelectedFile(null), setError("file"));
  }

  return (
    <Dialog
      title="Import Composer"
      onClose={() => toggleImportDialog(false)}
      footerButtons={[
        {
          buttonType: "default",
          content: "Cancel",
          onClick: () => toggleImportDialog(false),
        },
        {
          buttonType: "primary",
          content: "Import",
          onClick: () => handleImportData(),
          disabled: !selectedFile?.name || error,
        },
      ]}
    >
      <FormControl>
        <FormControl.Label>Composer Name</FormControl.Label>
        <TextInput
          placeholder="Custom name"
          onChange={(e) => (setInputComposerName(e.target.value), checkComposerName(e.target.value))}
        />
        <FormControl.Caption>This name will be shown under the Imported section</FormControl.Caption>
        <Button onClick={() => fileInputRef.current.click()}>Choose file</Button>
        <input type="file" accept=".json" ref={fileInputRef} onChange={handleFileUpload} style={{ display: "none" }} />
        {error === "name" && <FormControl.Validation variant="error">Invalid composer name</FormControl.Validation>}
        {error == "conflict" && (
          <FormControl.Validation variant="error">Composer name already exists</FormControl.Validation>
        )}
        {selectedFile?.name && <InlineMessage variant="success">Selected {selectedFile?.name}</InlineMessage>}
        {error === "file" && <InlineMessage variant="critical">Invalid file. Please try again</InlineMessage>}
        {error === "operation" && (
          <InlineMessage variant="critical">Something went wrong. Please try again</InlineMessage>
        )}
      </FormControl>
    </Dialog>
  );
}

export function ImportButton({ updateImportedComposers, allComposers }) {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  return (
    <>
      <Button trailingVisual={<DownloadIcon size={16} />} onClick={() => setShowImportDialog(true)}>
        Import
      </Button>
      {showImportDialog && (
        <ImportDialog
          toggleImportDialog={setShowImportDialog}
          toggleBanner={setShowBanner}
          updateImportedComposers={updateImportedComposers}
          allComposers={allComposers}
        />
      )}
      {showBanner && setTimeout(() => setShowBanner(false), 2000) && (
        <Banner
          className="banner"
          title={"Success"}
          onDismiss={() => {
            setShowBanner(false);
          }}
          description={<>Composer data has been successfully imported!</>}
        />
      )}
    </>
  );
}
